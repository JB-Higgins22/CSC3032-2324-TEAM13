import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './home.css';
import CssBaseline from '@mui/material/CssBaseline';


const HomePage = () => {
  //const [settingsVisible, setSettingsVisible] = useState(false);

  
  return (
    <div className="Container">
      <CssBaseline />
      <Link to="..\settings">
      <SettingsIcon className="SettingsIcon"/></Link>
      <header className="Header">
        <h1>
          Museum Of The Troubles and Peace Process
        </h1>
      </header>
      <section className="Section">
        <h2>Peace Process Puzzle Game</h2>
        <p>Explore the history and events of Northern Ireland through our interactive puzzle game.</p>
        <p>Can you find the balance to make a successful Peace Process?</p>
        <Link to="..\pre-game-info">
          <button>Start Puzzle</button>
        </Link>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Reach out to us!</p>
        <a href="http://museumofthetroubles.org/" target="_blank" rel="noopener noreferrer">
          Museum Of The Troubles and Peace Process Home Page
        </a>
      </section>
    </div>
  );
};

export default HomePage;
