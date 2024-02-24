import React, { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './tutorial.css';
import { Padding } from '@mui/icons-material';
import RotateDeviceMessage from '../../components/rotate-device-message';

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

    const allContent = ["Step 1 - Select an issue by clicking on a book",
                        "Step 2 - Choose which solution you think is best for each issue",
                        "Step 3 - Balance the issues on the scales - click on books to repoen them and change which side they're on"]

    const images = [`${process.env.PUBLIC_URL}/Tutorial_Step1.png`,
                    `${process.env.PUBLIC_URL}/Tutorial_Step2.png`,
                    `${process.env.PUBLIC_URL}/Tutorial_Step3.png`
                    ];


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
        filter: 'brightness(20%)',
        zIndex: 0
    };

    const tutorialImageStyle = {
        filter: 'brightness(100%)',
        width: '85%',
        height: '80%',
        padding: '9px 0'
    };

    const titleWrapperStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        fontFamily: 'Anton, sans-serif',
    };

    const informationWrapperStyle = {
        fontSize: '2vw',
        textAlign: 'left',
        padding: '9px',
        color: 'white',
    };
    
    const titleStyle = {
        fontSize: '6vw',
        color: 'white',
        textAlign: 'left',
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


    return ( 
        <div className="page" style={containerStyle}>
            <img src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} alt="background" style={imageStyle} />
            
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
                                    <Button disabled={currentContent === 2} onClick={nextInfo}>Next</Button><br/>
                                    <Button disabled={currentContent !== 2} onClick={playGame}>Play Game</Button>
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
        <RotateDeviceMessage />
        </div>
    );
};

export default Tutorial;
