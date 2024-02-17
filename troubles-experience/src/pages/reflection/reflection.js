import React, { useState } from "react";
import './reflection.css';

const Reflection = () => {
  // Define state variables to store user inputs
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [thoughts, setThoughts] = useState("");

  // Incomplete function to handle form submission
  const handleSubmit = (x) => {
    
  };

  return (
    <div className="background">
      <div className="reflection-container">
        <h1>Share Your Reflections</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(x) => setName(x.target.value)} // Update name state onChange
            placeholder="Your Name"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(x) => setLocation(x.target.value)} // Update location state onChange
            placeholder="Where are you from?"
            required
          />
          <textarea
            value={thoughts}
            onChange={(x) => setThoughts(x.target.value)} // Update thoughts state onChange
            placeholder="Share your thoughts..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reflection;