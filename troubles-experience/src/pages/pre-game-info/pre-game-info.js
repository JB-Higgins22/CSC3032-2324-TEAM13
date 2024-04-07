// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI IMPORTS
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

// CSS IMPORT
import './pre-game-info.css';

// COMPONENT IMPORTS
import DeviceOrientation from '../../components/device-orientation';
import SettingsDialog from '../../dialogs/settingsDialog';
import ConfirmQuitDialog from '../../dialogs/confirmQuitDialog';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const PreGameInfo = () => {
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

    function playTutorial() {
        navigate('/tutorial');
    }

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

    const allContent = [
      "The Troubles, also known as the Northern Ireland conflict, was a complex and multifaceted ethno-nationalist struggle that spanned roughly three decades from the late 1960s until 1998. This period of conflict, often characterized as a 'low-level war' or 'irregular war', primarily unfolded in Northern Ireland, though it occasionally extended into the Republic of Ireland, England, and other parts of mainland Europe. The conflict officially concluded with the signing of the Good Friday Agreement in 1998.",
      "At its core, the Troubles were driven by political, nationalistic, and historical grievances rather than religious differences, despite the common reference to the Catholic and Protestant communities. The central issue was the constitutional status of Northern Ireland, with unionists and loyalists—predominantly from the Ulster Protestant community—advocating for its continued membership in the United Kingdom, and Irish nationalists and republicans—mainly Irish Catholics—seeking its integration into a united Ireland.",
      "The primary actors in this conflict included republican paramilitary groups like the Provisional Irish Republican Army (IRA) and the Irish National Liberation Army (INLA), loyalist paramilitaries such as the Ulster Volunteer Force (UVF) and the Ulster Defence Association (UDA), British state security forces (the British Army and the Royal Ulster Constabulary), and various political activists."
  ]

    const containerStyle = {
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
    };

    const titleWrapperStyle = {
        position: 'absolute',
        top: '9%',
        left: 0,
        zIndex: 2,
        fontFamily: 'Anton, sans-serif',
        textAlign: 'left', // Ensure text aligns left
        width: '100%', // Ensure the container spans the full width
      };
      

return ( 
        <div className="page" style={containerStyle}>
            <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" className='background-image' />
            <div className="nav-bar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
              <HomeIcon className="home-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />
              <SettingsIcon className="settings-button" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
            </div>
            <div style={titleWrapperStyle}>
                <div className="title-wrapper">
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                        <h1 className = "title">A BACKGROUND ON THE TROUBLES</h1>
                    </Slide>
                    <div className="information-wrapper">
                        <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1300}>
                            <p>{allContent[currentContent]}</p>                            
                        </Slide>
                        <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1450}>
                            <Button 
                              sx={{
                                width: '20%',
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
                              onClick={currentContent === 2 ? playTutorial : nextInfo}
                            >
                              {currentContent === 2 ? "How to Play Game" : "Next"}
                            </Button>
                          </Slide>
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

export default PreGameInfo;
