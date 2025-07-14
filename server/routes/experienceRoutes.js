import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

// POST /api/experience
router.post('/', async (req, res) => {
  try {
    const { userId, title, description, location } = req.body;
    if (!userId || !title || !description || !location) {
     return res.status(400).json({ message: 'All fields are required' });
    }

    const newExperience = new Experience({ userId, title, description, location });
    await newExperience.save();

    res.status(201).json({ message: 'Experience shared successfully' });
  } catch (err) {
    console.error('Error sharing experience:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().populate('userId','name').sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).populate('userId', 'name'); 
    // ^ Find by ID and also get author's name

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json(experience);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
