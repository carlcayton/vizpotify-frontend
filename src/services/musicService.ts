import { getArtistInfo, getTrackFeatures } from './commonService';

export const getArtistExtraInfo = async (artistId: string) => {
    try {
        return await getArtistInfo(artistId);
    } catch (error) {
        console.log("Error fetching data for Artist Extra Info", error);
    }
};

export const getTrackAudioFeature = async (trackId: string) => {
    try {
        return await getTrackFeatures(trackId);
    } catch (error) {
        console.log("Error fetching track's audio features", error);
    }
    return null;
};

export const getGenreDistribution = async (spotifyId: string, timeRange: string) => {
    try {
        // This is a placeholder implementation. You'll need to replace this with the actual API call.
        const response = await fetch(`/api/genre-distribution?spotifyId=${spotifyId}&timeRange=${timeRange}`);
        if (!response.ok) {
            throw new Error('Failed to fetch genre distribution');
        }
        return await response.json();
    } catch (error) {
        console.log("Error fetching genre distribution", error);
        throw error;
    }
};
