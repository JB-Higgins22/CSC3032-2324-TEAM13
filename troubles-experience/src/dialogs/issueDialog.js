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

const dialogStyles = {          // Dialog Styled to resemble A4 page
  background: '#EEEADC',
  maxWidth: '50vw',
  width: '50vw',
  height: '29.7cm',
};

const IssueDialog = ({ isOpen, handleClose, issue, handleOptionA, handleOptionB, handleOptionC }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="dialogueBox"
      TransitionComponent={Zoom}
      transitionDuration={500}
      PaperProps={{ style: { ...dialogStyles } }}
    >
      {/* Font Sizes set relative to global base font size */}
      <DialogTitle style={{ color: 'black' }} sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)' }}>
        {issue && issue.name}
        <IconButton role="button" aria-label="closeIssueDialog" onClick={handleClose} style={{ display: 'none' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Access & Display Issue Data */}
        <DialogContentText sx={{ fontSize: 'calc(var(--base-font-size) + 1.5vmin)' }}>
          {issue && issue.descriptionOne}
        </DialogContentText>
        <br />
        <DialogContentText sx={{ fontSize: 'calc(var(--base-font-size) + 1.5vmin)' }}>
          {issue && issue.descriptionTwo}
        </DialogContentText>
        <br />
        {/* Point towards desired Image */}
        <img
          src={process.env.PUBLIC_URL + issue?.imageURL}
          alt="Issue Image"
          style={{
            width: '70%',
            height: 'auto',
            display: 'block',
            margin: 'auto'
          }}
        />
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          style={{
            margin: 'auto',
            justifyContent: 'center',
            scale: '100%',
            paddingBottom: '20px'
          }}
        >
          <Button role="button"
            aria-label="optionA"
            onClick={handleOptionA} style={{
              width: '30%',
              height: 'auto',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              WebkitHyphens: 'auto',
              MozHyphens: 'auto',
              MsHyphens: 'auto'
            }}
            sx={{ fontSize: 'calc(var(--base-font-size) + 0.9vmin)' }}>{issue?.optionA}</Button>
          <Button role="button"
            aria-label="optionB"
            onClick={handleOptionB} style={{
              width: '30%',
              height: 'auto',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              WebkitHyphens: 'auto',
              MozHyphens: 'auto',
              MsHyphens: 'auto'
            }} sx={{ fontSize: 'calc(var(--base-font-size) + 0.9vmin)' }}>{issue?.optionB}</Button>
          {/* Option C button rendered Conditionally */}
          {(issue?.numberOfOptions === 3) && (
            <Button role="button" aria-label="optionC" onClick={handleOptionC} style={{
              width: '30%',
              height: 'auto',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              WebkitHyphens: 'auto',
              MozHyphens: 'auto',
              MsHyphens: 'auto'
            }} sx={{ fontSize: 'calc(var(--base-font-size) + 0.9vmin)' }}>{issue?.optionC}</Button>
          )}
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};


export default IssueDialog;
