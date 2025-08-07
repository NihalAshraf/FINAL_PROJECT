import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <span className="heart-icon">❤️</span>
            <span className="brand-text">PhysioMilestones</span>
          </div>
        </div>




      </div>


    </nav>
  );
};

export default Navbar;
