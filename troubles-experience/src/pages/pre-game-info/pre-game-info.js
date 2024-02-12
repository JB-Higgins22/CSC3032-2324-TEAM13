import React, { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

// IMPORT CSS
import './pre-game-info.css';
import { Padding } from '@mui/icons-material';

const PreGameInfo = () => {
    const [showContent, setShowContent] = useState(true);
    const [currentContent, setCurrentContent] = useState(0);

    // NAVIGATOR CONFIGURATION
    const navigate = useNavigate();
  
    // Function to toggle content visibility
    const toggleContent = () => {
      setShowContent(prevState => !prevState);
    };

    const nextInfo = () => {
        setShowContent(prevState => !prevState);

        setTimeout(() => {
            setCurrentContent(currentContent + 1);
            setShowContent(prevState => !prevState); // Make the Contents Re-appear
          }, 1200);
        
    }

    function playGame() {
        navigate('/scales');
    }


    const allContent = ["The Troubles were an ethno-nationalist conflict in Northern Ireland that lasted for about 30 years from the late 1960s to 1998. Also known internationally as the Northern Ireland conflict, it is sometimes described as an 'irregular war' or 'low-level war'. The conflict began in the late 1960s and is usually deemed to have ended with the Good Friday Agreement of 1998. Although the Troubles mostly took place in Northern Ireland, at times violence spilled over into parts of the Republic of Ireland, England, and mainland Europe.",
                        "The conflict was primarily political and nationalistic, fuelled by historical events. It also had an ethnic or sectarian dimension[36] but despite use of the terms Protestant and Catholic to refer to the two sides, it was not a religious conflict. A key issue was the status of Northern Ireland. Unionists and loyalists, who for historical reasons were mostly Ulster Protestants, wanted Northern Ireland to remain within the United Kingdom. Irish nationalists and republicans, who were mostly Irish Catholics, wanted Northern Ireland to leave the United Kingdom and join a united Ireland.",
                        "The main participants in the Troubles were republican paramilitaries such as the Provisional Irish Republican Army (IRA) and the Irish National Liberation Army (INLA); loyalist paramilitaries such as the Ulster Volunteer Force (UVF) and Ulster Defence Association (UDA); British state security forces such as the British Army and RUC; and political activists. "]

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(20%)', // Adjust brightness to darken the image
    zIndex: 0
  };

  const titleWrapperStyle = {
    position: 'absolute',
    top: 0, // Position at the top
    left: 0, // Position at the left
    zIndex: 2,
    fontFamily: 'Anton, sans-serif', // Use 'Anton' font from Google Fonts
  };

  const titleStyle = {
    fontSize: '4em', // Adjust as needed for the desired font size
    color: 'white', // Adjust as needed for the desired font color
    textAlign: 'left', // Align text to the left
  };

  const informationWrapperStyle = {
    textAlign: 'left', // Align text to the left
    color: 'white', // Adjust as needed for the desired font color
  };

  return ( 
    <div className="page" style={containerStyle}>
      <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" style={imageStyle} />
      <div style={titleWrapperStyle}>
        <div className="titleWrapper">
          <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
            <h1 style={titleStyle}>A BACKGROUND ON THE TROUBLES</h1>
          </Slide>
          <div className="informationWrapper" style={informationWrapperStyle}>
            <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1300}>
                <p>{allContent[currentContent]}</p>
            </Slide>

            <Button disabled={currentContent == 2} onClick={nextInfo}>Next</Button>
            <Button disabled={currentContent != 2} onClick={playGame}>Play Game</Button>
          </div>       
        </div>
      </div>
    </div>
  );
};

export default PreGameInfo;
