import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './login.css';

const Login = () => {
  // Variables instantiated
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the login data object
    const loginData = {
      username: username,
      password: password
    };

    try {
      // Make an HTTP POST request to your server
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        // Login successful
        alert('Login successful!');
const info = await response.json(); // Wait for response.json() to resolve
        const token = info.token;
        localStorage.setItem('token',token);
        navigate('/admin');
      } else {
        alert('Login failed');        
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting login details:', error);
    }
  };

  return (
    <div className="pageContainer">
      <img 
        src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} 
        alt="background" 
        className="background-image" 
      />
      <div className="loginContainer">
        <Link to="../settings">
          <SettingsIcon className="SettingsIcon" />
        </Link>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)} // Update username state onChange
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} // Update password state onChange
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;