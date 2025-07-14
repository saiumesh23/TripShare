import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import axios from 'axios';

const CommentsSection = ({ experienceId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`/api/experience/${experienceId}/comments`);
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [experienceId]);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm experienceId={experienceId} onCommentAdded={handleNewComment} />
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong> ({new Date(comment.createdAt).toLocaleString()}):<br />
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
