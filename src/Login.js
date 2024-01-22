import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config'; // Import Firebase auth

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Login successful');
      navigate('/dash'); 
    } catch (error) {
      console.error('Error during login:', error.message);
      setLoginError('Login failed. Please check your credentials.'); // Show login error
    }
  };

  return (
    <div className="login-form-container">
      <h2>Driver Login</h2>
      {loginError && <p className="error">{loginError}</p>}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
