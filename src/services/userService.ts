import { checkAuthentication, getComments, getUserData, postComment } from './commonService';

export interface Comment {
  id: string;
  content: string;
  userName: string;
  createdAt: string;
  likeCount: number;
  authorImageUrl: string;
}

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

  getCommentsForUser: async (spotifyId: string): Promise<Comment[]> => {
    const comments = await getComments(spotifyId);
    return comments;
  },

  addCommentForUser: async (spotifyId: string, commentData: { content: string; dashboardSpotifyId: string }): Promise<Comment> => {
    const newComment = await postComment(spotifyId, commentData);
    return newComment;
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

export const { getCommentsForUser, addCommentForUser } = userService;
