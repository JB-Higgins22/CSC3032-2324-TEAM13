import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './home.css';

const HomePage = () => {
  //const [settingsVisible, setSettingsVisible] = useState(false);

  
  return (
    <div className="Container">
      <Link to="..\settings" aria-label='Settings'>
      <SettingsIcon className="SettingsIcon" style={{ fontSize: '8vmin', color: 'white'}}/></Link>
      <header className="Header">
        <h1>
          Museum Of The Troubles and Peace Process
        </h1>
      </header>
      <section className="Section">
        <h2>Peace Process Puzzle Game</h2>
        <p className='textBody'>Explore the history and events of Northern Ireland through our interactive puzzle game.</p>
        <p className='textBody'>Can you find the balance to make a successful Peace Process?</p>
        <Link to="..\pre-game-info" aria-label='PreGameInfo'>
          <button className='Button'>Start Puzzle</button>
        </Link>
      </section>
      <section className="Section">
        <h2 className='h2'>Contact Us</h2>
        <p className='p'>Have questions or feedback? Reach out to us!</p>
        <a href="http://museumofthetroubles.org/" target="_blank" rel="noopener noreferrer">
          Museum Of The Troubles and Peace Process Home Page
        </a>
      </section>
    </div>
  );
};

export default HomePage;
