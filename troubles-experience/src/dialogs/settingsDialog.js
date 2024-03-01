import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Zoom from '@mui/material/Zoom';
import BasicTabs from '../pages/settings/tabs';

import '../styles/global.css';
import './test.css'
import '../pages/settings/settingsPage.css';

const dialogStyles = {
    width: '21cm',
    height: '29.7cm',
  background: '#094565',
  border: '2px solid rgb(255, 255, 255)',
  
};

const SettingsDialog = ({ isOpen, handleClose, onFontSizeChange, blackAndWhiteMode }) => {
    const [fontIncrease, setFontIncrease] = useState(false);
  
    const handleFontChange = (newValue) => {
      setFontIncrease(newValue);
      onFontSizeChange(newValue);
      document.body.style.fontSize = `${newValue}%`;
    };
  
    return (
      <Dialog
      open={isOpen}
      onClose={handleClose}
      className={blackAndWhiteMode ? "black-white-mode" : ""}
      TransitionComponent={Zoom}
      transitionDuration={500}
      PaperProps={{ style: { ...dialogStyles } }}
    >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
        <BasicTabs onFontSizeChange={onFontSizeChange} />
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            style={{ margin: 'auto', scale: '100%', paddingBottom: '20px' }}
          >
            <Button onClick={handleClose}>Close</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    );
  };

export default SettingsDialog;
