import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';
function ExperienceDetail() {
  const { id } = useParams(); // Get experience ID from the URL
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/experience/${id}`);
        setExperience(res.data);
      } catch (err) {
        console.error('Error fetching experience:', err);
      }
    };

    fetchExperience();
  }, [id]);

  if (!experience) {
    return <p>Loading...</p>; // While data is being fetched
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{experience.title}</h2>
      <p><strong>Author:</strong> {experience.userId?.name || 'Anonymous'}</p>
      <p><strong>Location:</strong> {experience.location}</p>
      <p><strong>Description:</strong> {experience.description}</p>
      <p><small>{new Date(experience.createdAt).toLocaleString()}</small></p>

      <hr />

       <CommentSection experienceId={experience._id} />
    </div>
  );
}

export default ExperienceDetail;
