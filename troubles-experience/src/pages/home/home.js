// React Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MUI Import
import SettingsIcon from '@mui/icons-material/Settings';

// Component Imports
import DeviceOrientation from '../../components/device-orientation';
import SettingsDialog from '../../dialogs/settingsDialog';

// CSS Import
import './home.css';

const HomePage = () => {
  //const [settingsVisible, setSettingsVisible] = useState(false);
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const displaySettingsDialog = () => {
    setSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setSettingsDialogOpen(false);
  };

  
  return (
    <div className="container">
      {/* Background Image */}
      <img 
        src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} 
        alt="background" 
        className="background-image" 
      />
      <div className="nav-bar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
        <SettingsIcon aria-label = "settingsIcon" className="settings-icon-home" onClick={displaySettingsDialog} sx={{ fontSize: '8vmin', color: 'white', "&:hover": {color: '#04aa23'} }}/>
      </div>
      <header className="header">
        <h1 className="title">
          Museum Of The Troubles and Peace Process
        </h1>
      </header>
      <section className="section">
        <h2 className='sub-title'>Peace Process Puzzle Game</h2>
        <p className='text-body'>Explore the history and events of Northern Ireland through our interactive puzzle game.</p>
        <p className='text-body'>Can you find the balance to make a successful Peace Process?</p>
        <Link to="..\pre-game-info" aria-label='PreGameInfo'>
          <button className='start-puzzle-button'>Start Puzzle</button>
        </Link>
      </section>
      {/* Link to Museum Website */}
      <section className="Section">
        <a href="http://museumofthetroubles.org/" target="_blank" rel="noopener noreferrer">
          Museum Of The Troubles and Peace Process Home Page
        </a>
      </section>

      {/* Dialogs */}
      <SettingsDialog 
        isOpen={isSettingsDialogOpen}
        handleClose={handleCloseSettingsDialog}/>

      <DeviceOrientation />
    </div>
    
  );
};

export default HomePage;
