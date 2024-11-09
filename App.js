import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';  
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';
import StudentSignUp from './StudentSignUp';
import TeacherSignUp from './TeacherSignUp';
import StudentDashboard from './StudentDashboard'; // Add student dashboard component
import TeacherDashboard from './TeacherDashboard';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />  
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/employee" element={<TeacherLogin />} />
      <Route path="/student-signup" element={<StudentSignUp />} />
      <Route path="/teacher-signup" element={<TeacherSignUp />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Student Dashboard Route */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
    </Routes>
  );
};

export default App;
