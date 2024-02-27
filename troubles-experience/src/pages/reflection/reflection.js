// REACT IMPORT
import React, { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WordCloudComponent from "../../components/word-cloud";
import RotateDeviceMessage from "../../components/rotate-device-message";

// EXTERNAL LIBRARIES
import { Slide } from "@mui/material";
import BadWordsFilter from 'bad-words';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// CSS IMPORT
import './reflection.css';


const Reflection = () => {

  // REFLECTION DATA
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [thoughts, setThoughts] = useState("");

  // WORD CLOUD STATES
  const [words, setWords] = useState([{ text: 'hello', value: 1 }]);
  const [reflections, setReflections] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  // ANIMATION STATES
  const [showReflectionForm, setShowReflectionForm] = useState(true);
  const [showWordCloud, setShowWordCloud] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await fetchReflections();     // Wait for reflections to be retrieved from DB
      setDataFetched(true);
    };

    fetchData();
  }, []);


  const handleSubmit = (event) => {     // Handle submission of reflection
    event.preventDefault();
    
    // Filter out bad words
    const filter = new BadWordsFilter();
    const filteredThoughts = filter.clean(thoughts);

    const reflectionData = {
      userName: name,
      userLocation: location,
      userReflection: filteredThoughts // Using the filtered thoughts
    };

    // Hit addreflection endpoint in backend
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

    // Change page contents
    setShowReflectionForm(false);

    setTimeout(() => {
      setShowWordCloud(true);
    }, 1200);
  };

  const fetchReflections = async () => {  // retrive the reflections from the DB
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

      // words to exclude from the word cloud
      const stopWords = new Set(["the", "a", "I", "an", "you", "me", "on", "in", "at", "by", "with",
                                "this", "that", "these", "those",
                                "and", "but", "or", "nor",
                                "he", "she", "it", "they", "we", "us", "them",
                                "is", "are", "was", "were", "have", "has", "had", "do", "does", "did",
                                "oh", "hey", "hi", "hello", "ah", "hmm"]);

      // Split the concatenated content into words
      const wordsArray = concatenatedContent.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

      // Calculate word occurence values
      const freqMap = {};
      wordsArray.forEach(word => {
        if (!stopWords.has(word)) {
          if (!freqMap[word]) freqMap[word] = 0;
          freqMap[word] += 1;
        }
      });

      const wordsToSet = Object.keys(freqMap).map(word => ({ text: word, value: freqMap[word] }));

      setWords(wordsToSet);
      setReflections(data);
    } catch (error) {
      console.error('Error fetching reflections:', error);
    }
};


// STYLE CONSTANTS
const containerStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
};

const imageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(20%)',
    zIndex: -1
};

const reflectionContainerStyle = {
    fontSize: '2vw',
    textAlign: 'left',
    color: 'white',
};



  return (
    <div style = {{containerStyle}} >
      <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" style={imageStyle} />

      <Slide direction="down" in={showReflectionForm} mountOnEnter unmountOnExit timeout={1000}>
        <div className="reflection-container" style = {{reflectionContainerStyle}}>
          <h1>Share Your Reflections</h1>
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
                maxLength={250}
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
        </div>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
        <div className = "reflectionContentContainer">
            <h1>USER REFLECTIONS</h1>
            <div className="wordCloudContainer">
              <div className="wordCloud" style={{ backgroundColor: 'white', 
                                                  display: 'flex', 
                                                  justifyContent: 'center', 
                                                  alignItems: 'center', 
                                                  width: '400px', 
                                                  height: '400px' }}>
                  <WordCloudComponent words={words} width={400} height={400} />
              </div>
          </div>

        </div>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
      <Grid container spacing={2}>
                {reflections.map(reflection => (
                  <Grid item xs={12} sm={6} md={4} key={reflection.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {reflection.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Location: {reflection.location}
                        </Typography>
                        <Typography variant="body1">
                          {reflection.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
      </Slide>


      <RotateDeviceMessage />
    </div>
  );
};

export default Reflection;
