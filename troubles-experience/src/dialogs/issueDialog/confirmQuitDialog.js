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

const ConfirmQuitDialog = ({ isOpen, handleClose}) => {
  return (
    <Dialog open={isOpen} 
            onClose={handleClose} 
            className = "dialogueBox" 
            TransitionComponent={Zoom} 
            transitionDuration={500}>
      <DialogTitle style = {{color: 'black'}} sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)' }}>Are You Sure You Want to Quit?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: 'calc(var(--base-font-size) + 1.5vmin)' }}>
          All Progress Will Be Lost.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="outlined" 
                      aria-label="outlined button group"
                      style={{ margin: 'auto', scale: '100%', paddingBottom: '20px' }}>
        <Link to="..\">
            <Button color="error" sx={{ fontSize: 'calc(var(--base-font-size) + 1vmin)' }}>Quit</Button>
        </Link>
          <Button onClick={handleClose} sx={{ fontSize: 'calc(var(--base-font-size) + 1vmin)' }}>Cancel</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmQuitDialog;
