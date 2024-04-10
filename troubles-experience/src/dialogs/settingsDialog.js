import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Zoom from '@mui/material/Zoom';
import BasicTabs from '../pages/settings/tabs';
import { alpha } from '@mui/system';



const dialogStyles = {
  width: '40vw',
  height: '29.7cm',
  background: '#094565',
  border: '2px solid rgb(255, 255, 255)'
};

const SettingsDialog = ({ isOpen, handleClose }) => {

  return (

    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Zoom}
      transitionDuration={500}
      PaperProps={{ style: { ...dialogStyles } }}
    >
      <DialogTitle sx={{ fontFamily: 'Anton', fontSize: 'calc(var(--base-font-size) + 4vmin)' }}>Settings</DialogTitle>
      <DialogContent>
        <BasicTabs />
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          style={{ margin: 'auto', scale: '100%', paddingBottom: '20px' }}
        >
          <Button sx={{
            color: 'white', // Set the text color to green
            '&:hover': {
              bgcolor: alpha('#ffffff', 0.04), // Light green background on hover
            },
            fontSize: 'calc(var(--base-font-size) + 1vmin)' // Adjust font size
          }}
            onClick={handleClose} role="button" aria-label="closeSettings">Close</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
