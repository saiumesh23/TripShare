import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Create comment
router.post('/experience/:id/comments', async (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    return res.status(400).json({ message: 'User ID and comment text are required' });
  }

  try {
    const comment = new Comment({
      experienceId: req.params.id,
      userId,
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all comments for an experience
router.get('/experience/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ experienceId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
