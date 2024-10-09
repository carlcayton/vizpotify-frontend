import { checkAuthentication, getComments, getUserData, postComment } from './commonService';

export const getProfileHeaderData = (spotifyId: string) => {
    return getUserData(spotifyId, "profileHeader");
};

export const getUserTopArtist = (spotifyId: string) => {
    return getUserData(spotifyId, "topArtists");
};

export const getUserTopTrack = (spotifyId: string) => {
    return getUserData(spotifyId, "topTracks");
};


export const getCommentsForUser = (spotifyId: string) => {
    return getComments(spotifyId);
};

export const addCommentForUser = (spotifyId: string, comment: string) => {
    return postComment(spotifyId, comment);
};



export const getUserGenreDistribution = (spotifyId: string) => {
    return getUserData(spotifyId, "genreDistribution");
};


export const fetchAuthentication = async () => {
    try {
        const data = await checkAuthentication();
        if (data.isAuthenticated) {
            return {
                isAuthenticated: true,
                spotifyId: data.spotifyId ?? '',
                userDisplayName: data.userDisplayName ?? '',
                profilePictureUrl: data.profilePictureUrl ?? '',
            };
        } else {
            return { isAuthenticated: false };
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return { isAuthenticated: false };
    }
};
