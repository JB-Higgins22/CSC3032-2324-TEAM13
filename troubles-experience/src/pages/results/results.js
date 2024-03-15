import React, { useState } from 'react';
import RotateDeviceMessage from '../../components/rotate-device-message';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SettingsDialog from '../../dialogs/settingsDialog';
import ConfirmQuitDialog from '../../dialogs/issueDialog/confirmQuitDialog';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';


const ResultsPage = () => {
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);

  const location = useLocation();
  const { balancePercentages } = location.state;
  const navigate = useNavigate();

  const averageResult = calculateAverageResult(balancePercentages);


  function calculateAverageResult(balancePercentages) {
    if (balancePercentages.length === 0) {
      return 0;
    }
    const total = balancePercentages.reduce((acc, currentValue) => acc + currentValue, 0);
    return total / balancePercentages.length;
  }

  function leaveReflection() {
    navigate('/reflection');
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
    zIndex: 0
};

const titleWrapperStyle = {
    position: 'absolute',
    top: '7%',
    left: 0,
    zIndex: 2,
    fontFamily: 'Anton, sans-serif',
    width: '100%'
};

const titleStyle = {
    fontSize: '14vmin',
    color: 'white',
    textAlign: 'left',
    paddingLeft: '3%'
};

const informationWrapperStyle = {
    textAlign: 'left',
    color: 'white',
    fontSize: '10vmin',
    paddingLeft: '5%'
};

const ButtonStyle = {
  fontFamily: 'Anton',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  backgroundColor: '#F0FFFF',
  color: '#007bff',
  border: '1px solid #007bff',
  '&:hover': {
      backgroundColor: '#04aa23',
      color: '#fff',
  }
}

  
return (
    <div className="page" style={containerStyle}>
            <img src={`${process.env.PUBLIC_URL}/newspaperDark.jpeg`} alt="background" style={imageStyle} />
            <div className="navBar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
              <HomeIcon className="homeButton" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />


              <SettingsIcon className="settingsButton" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
            </div>
            <div style={titleWrapperStyle}>
                <div className="titleWrapper">
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                        <h1 style={titleStyle}>RESULTS</h1>
                    </Slide>
                    <div className="informationWrapper" style={informationWrapperStyle}>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1300}>
                            <h3 style = {{fontSize: '4vmin'}}>1998 Peace Talks - {balancePercentages[0]}% Balance Achieved</h3>
                    </Slide>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1300}>
                            <h3 style = {{fontSize: '4vmin'}}>2020 Restoration Talks - {balancePercentages[1]}% Balance Achieved</h3>
                    </Slide>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1500}>
                            <h3 style = {{fontSize: '8vmin'}}>{averageResult}% Balance Achieved Overall</h3>
                    </Slide>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1800}>
                      <Button style={ButtonStyle} onClick={leaveReflection}>Leave a Reflection</Button>
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

            <RotateDeviceMessage />
        </div>
  );
};

export default ResultsPage;
