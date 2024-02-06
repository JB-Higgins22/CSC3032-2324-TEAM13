// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import ScalesObject from '../../classes/scales';
import BookshelfObject from '../../classes/bookshelf';
import Issue from '../../classes/issue';
import IssueDialog from '../../dialogs/issueDialog/issueDialog';
import ConfirmQuitDialog from '../../dialogs/issueDialog/confirmQuitDialog';
import RotateDeviceMessage from '../../components/rotate-device-message';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedNumber from "animated-number-react";


// MUI IMPORTS
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// IMPORT CSS
import './scales.css';

const Scales = () => {
  // STATE OF SCALES/BOOKSHELF/ISSUES
  const [peaceScales, setPeaceScales] = useState(new ScalesObject([], [], 0, 0));
  const [bookshelfObject, setBookshelfObject] = useState(new BookshelfObject([]));
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [balancePercentage, setBalancePercentage] = useState(100);
  const [prevBalancePercentage, setPrevBalancePercentage] = useState(0);

  // STATE OF SCALE HEIGHTS/WEIGHTS
  const [unionistHeight, setUnionistHeight] = useState(10);
  const [nationalistHeight, setNationalistHeight] = useState(10);

  // STATE OF PHASE
  const [currentPhase, setCurrentPhase] = useState(0); // Initial Phase
  const [showContents, setShowContents] = useState(true); // Transitions

  // STATE OF DIALOGS
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);

  //MUI 
  const [checked, setChecked] = React.useState(false);

  // NAVIGATOR CONFIGURATION
  const navigate = useNavigate();

  useEffect(() => {
    initialiseScales();
    initialiseBookshelfObject();
    initialiseIssues(currentPhase);
  }, []); 

  useEffect(() => {
    // Update prevBalancePercentage whenever balancePercentage changes
    setPrevBalancePercentage(balancePercentage);
  }, [balancePercentage]);

  // Initialise Scales & Bookshelf & Issues
  function initialiseScales() {           
    setPeaceScales(new ScalesObject([], [], 0, 0));
  }

  function initialiseBookshelfObject() {
    setBookshelfObject(new BookshelfObject([]));
  }

  function initialiseIssues(currentPhase) {
    setPeaceScales(new ScalesObject([], [], 0, 0));
    setBookshelfObject(new BookshelfObject(phaseIssues[currentPhase]));
    pageTitle = phaseNames[currentPhase];
  }

  // Level Progression
  function SubmitScales() {
    console.log(currentPhase);

    if (currentPhase === 1) {
      navigate('/results');
    } else {
      setShowContents(prevShowContents => !prevShowContents); // Make the Contents Disappear

      setTimeout(() => {
        setCurrentPhase(prevPhase => prevPhase + 1);
        initialiseIssues(currentPhase + 1);
        setUnionistHeight(10);
        setNationalistHeight(10);
        setShowContents(prevShowContents => !prevShowContents); // Make the Contents Re-appear
      }, 1200);
    }
  }

  //1998 PHASE ISSUES
  const decommissioningIssue = new Issue('Decommissioning', 
                                            'Decommissioning in Northern Ireland was a process in the Belfast Agreement as part of the Northern Ireland peace process. Under the Good Friday Agreement/ Belfast Agreement, all paramilitary groups fighting in the Troubles would be subject to decommission. Decommissioning was a defining issue in the effort to negotiate peace in Northern Ireland.', 
                                            'The Independent International Commission on Decommissioning (IICD) was established to oversee the decommissioning. Its objective was to facilitate the decommissioning of firearms, ammunition and explosives.',
                                            '/guns.avif',
                                            10);

  const northSouthCouncilIssue = new Issue('North/South Council', 
                                              'The North/South Ministerial Council (NSMC) is a body established under the Good Friday Agreement to co-ordinate activity and exercise certain governmental powers across the whole island of Ireland. The Council takes the form of meetings between ministers from both the Republic of Ireland and Northern Ireland and is responsible for twelve policy areas. Six of these areas are the responsibility of corresponding North/South Implementation Bodies. The body is based in the city of Armagh in Northern Ireland.', 
                                              'The North/South Ministerial Council and the Northern Ireland Assembly are "mutually inter-dependent" institutions: one cannot exist without the other.',
                                              '/north-south-council.jpeg',
                                              10);

  const britishIrishCouncilIssue = new Issue('British/Irish Council', 
                                              'The British and Irish governments, and political parties in Northern Ireland, agreed to form a council under the British–Irish Agreement, part of the Good Friday Agreement reached in 1998. The council was formally established on 2 December 1999, when the Agreement came into effect. The councils stated aim is to "promote the harmonious and mutually beneficial development of the totality of relationships among the peoples of these islands".', 
                                              'At its June 2010 summit, the Council decided to move forward on recommendations to enhance the relationship between it and the British-Irish Parliamentary Assembly (BIPA).',
                                              '/british-irish-council.jpeg',
                                              10);

  const selfDeterminationIssue = new Issue('The Right to Self-Determination', 
                                            'Under the terms of the British-Irish Agreement, both governments Recognised that it was the right of all persons born in Northern Ireland to identify as Irish or British, or both, and to hold both Irish and British citizenship if they so choose. This right is to continue regardless of any change in the status of Northern Ireland', 
                                            'Desc Two',
                                            '/self-determination.webp',
                                            10);

  const phase1998Issues = [decommissioningIssue, northSouthCouncilIssue, britishIrishCouncilIssue, selfDeterminationIssue];

  // 2020 PHASE ISSUES
  const irishSeaBorderIssue = new Issue('Irish Sea Border', 
                                            'Desc One', 
                                            'Desc Two',
                                            '/self-determination.webp',
                                            10);

  const phase2020Issues = [irishSeaBorderIssue];

  // COMPOSITE ARRAY OF PHASES
  const phaseIssues = [phase1998Issues, phase2020Issues];
  const phaseNames = ["1998 Peace Talks", "2020 Restoration Talks"]
  let pageTitle = phaseNames[currentPhase];

  // Page Styling
  const containerStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(50%)', // Adjust brightness to darken the image
    zIndex: 0
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  };

  // Dialog Handling
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

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  // Scale Handling
  const placeOnUnionistSide = () => {
    const updatedScales = peaceScales.placeOnUnionist(selectedIssue);
    const updatedBookshelf = bookshelfObject.removeBook(selectedIssue);
    setPeaceScales(updatedScales);
    setBookshelfObject(updatedBookshelf);
    updateHeight(updatedScales); // Call updateHeight to recalculate heights
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    handleCloseDialog();
  };
  
  const placeOnNationalistSide = () => {
    const updatedScales = peaceScales.placeOnNationalist(selectedIssue);
    const updatedBookshelf = bookshelfObject.removeBook(selectedIssue);
    setPeaceScales(updatedScales);
    setBookshelfObject(updatedBookshelf);
    updateHeight(updatedScales); // Call updateHeight to recalculate heights
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    handleCloseDialog();
  };

  const updateHeight = (scales) => {
    const imageHeight = 20; // Example height of the image
    const unionistHeight = scales.getUnionistIssues().length * imageHeight;
    const nationalistHeight = scales.getNationalistIssues().length * imageHeight;
    setUnionistHeight(unionistHeight);
    setNationalistHeight(nationalistHeight);
  };

  const updateBalance = (scales) => {
    const unionistWeight = scales.getUnionistWeight();
    const nationalistWeight = scales.getNationalistWeight();

    const totalWeight = nationalistWeight + unionistWeight;

    // Calculate percentages
    let unionistPercentage = 0;
    let nationalistPercentage = 0;

    if (unionistWeight !== 0) {
      unionistPercentage = (unionistWeight / totalWeight) * 100;
    }

    if (nationalistWeight !== 0) {
      nationalistPercentage = (nationalistWeight / totalWeight) * 100;
    }
    
    // Calculate balance percentage
    const balancePercentage = Math.abs(nationalistPercentage - unionistPercentage);
    const roundedBalancePercentage = parseFloat(balancePercentage.toFixed(2)); // Rounding to 2 decimal places

    setBalancePercentage(roundedBalancePercentage);

  }

  return (
    <div className="page" style={containerStyle}>
      <img src={`${process.env.PUBLIC_URL}/stormont.jpg`} alt="background" style={imageStyle} />
        <div style={{ position: 'relative', zIndex: 2 }}>

        <div className="navBar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
          <HomeIcon className="homeButton" sx={{ fontSize: 60, marginRight: '10px' }} onClick={displayConfirmQuitDialog} />

          <Link to="..\settings">
          <SettingsIcon className="settingsButton" sx={{ fontSize: 60 }} />
          </Link>

          <CheckCircleOutlineIcon className="submitButton" sx={{ fontSize: 60, marginRight: '10px', paddingLeft: '10px' }} onClick={SubmitScales} />
        </div>


          <Slide direction="down" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
            <h1>{pageTitle}</h1>
          </Slide>

          <h3>
            <AnimatedNumber
              value={balancePercentage}
              formatValue={(value) => value.toFixed(2)}
              duration={1000} // Duration in milliseconds
            />
            % Balance Achieved
          </h3>

          <div className="shelf-and-scale-wrapper">

          <Slide direction="right" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
            <div className="shelf-zone">

              <div className='books'>
              {bookshelfObject.getIssues().map((issue) => (
                <div className='bookOnShelf'
                onClick={displayIssueInfo.bind(this, issue)}>
                  <img
                    src={process.env.PUBLIC_URL + '/single-book.png'}
                      alt="Bookshelf"
                      style={{ width: '2em', 
                                height: 'auto',
                                display: 'block',
                                margin: 'auto' }} />
                </div>
              ))}
              </div>

              <div className = "shelf" >
                <img
                src={process.env.PUBLIC_URL + '/shelf.png'}
                  alt="Bookshelf"
                  style={{ width: '80%', 
                            height: 'auto',
                            display: 'block',
                            margin: 'auto' }} />
              </div>


            </div>
            </Slide>

            <Slide direction="left" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
            <div
              className="drop-zone"
              style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            >
                <div className="unionistSide">

                  <div className="unionistBooks" style={{ height: `${unionistHeight}%` }}>
                      {peaceScales.getUnionistIssues().map((issue) => (
                        <div
                          className="unionistIssue"
                          onClick={displayIssueInfo.bind(this, issue)}
                          key={issue.id}
                        >
                          <img
                    src={process.env.PUBLIC_URL + '/single-book.png'}
                      alt="Bookshelf"
                      style={{ width: '2em', 
                                height: 'auto',
                                display: 'block',
                                margin: 'auto' }} />
                        </div>
                    ))}
                    </div>

                    <div className = "unionistPlatform">
                      <h4>{peaceScales.getUnionistWeight()}</h4>
                    </div>
                </div>


                <div className="nationalistSide" >

                  <div className="nationalistBooks" style={{ height: `${nationalistHeight}%` }}>
                      {peaceScales.getNationalistIssues().map((issue) => (
                        <div
                          className="nationalistIssue"
                          onClick={displayIssueInfo.bind(this, issue)}
                          key={issue.id}
                        >
                          <img
                    src={process.env.PUBLIC_URL + '/single-book.png'}
                      alt="Bookshelf"
                      style={{ width: '2em', 
                                height: 'auto',
                                display: 'block',
                                margin: 'auto' }} />
                        </div>
                    ))}
                    </div>

                    <div className = "nationalistPlatform">
                      <h4>{peaceScales.getNationalistWeight()}</h4>
                    </div>
                </div>

                </div>
                </Slide>
            </div>
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

        <RotateDeviceMessage />
    </div>
    </div>
  );
};

export default Scales;


  // ================= OLD DRAG & DROP LOGIC  =================
  // const handleDragStart = (issue) => {
  //   setDraggedIssue(issue);
  // };

  // const handleDragOver = (event) => {
  //   event.preventDefault();
  // };

  // const handleDrop = (event) => {
  //   event.preventDefault();
  
  //   if (draggedIssue) {
  //     const isOnUnionistSide = event.target.className.includes('unionistSide');
  //     const isOnNationalistSide = event.target.className.includes('nationalistSide');
  
  //     // Update the scales accordingly
  //     if (isOnUnionistSide) {
  //       setPeaceScales((prevScales) => prevScales.placeOnUnionist(draggedIssue));
  //     } else if (isOnNationalistSide) {
  //       setPeaceScales((prevScales) => prevScales.placeOnNationalist(draggedIssue));
  //     }
  
  //     // Clear the dragged issue state after the drop
  //     setDraggedIssue(null);
  //   }
  // };
  //  =================  =================  =================