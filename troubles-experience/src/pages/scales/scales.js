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
import SettingsDialog from '../../dialogs/settingsDialog';


// MUI IMPORTS
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

//MUI MATERIAL ICONS IMPORTS
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// IMPORT CSS
import './scales.css';

const Scales = () => {
  // STATE OF SCALES/BOOKSHELF/ISSUES
  const [peaceScales, setPeaceScales] = useState(new ScalesObject([], [], [], 0, 0));
  const [bookshelfObject, setBookshelfObject] = useState(new BookshelfObject([]));
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [balancePercentage, setBalancePercentage] = useState(100);
  const [prevBalancePercentage, setPrevBalancePercentage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState('');
  const [popoverContentLineTwo, setPopoverContentLineTwo] = useState('');
  const [popoverTitle, setPopoverTitle] = useState('');
  const [bookName, setBookName] = useState({ show: false, x: 0, y: 0, text: '' });

  const [issues, setIssues] = useState([]);
  const [phaseTwoIssues, setPhaseTwoIssues] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [assetsInitialised, setAssetsInitialised] = useState(false);

  // STATE OF SCALE HEIGHTS/WEIGHTS
  const [unionistHeight, setUnionistHeight] = useState(50);
  const [nationalistHeight, setNationalistHeight] = useState(50);
  const [phaseOneResult, setPhaseOneResult] = useState(0);
  const [phaseTwoResult, setPhaseTwoResult] = useState(0);
  const [scaleTiltAngle, setScaleTiltAngle] = useState(0); // Angle in degrees


  // STATE OF PHASE
  const [currentPhase, setCurrentPhase] = useState(0); // Initial Phase
  const [showContents, setShowContents] = useState(true); // Transitions
  const [phaseIssues, setPhaseIssues] = useState();

  // STATE OF DIALOGS
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);

  //MUI 
  const [checked, setChecked] = React.useState(false);

  // NAVIGATOR CONFIGURATION
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []); 

  async function fetchData() {
      await fetchIssues();     // Wait for issues to be retrieved from DB
      setDataFetched(true);
  }

  useEffect(() => {
    initialiseScales();
    initialiseBookshelfObject();
    initialiseIssues(issues);
    setAssetsInitialised(true);
  }, [issues]);

  useEffect(() => {
    // Update prevBalancePercentage whenever balancePercentage changes
    setPrevBalancePercentage(balancePercentage);
  }, [balancePercentage]);


  const handlePopoverOpen = (event, content, title) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(content.issue.name);
    setPopoverContentLineTwo(content.headline);
    setPopoverTitle(title);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  // Initialise Scales & Bookshelf & Issues
  function initialiseScales() {           
    setPeaceScales(new ScalesObject([], [], [], 0, 0));
  }

  function initialiseBookshelfObject() {
    setBookshelfObject(new BookshelfObject([]));
  }

  function initialiseIssues(issues) {
    setPeaceScales(new ScalesObject([], [], [], 0, 0));
    setBookshelfObject(new BookshelfObject(issues));
    pageTitle = phaseNames[currentPhase];
  }

  // Level Progression
  function SubmitScales() {

    if (currentPhase === 1) {
      setPhaseTwoResult(balancePercentage);
      navigate('/results', { state: { balancePercentages: [phaseOneResult, balancePercentage] } });
    } else {
      setPhaseOneResult(balancePercentage);
      setShowContents(prevShowContents => !prevShowContents); // Make the Contents Disappear

      setTimeout(() => {
        setBalancePercentage(100);
        setCurrentPhase(prevPhase => prevPhase + 1);
        setIssues(phaseTwoIssues);
        initialiseIssues(issues);
        setUnionistHeight(50);
        setNationalistHeight(50);
        setShowContents(prevShowContents => !prevShowContents); // Make the Contents Re-appear
      }, 1200);
    }
  }

  // Function to fetch issues from the server
const fetchIssues = async () => {
  fetch('http://localhost:4000/issues')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch issues');
    })
    .then(data => {
      // Create Issue objects for each issue received
      const parsedIssues = data.map(issue => {
        return new Issue(
          issue.name,
          issue.description_one,
          issue.description_two,
          issue.image_url,
          issue.option_a,
          issue.option_a_nationalist_weight,
          issue.option_a_nationalist_perspective,
          issue.option_a_unionist_weight,
          issue.option_a_unionist_perspective,
          issue.option_b,
          issue.option_b_nationalist_weight,
          issue.option_b_nationalist_perspective,
          issue.option_b_unionist_weight,
          issue.option_b_unionist_perspective,
          issue.option_c,
          issue.option_c_nationalist_weight,
          issue.option_c_nationalist_perspective,
          issue.option_c_unionist_weight,
          issue.option_c_unionist_perspective,
          issue.number_of_options,
          "X"
        );
      });
      setPhaseTwoIssues(parsedIssues.slice(8));
      setIssues(parsedIssues.slice(0,8));
    })
    .catch(error => {
      console.error('Error fetching issues:', error);
    });
};                                    

  // COMPOSITE ARRAY OF PHASES
  const phaseNames = ["1998 Peace Talks", "2020 Restoration Talks"]
  let pageTitle = phaseNames[currentPhase];

  // RESULTS ARRAY
  let resultsArray = [0, 0];

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

  const displaySettingsDialog = () => {
    setSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setSettingsDialogOpen(false);
  };

  // Scale Handling
  const selectOptionA = () => {
    const updatedScales = peaceScales.selectOptionA(selectedIssue);

    setPeaceScales(updatedScales);
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    updateBalanceAndTilt(updatedScales);
    //updateHeightsBasedOnTilt(scaleTiltAngle); // Call updateHeight to recalculate heights
    handleCloseDialog();
  }

  const selectOptionB = () => {
    const updatedScales = peaceScales.selectOptionB(selectedIssue);
    setPeaceScales(updatedScales);
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    updateBalanceAndTilt(updatedScales);
    //updateHeightsBasedOnTilt(scaleTiltAngle); // Call updateHeight to recalculate heights
    handleCloseDialog();
  }

  const selectOptionC = () => {
    const updatedScales = peaceScales.selectOptionC(selectedIssue);
    setPeaceScales(updatedScales);
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    updateBalanceAndTilt(updatedScales);
    //updateHeightsBasedOnTilt(scaleTiltAngle); // Call updateHeight to recalculate heights
    handleCloseDialog();
  }


  const updateBalance = (scales) => {

    const unionistWeight = scales.getUnionistWeight();
    const nationalistWeight = scales.getNationalistWeight();

    const totalWeight = nationalistWeight + unionistWeight;

    let percentage = 0;
    let roundedPercentage = 0;

    if (unionistWeight == 0 || nationalistWeight == 0) {
      setBalancePercentage(0);
    } else if (unionistWeight >= nationalistWeight) {
      percentage = (nationalistWeight / unionistWeight) * 100;
      roundedPercentage = parseFloat(percentage.toFixed(2));
      setBalancePercentage(roundedPercentage);
    } else {
      percentage = (unionistWeight / nationalistWeight) * 100;
      roundedPercentage = parseFloat(percentage.toFixed(2));
      setBalancePercentage(roundedPercentage);
    }

  }

  const updateBalanceAndTilt = (scales) => {
    const balanceDifference = Math.abs(scales.getUnionistWeight() - scales.getNationalistWeight());
    const totalWeight = scales.getUnionistWeight() + scales.getNationalistWeight();
    const balanceRatio = balanceDifference / totalWeight;
    
    // Assuming max tilt of 30 degrees for full imbalance
    const maxTiltDegrees = 70;
    let tiltAngle = balanceRatio * maxTiltDegrees;
  
    // Adjust direction of tilt based on which side is heavier
    if (scales.getUnionistWeight() > scales.getNationalistWeight()) {
      tiltAngle = -tiltAngle; // Tilt to the left for unionist heavier
    }
    
    setScaleTiltAngle(tiltAngle);
    updateHeightsBasedOnTilt(tiltAngle);
  };

  const updateHeightsBasedOnTilt = (tiltAngle) => {
    const maxTiltDegrees = 70;
    const baseHeight = 50; // Assuming both sides start at equal heights when balanced

    const tiltRatio = Math.abs(tiltAngle) / maxTiltDegrees; // Normalize tilt to [0, 1]
    
    // Adjust heights inversely based on tilt
    // The side tilting down gets a height boost, the other side gets a reduction
    const heightAdjustment = tiltRatio * 70; // Max adjustment of 20% for max tilt
    
    let newUnionistHeight, newNationalistHeight;
    if (tiltAngle > 0) { // Nationalist side tilts down
      newNationalistHeight = baseHeight + heightAdjustment;
      newUnionistHeight = baseHeight - heightAdjustment;
    } else { // Unionist side tilts down
      newUnionistHeight = baseHeight + heightAdjustment;
      newNationalistHeight = baseHeight - heightAdjustment;
    }
  
    setUnionistHeight(newUnionistHeight);
    setNationalistHeight(newNationalistHeight);
  };
  

  function logScales() {
    console.log(peaceScales);
    console.log(peaceScales.getNationalistIssues);
    console.log(peaceScales.getUnionistIssues);
  }

  const handleMouseEnter = (event, issue) => {
    setBookName({
      show: true,
      x: event.clientX,
      y: event.clientY,
      text: issue.name // Assuming the issue object has a name property
    });
  };

  const handleMouseLeave = () => {
    setBookName({ ...bookName, show: false });
  };

  const nationalistRows = peaceScales.getNationalistIssues()
  .reduce((acc, issue, idx) => {
    // Create a new row for every 5 issues
    const rowNum = Math.floor(idx / 5);
    if (!acc[rowNum]) {
      acc[rowNum] = [];
    }
    acc[rowNum].push(issue);
    return acc;
  }, []);

  const unionistRows = peaceScales.getUnionistIssues()
  .reduce((acc, issue, idx) => {
    // Create a new row for every 5 issues
    const rowNum = Math.floor(idx / 5);
    if (!acc[rowNum]) {
      acc[rowNum] = [];
    }
    acc[rowNum].push(issue);
    return acc;
  }, []);

  return assetsInitialised ? (
    <div className="page" style={containerStyle}>
      <img src={`${process.env.PUBLIC_URL}/stormont.jpg`} alt="background" style={imageStyle} />
        <div style={{ position: 'relative', zIndex: 2 }}>

        <div className="navBar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
          <HomeIcon className="homeButton" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />

          <SettingsIcon className="settingsButton" sx={{ fontSize: '8vmin', color: 'white'}} onClick={displaySettingsDialog} />

          <CheckCircleOutlineIcon className="submitButton" sx={{ fontSize: '8vmin', marginRight: '10px', paddingLeft: '10px', color: 'white' }} onClick={SubmitScales} />
        </div>

          <div className="titleAndBalanceContainer">
            <Slide direction="down" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
              <h1>{pageTitle}</h1>
            </Slide>

            <Slide direction="down" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
            <h3>
              <AnimatedNumber
                value={balancePercentage}
                formatValue={(value) => value.toFixed(2)}
                duration={1000} // Duration in milliseconds
              />
              % Balance Achieved
            </h3>
            </Slide>
          </div>

          <div className="shelf-and-scale-wrapper">

            <Slide direction="right" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
              <div className="shelf-zone">
            
              <div className='books'>
                {bookshelfObject.getIssues().map((issue, index) => (
                  <div
                    className='bookOnShelf'
                    key={index}
                    onMouseEnter={(e) => handleMouseEnter(e, issue)}
                    onMouseLeave={handleMouseLeave}
                    onClick={displayIssueInfo.bind(this, issue)}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/IMG_2965.png'}
                      alt="Bookshelf"
                      style={{ width: '5vmin', height: 'auto', display: 'block', margin: 'auto' }}
                    />
                  </div>
                ))}
                {bookName.show && (
                  <div
                    className="bookName"
                    style={{
                      fontFamily: 'Anton',
                      position: 'fixed',
                      left: `${bookName.x}px`,
                      top: `${bookName.y}px`,
                      backgroundColor: '#555',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      zIndex: 1000
                    }}
                  >
                    {bookName.text}
                  </div>
                )}
              </div>

                <div className = "shelf" >
                  <img
                  src={process.env.PUBLIC_URL + '/shelf.png'}
                    alt="Bookshelf"
                    style={{ width: '70vmin', 
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
                      {unionistRows.map((rowIssues, idx) => (
                        <div className="unionistRow" key={idx}>
                          {rowIssues.map(issue => (
                            <div className="unionistIssue" key={issue.id}>
                              <img
                          src={process.env.PUBLIC_URL + '/newspaper-stack.png'}
                          alt="Bookshelf"
                          style={{ 
                            width: '8vmin', 
                            height: 'auto',
                            display: 'block',
                            margin: 'auto',
                            cursor: 'pointer'
                          }}
                          aria-describedby={issue.id}
                          onMouseEnter={(event) => handlePopoverOpen(event, issue, 'THE ORANGE HERALD')}
                          // onMouseLeave={handlePopoverClose}
                        />
                        <Popover
                          id={issue.id}
                          open={Boolean(anchorEl)}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          sx={{
                            '.MuiPopover-paper': {
                              width: '300px', 
                            }
                          }}
                        >
                          <div className='newspaperPopoverContainer'>
                            <Typography sx={{ p: 1, color: 'red', fontFamily: 'Anton' }}>{popoverContent}</Typography>
                            <div className="newspaperPopover">
                            <Typography sx={{ p: 0, fontSize: '20px', fontFamily: '"UnifrakturCook", cursive', textAlign: 'center'}}>
                              {popoverTitle}
                            </Typography>
                            <hr />
                            <Typography sx={{ p: 0, fontSize: '20px', textTransform: 'uppercase' }}>
                              "{popoverContentLineTwo}"
                            </Typography>
                            <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                          </div>
                          </div>
                        </Popover> 
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>


                      <div className = "unionistPlatform">
                        <h4>UNIONIST</h4>
                      </div>
                  </div>


                  <div className="nationalistSide" >

                  <div className="nationalistBooks" style={{ height: `${nationalistHeight}%` }}>
                      {nationalistRows.map((rowIssues, idx) => (
                        <div className="nationalistRow" key={idx}>
                          {rowIssues.map(issue => (
                            <div className="nationalistIssue" key={issue.id}>
                              <img
                          src={process.env.PUBLIC_URL + '/newspaper-stack.png'}
                          alt="Bookshelf"
                          style={{ 
                            width: '8vmin', 
                            height: 'auto',
                            display: 'block',
                            margin: 'auto',
                            cursor: 'pointer' // Add cursor pointer for hover effect
                          }}
                          aria-describedby={issue.id}
                          onMouseEnter={(event) => handlePopoverOpen(event, issue, 'THE NORTHERN STAR')}
                          // onMouseLeave={handlePopoverClose}
                        />
                        <Popover
                          id={issue.id}
                          open={Boolean(anchorEl)}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          sx={{
                            '.MuiPopover-paper': {
                              width: '300px', 
                            }
                          }}
                        >
                          <div className='newspaperPopoverContainer'>
                            <Typography sx={{ p: 1, color: 'red', fontFamily: 'Anton' }}>{popoverContent}</Typography>
                            <div className="newspaperPopover">
                            <Typography sx={{ p: 0, fontSize: '20px', fontFamily: '"UnifrakturCook", cursive', textAlign: 'center'}}>
                              {popoverTitle}
                            </Typography>
                            <hr />
                            <Typography sx={{ p: 0, fontSize: '20px', textTransform: 'uppercase' }}>
                              "{popoverContentLineTwo}"
                            </Typography>
                            <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                          </div>
                          </div>
                        </Popover> 
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>


                      <div className = "nationalistPlatform">
                        <h4>NATIONALIST</h4>
                      </div>
                  </div>

                  </div>
                  </Slide>
              </div>
            </div>
    
        <IssueDialog
          isOpen={isDialogOpen}
          handleOptionA={selectOptionA}
          handleOptionB={selectOptionB}
          handleOptionC={selectOptionC}
          handleClose={handleCloseDialog}
          issue={selectedIssue}
        />

        <SettingsDialog 
              isOpen={isSettingsDialogOpen}
              handleClose={handleCloseSettingsDialog}/>

        <ConfirmQuitDialog 
          isOpen={isConfirmQuitDialogOpen}
          handleClose={handleCloseConfirmQuitDialog}/>

        <RotateDeviceMessage />
    </div>
  ): null;
};

export default Scales;




