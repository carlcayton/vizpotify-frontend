import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiRequest = async (endpoint: string, method: 'get' | 'post', data = null) => {
    const url = `${apiBaseUrl}/${endpoint}`;
    try {
        const response = await axios({ url, method, data, withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error during API call to ${endpoint}:`, error);
        throw error;
    }
};

export const checkAuthentication = async (cookie = null) => {
    const headers = cookie ? { Cookie: cookie } : undefined;
    const response = await apiRequest('auth/status', 'get', null);
    return response;
};

export const getUserData = (spotifyId: string, dataType: string) => {
    return apiRequest(`users/${spotifyId}/${dataType}`, 'get');
};

export const getComparisonData = (spotifyId: string) => {
    return apiRequest(`comparison/${spotifyId}`, 'post');
}

export const getArtistInfo = (artistId: string) => {
    return apiRequest(`artist/${artistId}`, 'get');
};

export const getTrackFeatures = (trackId: string) => {
    return apiRequest(`track/audiofeature/${trackId}`, 'get');
};

