import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=> {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    licenseNumber: '',
    vehicle: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

const endpoint = 'https://api-focnoae3da-uc.a.run.app/api/register/driver';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log('Driver registered successfully:', data);
        navigate("/login");
 
      } else {
        console.error('Failed to register driver:', data);

      }
    } catch (error) {
      console.error('There was an error registering the driver', error);

    }
  };

  return (
    <div>
      <h2>Register as a Driver</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="License Number" required />
        <input type="text" name="vehicle" value={formData.vehicle} onChange={handleChange} placeholder="Vehicle Information" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}


export default Register;