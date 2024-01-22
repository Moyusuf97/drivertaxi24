import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './App.css';
import FormInfo from './FormInfo';
import DriverMap from './DriverMap';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome, Driver</h1>
         {/* <nav>
            <Link to="/login">Login</Link> 
            <Link to="/register">Register</Link>
          </nav>*/}
        </header>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/more-details" element={<FormInfo />} />
          <Route path="/dash" element={<DriverMap/>} />

        </Routes>
      </div>
    </Router> 
  );
}

export default App;
