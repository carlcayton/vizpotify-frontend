import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import React, { useMemo } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCommentsForUser, addCommentForUser, Comment } from 'services/commentService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CommentSectionProps {
  innerRef?: React.RefObject<HTMLDivElement>;
  spotifyId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ innerRef, spotifyId }) => {
  const [sortMethod, setSortMethod] = React.useState<'newest' | 'oldest'>('newest');
  const queryClient = useQueryClient();

  const { data: commentsData, isLoading, isError } = useQuery<Comment[]>({
    queryKey: ['comments', spotifyId],
    queryFn: () => getCommentsForUser(spotifyId),
    enabled: !!spotifyId,
  });

  const addCommentMutation = useMutation({
    mutationFn: (commentContent: string) => addCommentForUser(spotifyId, { content: commentContent, dashboardSpotifyId: spotifyId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', spotifyId] });
    },
  });

  const handleCommentSubmit = (commentContent: string) => {
    addCommentMutation.mutate(commentContent);
  };

  const comments = useMemo(() => {
    const sortedComments = commentsData ? [...commentsData] : [];
    return sortedComments.sort((a, b) => 
      sortMethod === 'newest' 
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [sortMethod, commentsData]);

  if (isLoading) return <div>Loading comments...</div>;
  if (isError) return <div>Error loading comments</div>;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg" ref={innerRef}>
      <hr className="my-4 border-t border-gray-700" />
      <div className="flex justify-between items-center">
        <CommentForm onSubmitComment={handleCommentSubmit} />
      </div>
      <div className='py-4'>
        <Select onValueChange={(value: 'newest' | 'oldest') => setSortMethod(value)}>
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
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              userName={comment.userName}
              content={comment.content}
              createdAt={comment.createdAt}
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
