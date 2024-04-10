import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './login.css';

// COMPONENT IMPORTS
import DeviceOrientation from '../../components/device-orientation';
import SettingsDialog from '../../dialogs/settingsDialog';
import ConfirmQuitDialog from '../../dialogs/confirmQuitDialog';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';

const Login = () => {
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);
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

  const displaySettingsDialog = () => {
    setSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setSettingsDialogOpen(false);
  };
  
  const displayConfirmQuitDialog = () => {
    setConfirmQuitDialogOpen(true);
  };

  const handleCloseConfirmQuitDialog = () => {
    setConfirmQuitDialogOpen(false);
  };

  return (
    <div className="pageContainer">
      <img 
        src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} 
        alt="background" 
        className="background-image" 
      />
      <div className="loginContainer">
      <div className="nav-bar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
              <HomeIcon aria-label = "home-icon" className="home-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />
              <SettingsIcon aria-label = "settings-icon" className="settings-button" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
            </div>
        <h2 className='page-title'>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{width: '40vmin'}} aria-label = "login-form">
          <div>
            <label htmlFor="username" className='username-label'>Username:</label>
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
            <label htmlFor="password" className='password-label'>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} // Update password state onChange
              placeholder="Password"
              required
            />
          </div>
          <button className='login-button' type="submit">Login</button>
        </form>
      </div>
      <ConfirmQuitDialog 
              isOpen={isConfirmQuitDialogOpen}
              handleClose={handleCloseConfirmQuitDialog}/>

            <SettingsDialog 
              isOpen={isSettingsDialogOpen}
              handleClose={handleCloseSettingsDialog}/>

    <DeviceOrientation />
    </div>
  );
};

export default Login;