// IssueDialog.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Zoom from '@mui/material/Zoom';
import { Link } from "react-router-dom";

const dialogStyles = {
  background: '#094565',
  border: '2px solid rgb(255, 255, 255)'
  };

const ConfirmQuitDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="dialogueBox"
      TransitionComponent={Zoom}
      transitionDuration={500}
      PaperProps={{ style: { ...dialogStyles } }} 
    >
      {/* Font Size based on Global base size*/}
      <DialogTitle style={{ color: 'white', fontFamily: 'Anton' }} sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)' }}>
        Are You Sure You Want to Quit?
      </DialogTitle>
      <DialogContent sx = {{textAlign: 'center'}}>
        <DialogContentText sx={{ fontSize: 'calc(var(--base-font-size) + 1.5vmin)', color: 'white' }}>
          All Progress Will Be Lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          style={{ margin: 'auto', scale: '100%', paddingBottom: '20px' }}
        >
          {/* Can choose to close dialog or return to Home Screen */}
          <Link to="..\">
            <Button role="button" aria-label="confirmQuit" color="error" sx={{ fontSize: 'calc(var(--base-font-size) + 1vmin)' }}>
              Quit
            </Button>
          </Link>
          <Button role="button" aria-label="closeConfirmQuit" onClick={handleClose} sx={{ fontSize: 'calc(var(--base-font-size) + 1vmin)' }}>
            Cancel
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};


export default ConfirmQuitDialog;
