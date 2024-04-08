// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI IMPORTS
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

// CSS IMPORT
import './tutorial.css';

// COMPONENT IMPORTS
import DeviceOrientation from '../../components/device-orientation';
import SettingsDialog from '../../dialogs/settingsDialog';
import ConfirmQuitDialog from '../../dialogs/confirmQuitDialog';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const Tutorial = () => {
    const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [currentContent, setCurrentContent] = useState(0);
    const navigate = useNavigate();

    const toggleContent = () => {
      setShowContent(prevState => !prevState);
    };

    const nextInfo = () => {
        setShowContent(prevState => !prevState);
        setTimeout(() => {
            setCurrentContent(currentContent + 1);
            setShowContent(prevState => !prevState);
          }, 1200);
    }

    function playGame() {
        navigate('/scales');
    }

    

    const allContent = ["Step 1 - Select an issue by clicking on a book - each book represents a key issue with multiple hypothetical solutions",
                        "Step 2 - Choose which solution you think is best for each issue while trying to avoid bias",
                        "Step 3 - Balance the issues on the scales - click on books to repoen them and change which side they're on"]

    const images = [`${process.env.PUBLIC_URL}/tutorial-1.png`,
                    `${process.env.PUBLIC_URL}/tutorial-2.png`,
                    `${process.env.PUBLIC_URL}/tutorial-3.png`];

      const displaySettingsDialog = () => {
        setSettingsDialogOpen(true);
      };
    
      const handleCloseSettingsDialog = () => {
        setSettingsDialogOpen(false);
      };
      
      const displayConfirmQuitDialog = () => {
        setConfirmQuitDialogOpen(true);
      };
    
      const handleCloseConfirmQuitDialog = () => {
        setConfirmQuitDialogOpen(false);
      };

    const containerStyle = {
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
    };

    const imageStyle = {
        position: 'relative',
        overflow: 'auto',
        whiteSpace: 'normal',
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
    };

    const tutorialImageStyle = {
        filter: 'brightness(100%)',
        width: '85%',
        height: '80%',
        padding: '4px'
    };

    const titleStyle = {
        fontSize: 'calc(var(--base-font-size) + 10vmin)',
        color: 'white',
        left: 0,
        textAlign: 'center',
    }
    const titleWrapperStyle = {
        position: 'absolute',
        top: '9%',
        left: 0,
        zIndex: 2,
        fontFamily: 'Anton, sans-serif',
        textAlign: 'left', // Ensure text aligns left
        width: '100%', // Ensure the container spans the full width
    };

    const informationWrapperStyle = {
        fontSize: '2vw',
        textAlign: 'left',
        padding: '15px',
        color: 'white',
    };

    return ( 
        <div className="page" style={containerStyle}>
            <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" className='background-image' />
            <div className="nav-bar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
              <HomeIcon className="home-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />
              <SettingsIcon className="settings-button" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
            </div>
            <div className="titleWrapper" style={titleWrapperStyle}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                    <h1 style={titleStyle}>HOW TO PLAY GAME</h1>
                </Slide>
                <div className="informationWrapper" style={informationWrapperStyle} >         
                    <div className="columns">
                        <div className="column">
                            <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1200}>
                                <p>{allContent[currentContent]}<br/></p>
                            </Slide>
                            <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1300}>
                                <Button 
                                    sx={{
                                    width: '40%',
                                    fontFamily: 'Anton',
                                    textTransform: 'capitalize',
                                    padding: '10px 20px',
                                    backgroundColor: '#F0FFFF',
                                    color: '#007bff',
                                    border: '2px solid #007bff',
                                    fontSize: 'calc(var(--base-font-size) + 2vmin)',
                                    '&:hover': {
                                        backgroundColor: '#04aa23',
                                        color: '#fff',                                            
                                        border: '1px solid #fff',
                                    }
                                    }}
                                    disabled={currentContent === 2 && currentContent !== 2} 
                                    onClick={currentContent === 2 ? playGame : nextInfo}
                                    >
                                    {currentContent === 2 ? "Play Game" : "Next"}
                                </Button>
                            </Slide>
                        </div>
                        <div className="column2">
                            <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1450}>
                                <p>
                                    <img src={images[currentContent]} alt={`Step ${currentContent + 1}`} style={tutorialImageStyle} />
                                </p>
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>              
            <ConfirmQuitDialog 
              isOpen={isConfirmQuitDialogOpen}
              handleClose={handleCloseConfirmQuitDialog}/>

            <SettingsDialog 
              isOpen={isSettingsDialogOpen}
              handleClose={handleCloseSettingsDialog}/>     
        <DeviceOrientation />
        </div>
    );
};

export default Tutorial;
