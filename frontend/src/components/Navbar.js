import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = () => {
    console.log('Sign In clicked');
    // Add navigation logic here
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    // Add navigation logic here
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <span className="heart-icon">❤️</span>
            <span className="brand-text">PhysioMilestones</span>
          </div>
        </div>

        <div className="navbar-menu">
          <div className="navbar-auth">
            <button className="btn-signin" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="btn-signup" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>

        <div className="navbar-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-auth">
          <button className="btn-signin-mobile" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="btn-signup-mobile" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
