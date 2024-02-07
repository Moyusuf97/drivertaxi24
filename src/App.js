import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Register from './Component/Register';
import Login from './Component/Login';
import Landing from './Component/LandingPage';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <Link to="/register" className="App-link">Register</Link>
            <Link to="/login" className="App-link">Login</Link>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Landing" element={<Landing />} />
            <Route path="/" element={
              <p>
                Edit <code>src/App.js</code> and save to reload.
                <a
                  className="App-link"
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </p>
            } />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
