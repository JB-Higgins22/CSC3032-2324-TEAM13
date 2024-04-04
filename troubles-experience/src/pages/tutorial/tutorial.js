import React, { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './tutorial.css';
import { Padding } from '@mui/icons-material';
import DeviceOrientation from '../../components/device-orientation';

const Tutorial = () => {
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

    const allContent = ["Step 1 - Select an issue by clicking on a book - tutorial tutorial tutorial tutorial tutorial tutorial tutorial tutorial",
                        "Step 2 - Choose which solution you think is best for each issue tutorial tutorial tutorial tutorial tutorial",
                        "Step 3 - Balance the issues on the scales - click on books to repoen them and change which side they're on tutorial tutorial tutorial tutorial tutorial"]

    const images = [`${process.env.PUBLIC_URL}/Tutorial_Step1.png`,
                    `${process.env.PUBLIC_URL}/Tutorial_Step2.png`,
                    `${process.env.PUBLIC_URL}/Tutorial_Step3.png`];


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

    const titleWrapperStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        fontFamily: 'Anton',
    };

    const informationWrapperStyle = {
        fontSize: '2vw',
        textAlign: 'left',
        padding: '15px',
        color: 'white',
    };
    
    const titleStyle = {
        fontSize: '6vw',
        color: 'white',
        textAlign: 'left',
        padding: '15px',
    };

    const column = {
        width: '49%'
    };

    const row = {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
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
            
            <div style={titleWrapperStyle}>
                
                <Slide direction= {showContent ? "left" : "right"} in={showContent} mountOnEnter unmountOnExit timeout={1300}>
                <p>
                    <div style={row}>
                        <div style={column}>
                            <div className="titleWrapper">
                                <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                                    <h1 style={titleStyle}>HOW TO PLAY GAME</h1>
                                </Slide>
                                <div className="informationWrapper" style={informationWrapperStyle}>    
                                    {allContent[currentContent]}<br/>
                                    <Button 
                                        style={currentContent !== 2 ? buttonNextstyle : invisibleButtonstyle} 
                                        disabled={currentContent === 2} 
                                        onClick={nextInfo}>
                                        Next
                                    </Button><br/>
                                    <Button 
                                        style={currentContent === 2 ? buttonPlaystyle : invisibleButtonstyle} 
                                        disabled={currentContent !== 2} 
                                        onClick={playGame}>
                                        Play Game
                                    </Button>
                                </div>
                                
                            </div>
                        </div>            
                        <div style={column}>
                            <img src={images[currentContent]} alt={`Step ${currentContent + 1}`} style={tutorialImageStyle} />
                        </div>
                    </div>                         
                </p>
                </Slide>
                        
            </div>       
        <DeviceOrientation />
        </div>
    );
};

export default Tutorial;
