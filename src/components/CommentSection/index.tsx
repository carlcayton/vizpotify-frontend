import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import React, { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCommentsForUser, addCommentForUser } from 'services/userService';


const CommentSection = ({ innerRef, spotifyId }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [sortMethod, setSortMethod] = useState('newest');

  const fetchComments = async () => {
    if (spotifyId) {
      const fetchedComments = await getCommentsForUser(spotifyId);
      setCommentsData(fetchedComments || []);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [spotifyId]);

  const handleCommentSubmit = async (commentContent) => {
    const commentData = { content: commentContent, dashboardSpotifyId: spotifyId };
    await addCommentForUser(spotifyId, commentData);
    await fetchComments();
  };

  const comments = useMemo(() => {
    const sortedComments = commentsData ? [...commentsData] : [];
    switch (sortMethod) {
      case 'newest':
        sortedComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sortedComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    return sortedComments;
  }, [sortMethod, commentsData]);
  console.log(comments)
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <hr className="my-4 border-t border-gray-700" />
      <div className="flex justify-between items-center">
        <CommentForm onSubmitComment={handleCommentSubmit} />

      </div>
      <div className='py-4'>
        <Select onValueChange={setSortMethod} >
          <SelectTrigger className="w-[180px] bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm px-4 py-2">
            <SelectValue placeholder="Sort by: Newest" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectGroup>
              <SelectLabel className="text-gray-400">Sort by</SelectLabel>
              <SelectItem value="newest" className="text-white hover:bg-gray-700">
                Newest
              </SelectItem>
              <SelectItem value="oldest" className="text-white hover:bg-gray-700">
                Oldest
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="my-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentCard
              key={index}
              userName={comment.userName}
              content={comment.content}
              createdAt={comment.createdAt}
              likeCount={comment.likeCount}
              authorImageUrl={comment.authorImageUrl}
            />
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
