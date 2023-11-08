import axios from 'axios'


const getProfileHeaderData = (spotifyId) => {
    return fetchData(spotifyId, "profileHeader");
}

const getUserTopArtist = (spotifyId) => {
    return fetchData(spotifyId, "userTopArtist");
}

const getArtistExtraInfo = async (artistId) => {
    let endpoint = `http://localhost:8080/api/v1/artist/${artistId}`
    try {
        const response = await axios.get(endpoint)
        return response.data
    } catch (error) {
        console.log("Error fetching data for Artist Top Tracks and Artist Related Artists", error)
    }
}

const fetchData = async (spotifyId, dataType) => {
    let endpoint = createBaseEndpoint(spotifyId, dataType);
    try {
        const response = await axios.get(endpoint, {
            withCredentials: spotifyId === "" ? true : false
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${dataType}:`, error);
    }
}

const createBaseEndpoint = (spotifyId, dashboardSection) => {
    let endpoint = "http://localhost:8080/api/v1"
    if (spotifyId !== "") {
        endpoint += `public/${spotifyId}/${dashboardSection}`
    } else {
        endpoint += `/me/${dashboardSection}`
    }
    return endpoint
}



export {
    getProfileHeaderData,
    getUserTopArtist,
    getArtistExtraInfo
}