
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleSelection from './components/Mainpage';
import ParentDashboard from './components/Parents/ParentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<RoleSelection />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* Parent Routes */}
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/parent/*" element={<ParentDashboard />} />
          
          {/* Doctor Routes - Placeholder for future */}
          <Route path="/doctor-dashboard" element={<div className="coming-soon">Doctor Dashboard - Coming Soon</div>} />
          <Route path="/doctor/*" element={<div className="coming-soon">Doctor Dashboard - Coming Soon</div>} />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
