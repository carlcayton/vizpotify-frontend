

// Define the CommentForm component



import React from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const mockComments = [
  {
    username: 'Alice',
    comment: 'This is a fantastic article!',
    timestamp: new Date().toISOString(),
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
  },
  {
    username: 'Bob',
    comment: 'I totally agree with this point of view.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), 
    avatarSrc: 'https://i.pravatar.cc/150?img=2',
  },
  {
    username: 'Charlie',
    comment: 'Could you provide more details on the topic?',
    timestamp: new Date(Date.now() - 86400000).toISOString(), 
    avatarSrc: 'https://i.pravatar.cc/150?img=3',
  },
];

const CommentSection = ({ onCommentSubmit }) => {
  const comments = mockComments; 

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg"> 
      <hr className="my-4 border-t border-gray-700" /> 
      <CommentForm onCommentSubmit={onCommentSubmit} />
      <div className="my-4 space-y-4"> 
        {comments.map((comment, index) => (
          <CommentCard
            key={index}
            username={comment.username}
            comment={comment.comment}
            timestamp={comment.timestamp}
            avatarSrc={comment.avatarSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

