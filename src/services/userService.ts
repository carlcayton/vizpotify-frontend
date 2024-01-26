import { getUserData, getComments, postComment } from './commonService';

export const getProfileHeaderData = (spotifyId: string) => {
    return getUserData(spotifyId, "profileHeader");
};

export const getUserTopArtist = (spotifyId: string) => {
    return getUserData(spotifyId, "userTopArtists");
};

export const getUserTopTrack = (spotifyId: string) => {
    return getUserData(spotifyId, "userTopTracks");
};

export const getUserAnalyticsData = (spotifyId: string) => {
    return getUserData(spotifyId, "userAnalytics");
};

export const getCommentsForUser = (spotifyId: string) => {
    return getComments(spotifyId);
};

export const addCommentForUser = (spotifyId: string, comment: string) => {
    return postComment(spotifyId, comment);
};
