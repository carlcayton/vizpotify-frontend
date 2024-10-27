import { apiRequest } from './commonService';


export interface Comment {
  id: string;
  content: string;
  userName: string;
  createdAt: string;
  likeCount: number;
  authorImageUrl: string;
}

export const getCommentsForUser = async (spotifyId: string): Promise<Comment[]> => {
  const comments = await apiRequest(`users/${spotifyId}/comments`, 'get');
  return comments;
};

export const addCommentForUser = async (spotifyId: string, commentData: { content: string; dashboardSpotifyId: string }): Promise<Comment> => {
  const newComment = await apiRequest(`users/${spotifyId}/comments`, 'post', commentData);
  return newComment;
};
