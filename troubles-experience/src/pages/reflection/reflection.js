import React, { useState, useEffect } from "react"; // Import useState and useEffect
import './reflection.css';

const Reflection = () => {
  // Define state variables to store user inputs
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [reflections, setReflections] = useState([]); // Define reflections state variable

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Prepare the reflection data object
    const reflectionData = {
      userName: name,
      userLocation: location,
      userReflection: thoughts
    };

    // Make an HTTP POST request to your server
    fetch('http://localhost:4000/addreflection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reflectionData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Reflection submitted successfully');
        // Optionally, reset the form fields after successful submission
        setName("");
        setLocation("");
        setThoughts("");
      } else {
        throw new Error('Failed to submit reflection');
      }
    })
    .catch(error => {
      console.error('Error submitting reflection:', error);
    });
  };

  // Fetch reflections from the server when the component mounts
  useEffect(() => {
    fetchReflections();
  }, []);

  // Function to fetch reflections from the server
  const fetchReflections = () => {
    fetch('http://localhost:4000/reflections')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch reflections');
      })
      .then(data => {
        setReflections(data);
      })
      .catch(error => {
        console.error('Error fetching reflections:', error);
      });
  };

  return (
    <div className="background">
      <div className="reflection-container">
        <h1>Share Your Reflections</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)} // Update name state onChange
            placeholder="Your Name"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)} // Update location state onChange
            placeholder="Where are you from?"
            required
          />
          <textarea
            value={thoughts}
            onChange={(event) => setThoughts(event.target.value)} // Update thoughts state onChange
            placeholder="Share your thoughts..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <br/>
      </div><br/>

      <div className="reflections-container">
        <h2>Recent Reflections</h2>
        <ul>
          {reflections.map(reflection => (
            <li key={reflection.id}>
              <strong>Name:</strong> {reflection.username}, <strong>Location:</strong> {reflection.location}<br />
              <strong>Thoughts:</strong> {reflection.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reflection;
