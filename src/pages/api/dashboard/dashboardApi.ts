import axios from 'axios';

const getProfileHeaderData = (spotifyId) => {
    return fetchData(spotifyId, "profileHeader");
};

const getUserTopArtist = (spotifyId) => {
    return fetchData(spotifyId, "userTopArtists");
};

const getUserTopTrack = (spotifyId) => {
    return fetchData(spotifyId, "userTopTracks");
};

const getUserAnalyticsData = async (spotifyId) => {
    return fetchData(spotifyId, "analytics");
};

const getArtistExtraInfo = async (artistId) => {
    let endpoint = `http://localhost:8080/api/v1/artist/${artistId}`;
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.log("Error fetching data for Artist Top Tracks and Artist Related Artists", error);
    }
};

const getTrackAudioFeature = async (trackId) => {
    let endpoint = `http://localhost:8080/api/v1/track/audiofeature/${trackId}`;
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.log("Error fetching track's audio features", error);
    }
};

const fetchData = async (spotifyId, dataType) => {
    console.log(spotifyId)
    let endpoint = createBaseEndpoint(spotifyId, dataType);
    try {
        const response = await axios.get(endpoint, {
            // withCredentials: !spotifyId
        });
        if (dataType === "analytics") {
            console.log(response.data)
        }
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${dataType}:`, error);
    }
};

const createBaseEndpoint = (spotifyId, dataType) => {
    let endpoint = "http://localhost:8080/api/v1/";
    if (spotifyId) {
        endpoint += `users/${spotifyId}/${dataType}`;
    } else {
        endpoint += `users/me/${dataType}`;
    }
    return endpoint;
};

export {
    getProfileHeaderData,
    getUserTopArtist,
    getUserTopTrack,
    getArtistExtraInfo,
    getTrackAudioFeature,
    getUserAnalyticsData
};
