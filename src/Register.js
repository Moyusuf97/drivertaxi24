import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './style/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    fetch('http://localhost:3500/api/drivers/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Registration successful:', data);
      navigate('/more-details')
    })
    .catch((error) => {
      console.error('Error during registration:', error);
      // Handle registration error (show error message to the driver)
    });
  };

  return (
    <div className="register-form-container">
      <h2>Driver Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange} 
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
