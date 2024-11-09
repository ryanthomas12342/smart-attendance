import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherDashboard = () => {
  const location = useLocation();
  const { teacherId } = location.state || {}; // Get teacherId from location state after login
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', semester: '' });
  const [studentRollNumber, setStudentRollNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) {
        console.log('No teacher ID provided. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/classes?teacherId=${teacherId}`);
        setClasses(response.data.classes); // Ensure we set the classes from the response
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, [teacherId]);

  const handleClassChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const createClass = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/classes', {
        ...newClass,
        teacherId,
      });
      setClasses([...classes, response.data.class]); // Add the new class to the list
      setMessage('Class created successfully');
    } catch (error) {
      setMessage('Class creation failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const addStudentToClass = async (classId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/classes/${classId}/add-student`, {
        studentId: studentRollNumber,
      });
      const updatedClass = response.data.class;
      setClasses(classes.map((cls) => (cls._id === updatedClass._id ? updatedClass : cls)));
      setMessage('Student added successfully');
      setStudentRollNumber(''); // Clear input field
    } catch (error) {
      setMessage('Failed to add student: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Teacher Dashboard</h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Create a New Class</h3>
          <input
            name="name"
            placeholder="Class Name"
            value={newClass.name}
            onChange={handleClassChange}
            required
            style={{
              border: '1px solid #E2E8F0',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              width: '100%',
              fontSize: '1rem',
              marginBottom: '1rem',
            }}
          />
          <input
            name="semester"
            type="number"
            placeholder="Semester"
            value={newClass.semester}
            onChange={handleClassChange}
            required
            style={{
              border: '1px solid #E2E8F0',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              width: '100%',
              fontSize: '1rem',
              marginBottom: '1rem',
            }}
          />
          <button
            onClick={createClass}
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
            Create Class
          </button>
        </div>

        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Your Classes</h3>
          {classes.length === 0 ? (
            <p>You have not created any classes.</p>
          ) : (
            <ul>
              {classes.map((cls) => (
                <li key={cls._id} style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {cls.name} - Semester {cls.semester}
                  </h4>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Students:</p>
                  <ul>
                    {cls.students.length === 0 ? (
                      <li>No students added yet.</li>
                    ) : (
                      cls.students.map((student) => (
                        <li key={student._id}>
                          {student.name} ({student.rollNumber})
                        </li>
                      ))
                    )}
                  </ul>
                  <div>
                    <input
                      placeholder="Student Roll Number"
                      value={studentRollNumber}
                      onChange={(e) => setStudentRollNumber(e.target.value)}
                      style={{
                        border: '1px solid #E2E8F0',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        marginBottom: '1rem',
                        width: '100%',
                      }}
                    />
                    <button
                      onClick={() => addStudentToClass(cls._id)}
                      style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.375rem',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#3B82F6'}
                    >
                      Add Student
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {message && <p style={{ color: '#EF4444', marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
};

export default TeacherDashboard;
