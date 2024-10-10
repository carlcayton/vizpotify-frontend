import { checkAuthentication, getComments, getUserData, postComment } from './commonService';

export const userService = {
  getProfileHeaderData: (spotifyId: string) => {
    return getUserData(spotifyId, "profileHeader");
  },

  getUserTopArtist: (spotifyId: string) => {
    return getUserData(spotifyId, "topArtists");
  },

  getUserTopTrack: (spotifyId: string) => {
    return getUserData(spotifyId, "topTracks");
  },

  getCommentsForUser: (spotifyId: string) => {
    return getComments(spotifyId);
  },

  addCommentForUser: (spotifyId: string, comment: string) => {
    return postComment(spotifyId, comment);
  },

  fetchAuthentication: async () => {
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
  }
};