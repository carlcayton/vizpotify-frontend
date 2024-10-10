import { checkAuthentication, getUserData } from './commonService';

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
