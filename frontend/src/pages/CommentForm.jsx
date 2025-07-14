import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ experienceId, onCommentAdded }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");

  // If user is not logged in
  if (!user) {
    return <p>Please log in to post a comment.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/api/experience/${experienceId}/comments`, {
         userId: user._id,
        text: text,
      });

      // Once comment is successfully saved
      onCommentAdded(res.data);
      setText("");
    } catch (error) {
      console.error("Failed to add comment", error);
      alert("Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
