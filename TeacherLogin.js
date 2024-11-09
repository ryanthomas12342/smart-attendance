import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const TeacherLogin = () => {
  const [formData, setFormData] = useState({ facultyId: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/teacher/login', formData);
      if (response.data.success) {
        setMessage('Login successful!');
        
        navigate('/teacher-dashboard', { state: { teacherId: response.data.teacherId } });
      } else {
        setMessage('Incorrect faculty ID or password');
      }
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Teacher Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="facultyId"
              placeholder="Faculty ID"
              onChange={handleChange}
              required
              style={{
                border: '1px solid #E2E8F0',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                width: '100%',
                fontSize: '1rem',
                marginBottom: '1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={{
                border: '1px solid #E2E8F0',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                width: '100%',
                fontSize: '1rem',
                marginBottom: '1rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              fontWeight: 'bold',
              width: '100%',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3B82F6'}
          >
            Login
          </button>
        </form>
        {message && <p style={{ color: '#EF4444', marginTop: '1rem' }}>{message}</p>}
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Don’t have an account? <Link to="/teacher-signup" style={{ color: '#3B82F6' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
