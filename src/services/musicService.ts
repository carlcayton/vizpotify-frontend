import { getArtistInfo, getTrackFeatures } from './commonService';
import { getUserGenreDistribution } from './userService';
import { TimeRangedData, UserTrackFeatureStatsDto } from 'components/Analytics/Analytics.types';

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




