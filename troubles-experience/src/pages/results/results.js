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

import './results.css';


const ResultsPage = () => {
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);

  const location = useLocation();
  const { balancePercentages = [0, 0] } = location.state || {};
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

  return (
    <div className="page">
      <img 
        src={`${process.env.PUBLIC_URL}/newspaper.jpeg`} 
        alt="background" 
        className="background-image" 
      />
      <div className="navBar">
        <HomeIcon className="homeButton" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />
        <SettingsIcon className="settingsButton" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
      </div>
      <div className="titleWrapper">
        <div>
          <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
            <h1 className="title">RESULTS</h1>
          </Slide>
          <div className="informationWrapper">
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <h3 className="informationHeader header1998">1998 Peace Talks - {balancePercentages[0]}%</h3>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <h3 className="informationHeader header2020">2020 Restoration Talks - {balancePercentages[1]}%</h3>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <h3 className="informationHeader averageResultHeader">{averageResult}% Balance Achieved Overall</h3>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <Button className="reflectionButton" onClick={leaveReflection}>Leave a Reflection</Button>
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
