import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiRequest = async (endpoint: string, method: 'get' | 'post', data = null) => {
    const url = `${apiBaseUrl}/${endpoint}`;
    try {
        const response = await axios({ url, method, data });
        return response.data;
    } catch (error) {
        console.error(`Error during API call to ${endpoint}:`, error);
        throw error;
    }
};

const getUserData = (spotifyId: string, dataType: string) => {
    return apiRequest(`users/${spotifyId}/${dataType}`, 'get');
};

const getComments = (spotifyId: string) => {
    return apiRequest(`comments/${spotifyId}`, 'get');
};

const postComment = (spotifyId: string, commentData: any) => {
    return apiRequest(`comments/${spotifyId}`, 'post', commentData);
};


const getArtistInfo = (artistId: string) => {
    return apiRequest(`artist/${artistId}`, 'get');
};

const getTrackFeatures = (trackId: string) => {
    return apiRequest(`track/audiofeature/${trackId}`, 'get');
};

export { getUserData, getComments, postComment, getArtistInfo, getTrackFeatures };
