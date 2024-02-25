import React, { useState, useEffect } from "react";
import './reflection.css';
import { scaleLog } from '@visx/scale';

import Example from "../../components/word-cloud";

const Reflection = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [words, setWords] = useState([{ text: 'hello', value: 1 }]);
  const [fontScale, setFontScale] = useState([1, 1]);
  const [reflections, setReflections] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // New state variable
  const [showWordCloud, setShowWordCloud] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchReflections();
      setDataFetched(true);
    };

    fetchData();
  }, []);

  const wordFreq = (text) => {
    const wordsArray = text.replace(/\./g, '').split(/\s/);
    const freqMap = {};
  
    for (const w of wordsArray) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }

    return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
  }

  const fontSizeSetter = async (datum) => {
    if (!fontScale) {
      return 0; // Return a default font size
    }
    const scaledFontSize = await fontScale(datum.value);
    return scaledFontSize;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reflectionData = {
      userName: name,
      userLocation: location,
      userReflection: thoughts
    };

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

  const fetchReflections = async () => {
    try {
      const response = await fetch('http://localhost:4000/getapprovedreflections');
      if (!response.ok) {
        throw new Error('Failed to fetch reflections');
      }
      const data = await response.json();
  
      let concatenatedContent = "";
      data.forEach(reflection => {
        concatenatedContent += reflection.content + " ";
      });
  
      const wordsToSet = wordFreq(concatenatedContent);
      setWords(wordsToSet);
      setReflections(data);
    } catch (error) {
      console.error('Error fetching reflections:', error);
    }
  };

  return (
    <div className="background">
      <div className="reflection-container">
        <h1>Share Your Reflections</h1>
        {!showWordCloud && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your Name"
              required
            />
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Where are you from?"
              required
            />
            <textarea
              value={thoughts}
              onChange={(event) => setThoughts(event.target.value)}
              placeholder="Share your thoughts..."
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
        <div>
          <label>
            Show Word Cloud:
            <input
              type="checkbox"
              checked={showWordCloud}
              onChange={() => setShowWordCloud(!showWordCloud)}
            />
          </label>
        </div>
        {dataFetched && showWordCloud && <Example words={words} width={400} height={400} />}
      </div>

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
