import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import AttendanceSheet from './components/AttendanceSheet';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-qroll bg-pattern">
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login/:userType" element={<Login />} />
          <Route path="/attendance" element={<AttendanceSheet />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;