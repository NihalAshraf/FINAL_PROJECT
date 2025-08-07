import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ role, onBackToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Role-specific fields
    ...(role === 'Parent' && {
      childName: '',
      childAge: '',
      childCondition: ''
    }),
    ...(role === 'Doctor' && {
      specialization: '',
      licenseNumber: '',
      experience: '',
      hospital: ''
    })
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Role-specific validations
    if (role === 'Parent') {
      if (!formData.childName.trim()) newErrors.childName = 'Child name is required';
      if (!formData.childAge) newErrors.childAge = 'Child age is required';
      if (!formData.childCondition.trim()) newErrors.childCondition = 'Child condition is required';
    }

    if (role === 'Doctor') {
      if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData.experience) newErrors.experience = 'Years of experience is required';
      if (!formData.hospital.trim()) newErrors.hospital = 'Hospital/Clinic name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Signup data:', { role, ...formData });
      
      // Call success callback
      if (onSignupSuccess) {
        onSignupSuccess({ role, ...formData });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <button className="back-button" onClick={onBackToLogin}>
            ← Back to Login
          </button>
          <h2 className="signup-title">Sign Up as {role}</h2>
          <p className="signup-subtitle">Create your account to get started</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          {/* Security Information */}
          <div className="form-section">
            <h3 className="section-title">Security</h3>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Role-specific Information */}
          {role === 'Parent' && (
            <div className="form-section">
              <h3 className="section-title">Child Information</h3>
              <div className="form-group">
                <label htmlFor="childName" className="form-label">Child's Name *</label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  className={`form-input ${errors.childName ? 'error' : ''}`}
                  value={formData.childName}
                  onChange={handleInputChange}
                  placeholder="Enter your child's name"
                />
                {errors.childName && <span className="error-message">{errors.childName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="childAge" className="form-label">Child's Age *</label>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    className={`form-input ${errors.childAge ? 'error' : ''}`}
                    value={formData.childAge}
                    onChange={handleInputChange}
                    placeholder="Age"
                    min="0"
                    max="18"
                  />
                  {errors.childAge && <span className="error-message">{errors.childAge}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="childCondition" className="form-label">Condition/Concern *</label>
                  <input
                    type="text"
                    id="childCondition"
                    name="childCondition"
                    className={`form-input ${errors.childCondition ? 'error' : ''}`}
                    value={formData.childCondition}
                    onChange={handleInputChange}
                    placeholder="e.g., Developmental delay"
                  />
                  {errors.childCondition && <span className="error-message">{errors.childCondition}</span>}
                </div>
              </div>
            </div>
          )}

          {role === 'Doctor' && (
            <div className="form-section">
              <h3 className="section-title">Professional Information</h3>
              <div className="form-group">
                <label htmlFor="specialization" className="form-label">Specialization *</label>
                <select
                  id="specialization"
                  name="specialization"
                  className={`form-input ${errors.specialization ? 'error' : ''}`}
                  value={formData.specialization}
                  onChange={handleInputChange}
                >
                  <option value="">Select specialization</option>
                  <option value="Pediatric Physiotherapy">Pediatric Physiotherapy</option>
                  <option value="Neurological Physiotherapy">Neurological Physiotherapy</option>
                  <option value="Orthopedic Physiotherapy">Orthopedic Physiotherapy</option>
                  <option value="Developmental Therapy">Developmental Therapy</option>
                  <option value="Occupational Therapy">Occupational Therapy</option>
                </select>
                {errors.specialization && <span className="error-message">{errors.specialization}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="licenseNumber" className="form-label">License Number *</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    className={`form-input ${errors.licenseNumber ? 'error' : ''}`}
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="Enter license number"
                  />
                  {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="experience" className="form-label">Years of Experience *</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    className={`form-input ${errors.experience ? 'error' : ''}`}
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Years"
                    min="0"
                    max="50"
                  />
                  {errors.experience && <span className="error-message">{errors.experience}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hospital" className="form-label">Hospital/Clinic *</label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  className={`form-input ${errors.hospital ? 'error' : ''}`}
                  value={formData.hospital}
                  onChange={handleInputChange}
                  placeholder="Enter hospital or clinic name"
                />
                {errors.hospital && <span className="error-message">{errors.hospital}</span>}
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="error-banner">
              {errors.submit}
            </div>
          )}

          <button 
            type="submit" 
            className={`signup-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : `Sign Up as ${role}`}
          </button>
        </form>

        <div className="signup-footer">
          <p className="signup-footer-text">
            Already have an account? <button className="login-link" onClick={onBackToLogin}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
