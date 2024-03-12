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
      <DialogTitle style = {{color: 'black'}}>Are You Sure You Want to Quit?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All Progress Will Be Lost.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="outlined" 
                      aria-label="outlined button group"
                      style={{ margin: 'auto', scale: '100%', paddingBottom: '20px' }}>
        <Link to="..\">
            <Button color="error">Quit</Button>
        </Link>
          <Button onClick={handleClose}>Cancel</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmQuitDialog;
