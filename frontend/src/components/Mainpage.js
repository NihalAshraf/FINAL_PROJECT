import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import './Mainpage.css';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLoginForm(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${selectedRole}`, loginData);
    
    // Simulate authentication logic
    if (loginData.email && loginData.password) {
      // Redirect based on selected role
      if (selectedRole === 'Parent') {
        navigate('/parent-dashboard');
      } else if (selectedRole === 'Doctor') {
        navigate('/doctor-dashboard');
      }
    } else {
      alert('Please enter both email and password');
    }
  };

  const handleBackToRoles = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
    setSelectedRole('');
    setLoginData({ email: '', password: '' });
  };

  const handleShowSignup = () => {
    console.log('Signup button clicked - switching to signup form');
    console.log('Current states - showLoginForm:', showLoginForm, 'showSignupForm:', showSignupForm);
    setShowLoginForm(false);
    setShowSignupForm(true);
    console.log('States updated - showLoginForm: false, showSignupForm: true');
    // Scroll to top to ensure signup form is visible
    window.scrollTo(0, 0);
  };

  const handleBackToLogin = () => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };

  const handleSignupSuccess = (signupData) => {
    console.log('Signup successful:', signupData);
    // Handle successful signup - could redirect to dashboard or show success message
    alert(`Account created successfully for ${signupData.role}! You can now login.`);
    setShowSignupForm(false);
    setShowLoginForm(true);
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
        {showSignupForm ? (
          <Signup 
            key={`signup-${selectedRole}`}
            role={selectedRole}
            onBackToLogin={handleBackToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        ) : showLoginForm ? (
          <div className="login-section">
            <div className="login-header">
              <button className="back-button" onClick={handleBackToRoles}>
                ← Back
              </button>
              <h2 className="login-title">Login as {selectedRole}</h2>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="login-button">
                Login as {selectedRole}
              </button>
            </form>

            <div className="login-footer">
              <p className="login-footer-text">
                Don't have an account? 
              </p>
              <button 
                type="button" 
                className="signup-button-debug" 
                onClick={handleShowSignup}
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Click here to Sign up
              </button>
            </div>
          </div>
        ) : (
          <>
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
                  onClick={() => handleRoleSelect(role.title)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
