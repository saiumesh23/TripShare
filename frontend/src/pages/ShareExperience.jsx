import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShareExperience() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location:'',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to share an experience');
      navigate('/login');
      return;
    }

    try {
      console.log({
        userId:user._id,
        title:formData.title,
        description:formData.description,
        location:formData.location,
      });
      await axios.post('http://localhost:3000/api/experience', {
        userId: user._id,
        title: formData.title,
        description: formData.description,
        location:formData.location,
      });

      alert('Experience shared!');
      setFormData({ title: '', description: '',location:'' });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to share experience');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Describe your experience"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
    />

      <button type="submit">Share</button>
    </form>
  );
}

export default ShareExperience;
