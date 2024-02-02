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


// Define Styles Here For Dialog - Can't Pass Whole StyleSheet to PaperProps
const dialogStyles = {
  background: '#EEEADC',
  width: '21cm',
  height: '29.7cm',
};

const IssueDialog = ({ isOpen, handleClose, issue, handlePlaceUnionist, handlePlaceNationalist}) => {
  return (
    <Dialog open={isOpen} 
            onClose={handleClose} 
            className = "dialogueBox" 
            TransitionComponent={Zoom} 
            transitionDuration={500}
            PaperProps={{ style: { ...dialogStyles } }}>
      <DialogTitle>{issue && issue.name}</DialogTitle>
      <DialogContent>
        <DialogContentText >
          {issue && issue.descriptionOne}
          </DialogContentText>
          <br />
          <DialogContentText >
          {issue && issue.descriptionTwo}
          </DialogContentText>
          <br />
          <img src={process.env.PUBLIC_URL + issue?.imageURL}
          alt="British & Irish Passports"
          style={{ width: '70%', 
                    height: 'auto',
                    display: 'block',
                    margin: 'auto' }} />
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="outlined" 
                      aria-label="outlined button group"
                      style={{ margin: 'auto', scale: '100%', paddingBottom: '20px' }}>
          <Button onClick={handlePlaceUnionist}>Place On Unionist Side</Button>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handlePlaceNationalist}>Place On Nationalist Side</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default IssueDialog;
