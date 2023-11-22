import React from 'react';
import { Link } from "react-router-dom";
import './home.css';

const HomePage = () => {
  return (
    
    <div className="Container">
    <header className="Header">
      <h1>Museum of Troubles and Peace Process</h1>
    </header>
    <section className="Section">
        <h2>Peace Process Puzzle Game</h2>
        <p>Explore the history and events of Northern Ireland through our interactive puzzle game.</p>
        <p>Can you find the balance to make a successful Peace Process? </p>
        <Link to="..\scales">
          <button>Start Puzzle</button>
        </Link>
      </section>
      <section>
        <h2>About the Museum</h2>
        <p>Learn about the historical context and significance of the Troubles and Peace Process in Northern Ireland.</p>
        {/* Add more information about the museum here */}
        <a href="http://museumofthetroubles.org/" target="_blank" rel="noopener noreferrer">
          Museum Of The Troubles and Peace Process
        </a>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Reach out to us!</p>
        {/* Add contact information or a form here */}
      </section>
      </div>

  );
};

export default HomePage;
