import React, { useState, useEffect } from "react";
import './reflection.css';
import { scaleLog } from '@visx/scale';
import RotateDeviceMessage from "../../components/rotate-device-message";
import { Slide } from "@mui/material";

import BadWordsFilter from 'bad-words'; // Importing bad-words library
import Example from "../../components/word-cloud";
import { DataGrid } from '@mui/x-data-grid';


const Reflection = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [words, setWords] = useState([{ text: 'hello', value: 1 }]);
  const [fontScale, setFontScale] = useState([1, 1]);
  const [reflections, setReflections] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // New state variable
  const [showWordCloud, setShowWordCloud] = useState(false);

  //ANIMATION STATES
  const [showReflectionForm, setShowReflectionForm] = useState(true);

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
    
    // Filtering out bad words from the user's input
    const filter = new BadWordsFilter();
    const filteredThoughts = filter.clean(thoughts);

    const reflectionData = {
      userName: name,
      userLocation: location,
      userReflection: filteredThoughts // Using the filtered thoughts
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

    setShowReflectionForm(false);

    setTimeout(() => {
      setShowWordCloud(true);
    }, 1200);
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

      // Define a list of stop words to exclude from the word cloud
      const stopWords = new Set(["the", "a", "I", "an", "you", "me", "on", "in", "at", "by", "with",
                                "this", "that", "these", "those",
                                "and", "but", "or", "nor",
                                "he", "she", "it", "they", "we", "us", "them",
                                "is", "are", "was", "were", "have", "has", "had", "do", "does", "did",
                                "oh", "hey", "hi", "hello", "ah", "hmm"]);

      // Split the concatenated content into words
      const wordsArray = concatenatedContent.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

      // Calculate word frequencies while excluding stop words
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

const columns = [
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'content', headerName: 'Content', width: 300 },
];

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

const titleWrapperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    fontFamily: 'Anton, sans-serif',
};

const titleStyle = {
    fontSize: '7vw',
    color: 'white',
    textAlign: 'left',
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
                maxLength={250} // Set the maximum character limit to 250
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
                  <Example words={words} width={400} height={400} />
              </div>
          </div>

        </div>
      </Slide>

      <Slide direction="up" in={showWordCloud} mountOnEnter unmountOnExit timeout={1000}>
  <div style={{ width: '100%', backgroundColor: 'white', height: '80vh', marginTop: '20px' }}>
    <DataGrid
      rows={reflections}
      columns={columns}
      pageSize={10} // Increase the number of rows per page
      rowsPerPageOptions={[10, 20, 50, 100]} // Adjust the rows per page options
      checkboxSelection
      disableSelectionOnClick
      autoHeight // Set autoHeight to true
    />
  </div>
</Slide>


      <RotateDeviceMessage />
    </div>
  );
};

export default Reflection;
