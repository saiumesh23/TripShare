import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, // ✅ Add this
  createdAt: { type: Date, default: Date.now },
});


const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
