import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api-focnoae3da-uc.a.run.app/api/login/driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT in local storage
        localStorage.setItem('driverToken', data.token);
        navigate("/Landing")
        // e.g., redirect to a dashboard
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError('Failed to connect to the service.');
    }
  };

  return (
    <div>
      <h1>Driver Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {loginError && <p className="error">{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;