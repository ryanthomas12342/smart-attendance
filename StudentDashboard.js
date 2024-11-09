import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);
  const location = useLocation();
  const studentId = location.state?.studentId || localStorage.getItem('studentId');

  useEffect(() => {
    console.log(`Student ID from location.state: ${studentId}`);
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/classes?studentId=6725d0eed929ba60e2790814`);
        setClasses(response.data.classes);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    if (studentId) fetchClasses();
  }, [studentId]);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>{classItem.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
