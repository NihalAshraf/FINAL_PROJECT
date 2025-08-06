import React, { useState } from 'react';
import './Mainpage.css';

const RoleSelection = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleLogin = (role) => {
    // Navigate to login page or handle role-based logic
    console.log(`Logging in as ${role}`);
    // Example: navigate(`/login/${role.toLowerCase()}`);
  };

  const roles = [
    {
      id: 'parent',
      title: 'Parent',
      description: 'Access your child\'s progress and schedule appointments',
      icon: '👨‍👩‍👧‍👦',
      color: '#f59e0b',
      hoverColor: '#d97706'
    },
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Manage patients and track treatment progress',
      icon: '👨‍⚕️',
      color: '#1f2937',
      hoverColor: '#111827'
    }
  ];

  return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <div className="brand-section">
          <h2 className="welcome-text">Welcome to</h2>
          <h1 className="brand-name">PhysioMilestones</h1>
          <p className="subtitle">Select your role to continue</p>
        </div>

        <div className="roles-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${hoveredRole === role.id ? 'hovered' : ''}`}
              style={{
                '--role-color': role.color,
                '--role-hover-color': role.hoverColor
              }}
              onClick={() => handleLogin(role.title)}
              onMouseEnter={() => setHoveredRole(role.id)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              <div className="role-icon">{role.icon}</div>
              <h3 className="role-title">{role.title}</h3>
              <p className="role-description">{role.description}</p>
              <div className="role-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="footer-section">
          <p className="footer-text">
            Secure • Professional • Trusted
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
