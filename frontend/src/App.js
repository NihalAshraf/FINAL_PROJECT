
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleSelection from './components/Mainpage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/role-selection" element={<RoleSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
