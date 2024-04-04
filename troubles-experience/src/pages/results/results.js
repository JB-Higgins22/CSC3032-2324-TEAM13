// REACT IMPORTS
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// COMPONENT IMPORTS
import DeviceOrientation from '../../components/device-orientation';
import SettingsDialog from '../../dialogs/settingsDialog';
import ConfirmQuitDialog from '../../dialogs/confirmQuitDialog';

// MUI IMPORTS
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
    const averagePercentage =  total / balancePercentages.length;
    const roundedAveragePercentage = parseFloat(averagePercentage.toFixed(2));
    return roundedAveragePercentage;
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
      <div className="nav-bar">
        <HomeIcon className="home-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />
        <SettingsIcon className="settings-button" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />
      </div>
      <div className="title-wrapper">
        <div>
          <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
            <h1 className="title">RESULTS</h1>
          </Slide>
          <div className="information-wrapper">
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <h3 className="information-header header1998">1998 Peace Talks - {balancePercentages[0]}%</h3>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <h3 className="information-header header2020">2020 Restoration Talks - {balancePercentages[1]}%</h3>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <h3 className="information-header average-result-header">{averageResult}% Balance Achieved Overall</h3>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
              <Button className="reflection-button" onClick={leaveReflection}>Leave a Reflection</Button>
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

export default ResultsPage;
