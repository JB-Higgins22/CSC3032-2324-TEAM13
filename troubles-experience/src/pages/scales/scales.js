import React, { useState, useEffect } from 'react';
import ScalesObject from '../../classes/scales';
import Issue from '../../classes/issue';
import IssueDialog from '../../dialogs/issueDialog/issueDialog';
import ConfirmQuitDialog from '../../dialogs/issueDialog/confirmQuitDialog';
//MUI IMPORTS
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import './scales.css';

const Scales = () => {
  const [peaceScales, setPeaceScales] = useState(new ScalesObject([], [], 0, 0));
  const [draggedIssue, setDraggedIssue] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  //MUI
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    initialiseScales();
    initialiseIssues();
  }, []); 

  function resetScales() {
    initialiseScales();
    initialiseIssues();
  }

  function initialiseScales() {
    setPeaceScales(new ScalesObject([], [], 0, 0));
  }

  function initialiseIssues() {
    const decommissioningIssue = new Issue('Decommissioning', 
                                            'Decommissioning in Northern Ireland was a process in the Belfast Agreement as part of the Northern Ireland peace process. Under the Good Friday Agreement/ Belfast Agreement, all paramilitary groups fighting in the Troubles would be subject to decommission. Decommissioning was a defining issue in the effort to negotiate peace in Northern Ireland.', 
                                            10);

    const northSouthCouncilIssue = new Issue('North/South Council', 
                                              'The North/South Ministerial Council (NSMC) is a body established under the Good Friday Agreement to co-ordinate activity and exercise certain governmental powers across the whole island of Ireland. The Council takes the form of meetings between ministers from both the Republic of Ireland and Northern Ireland and is responsible for twelve policy areas. Six of these areas are the responsibility of corresponding North/South Implementation Bodies. The body is based in the city of Armagh in Northern Ireland.', 
                                              10);

    const britishIrishCouncilIssue = new Issue('British/Irish Council', 
                                              'The British and Irish governments, and political parties in Northern Ireland, agreed to form a council under the British–Irish Agreement, part of the Good Friday Agreement reached in 1998. The council was formally established on 2 December 1999, when the Agreement came into effect. The councils stated aim is to "promote the harmonious and mutually beneficial development of the totality of relationships among the peoples of these islands".', 
                                              10);

    const selfDeterminationIssue = new Issue('The Right to Self-Determination', 
                                            'Under the terms of the British-Irish Agreement, both governments Recognised that it was the right of all persons born in Northern Ireland to identify as Irish or British, or both, and to hold both Irish and British citizenship if they so choose. This right is to continue regardless of any change in the status of Northern Ireland', 
                                            10);

    setPeaceScales(new ScalesObject([], [northSouthCouncilIssue, britishIrishCouncilIssue, selfDeterminationIssue, decommissioningIssue], 0, 40));
  }

  const displayIssueInfo = (issue) => {
    setSelectedIssue(issue);
    setDialogOpen(true);
  };

  const displayConfirmQuitDialog = () => {
    setConfirmQuitDialogOpen(true);
  };

  const handleCloseConfirmQuitDialog = () => {
    setConfirmQuitDialogOpen(false);
  };

  const placeOnUnionistSide = () => {
    setPeaceScales((prevScales) => prevScales.placeOnUnionist(selectedIssue));
    handleCloseDialog();
  }

  const placeOnNationalistSide = () => {
    setPeaceScales((prevScales) => prevScales.placeOnNationalist(selectedIssue));
    handleCloseDialog();
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const handleDragStart = (issue) => {
    setDraggedIssue(issue);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
  
    if (draggedIssue) {
      const isOnUnionistSide = event.target.className.includes('unionistSide');
      const isOnNationalistSide = event.target.className.includes('nationalistSide');
  
      // Update the scales accordingly
      if (isOnUnionistSide) {
        setPeaceScales((prevScales) => prevScales.placeOnUnionist(draggedIssue));
      } else if (isOnNationalistSide) {
        setPeaceScales((prevScales) => prevScales.placeOnNationalist(draggedIssue));
      }
  
      // Clear the dragged issue state after the drop
      setDraggedIssue(null);
    }
  };

  return (
    <div>

        <Button variant="outlined" color="error" className="quitButton" onClick={displayConfirmQuitDialog}>
          Quit
        </Button>

      <Slide direction="down" in={true} mountOnEnter unmountOnExit timeout={1000}>
        <h1>Scales</h1>
      </Slide>
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1000}>
          <div className="unionistSide">
            <h2>Unionist Side</h2>
            <h4>{peaceScales.getUnionistWeight()}</h4>
            {peaceScales.getUnionistIssues().map((issue) => (
              <div
                className="unionistIssue"
                onClick={displayIssueInfo.bind(this, issue)}
                key={issue.id}
                draggable
                onDragStart={() => handleDragStart(issue)}
                style={{ marginBottom: '10px', cursor: 'move' }}
              >
                {issue.name}
              </div>
            ))}
          </div>
        </Slide>
        <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
          <div className="nationalistSide">
            <h2>Nationalist Side </h2>
            <h4>{peaceScales.getNationalistWeight()}</h4>
            {peaceScales.getNationalistIssues().map((issue) => (
              <div
                className="nationalistIssue"
                onClick={displayIssueInfo.bind(this, issue)}
                key={issue.id}
                draggable
                onDragStart={() => handleDragStart(issue)}
                style={{ marginBottom: '10px', cursor: 'move' }}
              >
                {issue.name}
              </div>
            ))}
          </div>
        </Slide>
      </div>
  
      <IssueDialog
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        handlePlaceUnionist={placeOnUnionistSide}
        handlePlaceNationalist={placeOnNationalistSide}
        issue={selectedIssue}
      />

      <ConfirmQuitDialog 
        isOpen={isConfirmQuitDialogOpen}
        handleClose={handleCloseConfirmQuitDialog}/>


    </div>
  );
};

export default Scales;
