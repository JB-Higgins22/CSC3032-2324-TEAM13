import React, { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './pre-game-info.css';
import { Padding } from '@mui/icons-material';
import RotateDeviceMessage from '../../components/rotate-device-message';
import SettingsDialog from '../../dialogs/settingsDialog';
import ConfirmQuitDialog from '../../dialogs/issueDialog/confirmQuitDialog';

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

    const allContent = ["The Troubles were an ethno-nationalist conflict in Northern Ireland that lasted for about 30 years from the late 1960s to 1998. Also known internationally as the Northern Ireland conflict, it is sometimes described as an 'irregular war' or 'low-level war'. The conflict began in the late 1960s and is usually deemed to have ended with the Good Friday Agreement of 1998. Although the Troubles mostly took place in Northern Ireland, at times violence spilled over into parts of the Republic of Ireland, England, and mainland Europe.",
                        "The conflict was primarily political and nationalistic, fuelled by historical events. It also had an ethnic or sectarian dimension[36] but despite use of the terms Protestant and Catholic to refer to the two sides, it was not a religious conflict. A key issue was the status of Northern Ireland. Unionists and loyalists, who for historical reasons were mostly Ulster Protestants, wanted Northern Ireland to remain within the United Kingdom. Irish nationalists and republicans, who were mostly Irish Catholics, wanted Northern Ireland to leave the United Kingdom and join a united Ireland.",
                        "The main participants in the Troubles were republican paramilitaries such as the Provisional Irish Republican Army (IRA) and the Irish National Liberation Army (INLA); loyalist paramilitaries such as the Ulster Volunteer Force (UVF) and Ulster Defence Association (UDA); British state security forces such as the British Army and RUC; and political activists."]

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
      

    const buttonstyle = {
        fontFamily: 'Anton',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#04aa23',
            color: '#fff',
        }
    };

    const buttonNextstyle = {
        ...buttonstyle,
        backgroundColor: '#F0FFFF',
        color: '#007bff',
        border: '1px solid #007bff',
        '&:hover': {
            backgroundColor: '#04aa23',
            color: '#fff',
        }
    };

    const buttonPlaystyle = {
        ...buttonstyle,
        backgroundColor: '#F0FFFF',
        color: '#007bff',
        border: '1px solid #007bff',
        '&:hover': {
            backgroundColor: '#04aa23',
            color: '#fff',
        }
    };

    const invisibleButtonstyle = {
        ...buttonstyle,
        visibility: 'hidden',
    };
    

return ( 
        <div className="page" style={containerStyle}>
            <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" className='background-image' />
            <div className="navBar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
              <HomeIcon className="homeButton" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />


              <SettingsIcon className="settingsButton" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
            </div>
            <div style={titleWrapperStyle}>
                <div className="titleWrapper">
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                        <h1 className = "title">A BACKGROUND ON THE TROUBLES</h1>
                    </Slide>
                    <div className="informationWrapper">
                        <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1300}>
                            <p>{allContent[currentContent]}</p>
                            
                        </Slide>
                        <Button 
                            style={currentContent !== 2 ? buttonNextstyle : invisibleButtonstyle} 
                            disabled={currentContent === 2} 
                            onClick={nextInfo}>
                            Next
                        </Button><br/>
                        <Button 
                            style={currentContent === 2 ? buttonPlaystyle : invisibleButtonstyle} 
                            disabled={currentContent !== 2} 
                            onClick={playTutorial}>
                            How to Play Game
                        </Button>
                    </div>       
                </div>
            </div>

            <ConfirmQuitDialog 
              isOpen={isConfirmQuitDialogOpen}
              handleClose={handleCloseConfirmQuitDialog}/>

            <SettingsDialog 
              isOpen={isSettingsDialogOpen}
              handleClose={handleCloseSettingsDialog}/>

            <RotateDeviceMessage />
        </div>
    );
};

export default PreGameInfo;
