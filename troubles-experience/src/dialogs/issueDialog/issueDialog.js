import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import CloseIcon from '@mui/icons-material/Close';

// Define Styles Here For Dialog - Can't Pass Whole StyleSheet to PaperProps
const dialogStyles = {
  background: '#EEEADC',
  width: '21cm',
  height: '29.7cm',
};

const IssueDialog = ({ isOpen, handleClose, issue, handleOptionA, handleOptionB, handleOptionC }) => {
  return (
    <Dialog open={isOpen}
            onClose={handleClose}
            className="dialogueBox"
            TransitionComponent={Zoom}
            transitionDuration={500}
            PaperProps={{ style: { ...dialogStyles } }}>
      <DialogTitle style = {{color: 'black'}}>
        {issue && issue.name}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {issue && issue.descriptionOne}
        </DialogContentText>
        <br />
        <DialogContentText>
          {issue && issue.descriptionTwo}
        </DialogContentText>
        <br />
        <img src={process.env.PUBLIC_URL + issue?.imageURL}
             alt="Issue Image"
             style={{
               width: '70%',
               height: 'auto',
               display: 'block',
               margin: 'auto'
             }} />
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="outlined"
                     aria-label="outlined button group"
                     style={{
                       margin: 'auto',
                       justifyContent: 'center',
                       scale: '100%',
                       paddingBottom: '20px'
                     }}>
          <Button onClick={handleOptionA} style = {{width: '30%'}}>{issue?.optionA}</Button>
          <Button onClick={handleOptionB} style = {{width: '30%'}} >{issue?.optionB}</Button>
          { (issue?.numberOfOptions === 3) && (
            <Button onClick={handleOptionC} style = {{width: '30%'}}>{issue?.optionC}</Button>
          )}
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default IssueDialog;
