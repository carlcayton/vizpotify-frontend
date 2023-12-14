

// Define the CommentForm component



import React from 'react';
import  CommentForm  from './CommentForm'; 
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
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    avatarSrc: 'https://i.pravatar.cc/150?img=2',
  },
  {
    username: 'Charlie',
    comment: 'Could you provide more details on the topic?',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    avatarSrc: 'https://i.pravatar.cc/150?img=3',
  },
];

const CommentSection = ({ onCommentSubmit }) => {
  const comments = mockComments; 

  return (
    <div>
      <CommentForm onCommentSubmit={onCommentSubmit} />
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
  );
};

export default CommentSection;
