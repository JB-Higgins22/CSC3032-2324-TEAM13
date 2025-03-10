// REACT IMPORT
import React, { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WordCloudComponent from "../../components/word-cloud";
import DeviceOrientation from "../../components/device-orientation";
import ConfirmQuitDialog from "../../dialogs/confirmQuitDialog";
import SettingsDialog from "../../dialogs/settingsDialog";

// EXTERNAL LIBRARIES
import { Slide } from "@mui/material";
import BadWordsFilter from 'bad-words';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

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
  const remainingChars = thoughts.length;

  //DIALOG STATES
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await fetchReflections();     // Wait for reflections to be retrieved from DB
      setDataFetched(true);
    };

    fetchData();
  }, []);


  const handleSubmit = (event) => {     // Handle submission of reflection
    event.preventDefault();

    const filter = new BadWordsFilter(); // Filter out bad words using BadWordsFilter Library
    const filteredName = name ? filter.clean(name) : '';
    const filteredLocation = location ? filter.clean(location) : '';
    const filteredThoughts = thoughts ? filter.clean(thoughts) : '';


    const reflectionData = {          // Using the filtered data
      userName: filteredName,
      userLocation: filteredLocation,
      userReflection: filteredThoughts
    };

    fetch('http://localhost:4000/addreflection', {  // Hit addreflection endpoint in backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reflectionData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Reflection submitted successfully');
          setName("");                                // Reset input fields on the form
          setLocation("");
          setThoughts("");
        } else {
          throw new Error('Failed to submit reflection');
        }
      })
      .catch(error => {
        console.error('Error submitting reflection:', error);   // Log error if POST fails
      });

    skipForm();   // Call function to hide the form and display the Word Cloud
  };

  const fetchReflections = async () => {
    try {
      const response = await fetch('http://localhost:4000/getapprovedreflections'); // Hit appropriate endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch reflections');
      }
      const data = await response.json();

      let reflectionsToDisplay = data;
      if (data.length > 33) {
        // If there are more than 33 reflections, randomly select 33
        let shuffled = data.sort(() => 0.5 - Math.random());
        reflectionsToDisplay = shuffled.slice(0, 33);
      }

      let concatenatedContent = "";
      reflectionsToDisplay.forEach(reflection => {
        concatenatedContent += reflection.content + " ";
      });

      // words to exclude from the word cloud
      const stopWords = new Set(["the", "a", "I", "an", "you", "me", "on", "in", "at", "by", "with",
        "this", "that", "these", "those",
        "and", "but", "or", "nor",
        "he", "she", "it", "they", "we", "us", "them",
        "is", "are", "was", "were", "have", "has", "had", "do", "does", "did",
        "oh", "hey", "hi", "hello", "ah", "hmm", "to", "of", "its", "for"]);

      // Split the concatenated content into words
      const wordsArray = concatenatedContent.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

      // Calculate word occurrence values - This has been taken from VisX Word Cloud example code @ https://airbnb.io/visx/wordcloud
      const freqMap = {};
      wordsArray.forEach(word => {
        if (!stopWords.has(word)) {
          if (!freqMap[word]) freqMap[word] = 0;
          freqMap[word] += 1;
        }
      });

      const wordsToSet = Object.keys(freqMap).map(word => ({ text: word, value: freqMap[word] }));

      setWords(wordsToSet);
      setReflections(reflectionsToDisplay);
    } catch (error) {
      console.error('Error fetching reflections:', error);    //Log error if GET fails
    }
  };

  function skipForm() {
    // Change page contents
    setShowReflectionForm(false);

    setTimeout(() => {              // Allow enough time for contents to disappear before introducing WordCloud
      setShowWordCloud(true);
    }, 1200);
  }

  function refreshWordCloud() {     // Allow the user to refresh the page to see a different collection of reflections
    setShowWordCloud(prevShowContents => !prevShowContents)

    setTimeout(() => {
      fetchReflections();
      setShowWordCloud(prevShowContents => !prevShowContents)
    }, 1200);

  }

  const displaySettingsDialog = () => {                 // Handle Changing State of Settings Dialog
    setSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {             // Handle Changing State of Settings Dialog
    setSettingsDialogOpen(false);
  };

  const displayConfirmQuitDialog = () => {              // Handle Changing State of Confirm Quit Dialog
    setConfirmQuitDialogOpen(true);
  };

  const handleCloseConfirmQuitDialog = () => {          // Handle Changing State of Confirm Quit Dialog
    setConfirmQuitDialogOpen(false);
  };


  return (
    <div className="container">
      <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" className="image" />     {/* Set the background image */}
      <div className="navBar" style={{ position: 'fixed', top: '20px', left: '20px' }}>                                                                         {/* MUI Icons for Home/Settings */}
        <HomeIcon className="home-button" sx={{ fontSize: '8vmin', color: 'white', "&:hover": { color: '#04aa23' } }} onClick={displayConfirmQuitDialog} />
        <SettingsIcon className="settings-button" sx={{ fontSize: '8vmin', color: 'white', "&:hover": { color: '#04aa23' } }} onClick={displaySettingsDialog} />
      </div>

      <Slide direction="down" in={showReflectionForm} mountOnEnter unmountOnExit timeout={1000}>
        <div className="reflection-container">                                                        {/* Form for leaving reflections on experience */}
          <h1>Share Your Reflections</h1>
          <div className="reflection-form" aria-label="reflection-form">
            <form onSubmit={handleSubmit} style={{ width: '80vmin' }}>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your Name" required maxLength={50}/>
              <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Where are you from?" maxLength={50} required />
              <textarea value={thoughts} onChange={(event) => setThoughts(event.target.value)} placeholder="Share your thoughts..." maxLength={250} required></textarea>
              <div className="remaining-chars" aria-label="remaining-chars">{remainingChars} / 250</div>
              <button type="submit">Submit</button>
              <button style={{ fontFamily: 'Anton' }} onClick={skipForm}>I Don't Want To Leave a Reflection</button>
            </form>
          </div>
        </div>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
        <div className="reflection-content-container">
          <h1>USER REFLECTIONS</h1>
          <div className="word-cloud-container">
            <div className="word-cloud">
              <WordCloudComponent words={words} width={400} height={400} aria-label="word-cloud" />                           {/* Mount the VisX WordCloud Component */}
            </div>
          </div>
        </div>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
        <div className="bias-notice">*Reflections are randomly selected to reduce bias*</div>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
        <Grid container spacing={2} aria-label="reflection-grid">
          {/* Use MUI Grid to display the full reflections of users */}
          {reflections.map(reflection => (
            <Grid item xs={12} sm={6} md={4} key={reflection.id}>
              <Card style={{ backgroundColor: '#d3e0ed' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom style={{ fontFamily: 'Anton' }} sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)' }}>
                    {reflection.username} | {reflection.location}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: 'calc(var(--base-font-size) + 1vmin)' }}>
                    {reflection.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
        <div className="refresh-container">
          <Button className="refresh-button" onClick={refreshWordCloud} aria-label="refresh-button">Refresh The Word Cloud</Button>
        </div>
      </Slide>

      <ConfirmQuitDialog isOpen={isConfirmQuitDialogOpen} handleClose={handleCloseConfirmQuitDialog} /> {/* Dialogs for Home/Settings */}
      <SettingsDialog isOpen={isSettingsDialogOpen} handleClose={handleCloseSettingsDialog} />
      <DeviceOrientation />
    </div>
  );
};

export default Reflection;
