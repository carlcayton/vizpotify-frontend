import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiRequest = async (endpoint: string, method: 'get' | 'post', data = null) => {
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


const getUserData = (spotifyId: string, dataType: string) => {
    return apiRequest(`users/${spotifyId}/${dataType}`, 'get');
};


const getComments = (userId: string) => {
    return apiRequest(`users/${userId}/comments`, 'get');
};

const postComment = (userId: string, commentData: any) => {
    return apiRequest(`users/${userId}/comments`, 'post', commentData);
};

const getComparisonData = (spotifyId: string) => {
    return apiRequest(`comparison/${spotifyId}`, 'post');
}

const getArtistInfo = (artistId: string) => {
    return apiRequest(`artist/${artistId}`, 'get');
};

const getTrackFeatures = (trackId: string) => {
    return apiRequest(`track/audiofeature/${trackId}`, 'get');
};

export { getUserData, getComments, postComment, getArtistInfo, getTrackFeatures, getComparisonData };
