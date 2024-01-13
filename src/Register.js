import React, { useState } from 'react';
import './style/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    driversLicenseNumber: '',
    driversLicensePhoto: null,
    personalPhoto: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "driversLicensePhoto" || name === "personalPhoto") {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input 
            type="tel" 
            name="phoneNumber" 
            value={formData.phoneNumber}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Driver's License Number:</label>
          <input 
            type="text" 
            name="driversLicenseNumber" 
            value={formData.driversLicenseNumber}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Upload Driver's License Photo:</label>
          <input 
            type="file" 
            name="driversLicensePhoto" 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Upload Personal Photo:</label>
          <input 
            type="file" 
            name="personalPhoto" 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
