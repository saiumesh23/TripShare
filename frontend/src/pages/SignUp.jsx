import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      console.log(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
      <input name="confirmPassword" placeholder="Repeat Password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
