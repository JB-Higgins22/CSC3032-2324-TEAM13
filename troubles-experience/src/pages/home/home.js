import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './home.css';
import RotateDeviceMessage from '../../components/rotate-device-message';
import SettingsDialog from '../../dialogs/settingsDialog';

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
    <div className="Container">
      <img 
        src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} 
        alt="background" 
        className="background-image" 
      />
      <SettingsIcon aria-label = "SettingsIcon" className="SettingsIcon" onClick={displaySettingsDialog} style={{ fontSize: '8vmin', color: 'white'}}/>
      <header className="Header">
        <h1 className="title">
          Museum Of The Troubles and Peace Process
        </h1>
      </header>
      <section className="Section">
        <h2 className='subTitle'>Peace Process Puzzle Game</h2>
        <p className='textBody'>Explore the history and events of Northern Ireland through our interactive puzzle game.</p>
        <p className='textBody'>Can you find the balance to make a successful Peace Process?</p>
        <Link to="..\pre-game-info" aria-label='PreGameInfo'>
          <button className='StartPuzzleButton'>Start Puzzle</button>
        </Link>
      </section>
      <section className="Section">
        <h2 className='subTitle'>Contact Us</h2>
        <p className='textBody'>Have questions or feedback? Reach out to us!</p>
        <a href="http://museumofthetroubles.org/" target="_blank" rel="noopener noreferrer">
          Museum Of The Troubles and Peace Process Home Page
        </a>
      </section>

      <SettingsDialog 
        isOpen={isSettingsDialogOpen}
        handleClose={handleCloseSettingsDialog}/>

      <RotateDeviceMessage />
    </div>
    
  );
};

export default HomePage;
