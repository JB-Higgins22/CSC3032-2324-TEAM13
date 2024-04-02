// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import ScalesObject from '../../classes/scales';
import BookshelfObject from '../../classes/bookshelf';
import Issue from '../../classes/issue';
import IssueDialog from '../../dialogs/issueDialog/issueDialog';
import ConfirmQuitDialog from '../../dialogs/issueDialog/confirmQuitDialog';
import RotateDeviceMessage from '../../components/rotate-device-message';
import { useNavigate } from 'react-router-dom';
import AnimatedNumber from "animated-number-react";
import SettingsDialog from '../../dialogs/settingsDialog';


// MUI IMPORTS
import Slide from '@mui/material/Slide';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState('');
  const [popoverContentLineTwo, setPopoverContentLineTwo] = useState('');
  const [popoverTitle, setPopoverTitle] = useState('');
  const [bookName, setBookName] = useState({ show: false, x: 0, y: 0, text: '' });
  const [nationalistWeight, setNationalistWeight] = useState(0);
  const [unionistWeight, setUnionistWeight] = useState(0);

  const [issues, setIssues] = useState([]);
  const [phaseTwoIssues, setPhaseTwoIssues] = useState([]);
  const [assetsInitialised, setAssetsInitialised] = useState(false);

  // STATE OF SCALE HEIGHTS/WEIGHTS
  const [unionistHeight, setUnionistHeight] = useState(50);
  const [nationalistHeight, setNationalistHeight] = useState(50);
  const [phaseOneResult, setPhaseOneResult] = useState(0);


  // STATE OF PHASE
  const [currentPhase, setCurrentPhase] = useState(0); // Initial Phase
  const [showContents, setShowContents] = useState(true); // Transitions

  // STATE OF DIALOGS
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);

  // NAVIGATOR CONFIGURATION
  const navigate = useNavigate();

  /*

      --------------- INITIALISATION LOGIC ---------------

  */

  useEffect(() => {
    // Request Issues from DB upon component mount
    fetchData();
  }, []); 

  async function fetchData() {
    // Wait for issues to be retrieved from DB
      await fetchIssues();
  }

  // Executes after Issues retrieved from DB
  useEffect(() => {
    initialiseIssues(issues);

    // Set assetsInitialised to true, allowing page contents to render
    setAssetsInitialised(true);
  }, [issues]);


  // Initialise the Scales & Bookshelf objects
  function initialiseIssues(issues) {
    setPeaceScales(new ScalesObject([], [], [], 0, 0));
    setBookshelfObject(new BookshelfObject(issues));
    pageTitle = phaseNames[currentPhase];
  }

  // Level Progression
  function SubmitScales() {

    if (currentPhase === 1) {
      // Pass balance percentages to Results page
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

      // Split Issues into two phases
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

  /*

      --------------- DIALOG HANDLING ---------------

  */

  // DIALOG HANDLING - Issue Dialog
  const displayIssueInfo = (issue) => {
    setSelectedIssue(issue);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // DIALOG HANDLING - Confirm Quit Dialog
  const displayConfirmQuitDialog = () => {
    setConfirmQuitDialogOpen(true);
  };

  const handleCloseConfirmQuitDialog = () => {
    setConfirmQuitDialogOpen(false);
  };

  // DIALOG HANDLING - Settings Dialog
  const displaySettingsDialog = () => {
    setSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setSettingsDialogOpen(false);
  };

  /*

      --------------- SCALES HANDLING ---------------

  */

  // SCALES HANDLING - Option A
  const selectOptionA = () => {
    const updatedScales = peaceScales.selectOptionA(selectedIssue);
    setPeaceScales(updatedScales);

    // Call updateBalance to recalculate the scale balance
    updateBalance(updatedScales);
    updateBalanceAndTilt(updatedScales);
    
    // Set Weights on scale object
    setNationalistWeight(updatedScales?.getNationalistWeight());
    setUnionistWeight(updatedScales?.getUnionistWeight());
    handleCloseDialog();
  }

  // SCALES HANDLING - Option B
  const selectOptionB = () => {
    const updatedScales = peaceScales.selectOptionB(selectedIssue);
    setPeaceScales(updatedScales);

    // Call updateBalance to recalculate the scale balance
    updateBalance(updatedScales);
    updateBalanceAndTilt(updatedScales);

    // Set Weights on scale object
    setNationalistWeight(updatedScales?.getNationalistWeight());
    setUnionistWeight(updatedScales?.getUnionistWeight());
    handleCloseDialog();
  }

  // SCALES HANDLING - Option C
  const selectOptionC = () => {
    const updatedScales = peaceScales.selectOptionC(selectedIssue);
    setPeaceScales(updatedScales);

    // Call updateBalance to recalculate the scale balance
    updateBalance(updatedScales);
    updateBalanceAndTilt(updatedScales);
    
    // Set Weights on scale object
    setNationalistWeight(updatedScales?.getNationalistWeight());
    setUnionistWeight(updatedScales?.getUnionistWeight());
    handleCloseDialog();
  }


  // Update the balance based on scale weights
  const updateBalance = (scales) => {

    const unionistWeight = scales.getUnionistWeight();
    const nationalistWeight = scales.getNationalistWeight();

    let percentage = 0;
    let roundedPercentage = 0;

    // Calculate as a percentage of the weight of the heavier side
    if (unionistWeight === 0 || nationalistWeight === 0) {
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
    const maxTiltDegrees = 50;
    let tiltAngle = balanceRatio * maxTiltDegrees;
  
    // Adjust direction of tilt based on which side is heavier
    if (scales.getUnionistWeight() > scales.getNationalistWeight()) {
      tiltAngle = -tiltAngle; // Tilt to the left for unionist heavier
    }

    updateHeightsBasedOnTilt(tiltAngle);
  };

  const updateHeightsBasedOnTilt = (tiltAngle) => {
    // Both sides start at equal heights when balanced
    const maxTiltDegrees = 50;
    const baseHeight = 50;

    // Normalize tilt to [0, 1]
    const tiltRatio = Math.abs(tiltAngle) / maxTiltDegrees;
    
    // Adjust heights inversely based on tilt
    // The side tilting down gets a height boost, the other side gets a reduction
    // Max adjustment of 50% for max tilt
    const heightAdjustment = tiltRatio * 50;
    
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

  /*

      --------------- POPOVER HANDLING ---------------

  */

  // POPOVER CONTROLS
  const handlePopoverOpen = (event, content, title) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(content.issue.name);
    setPopoverContentLineTwo(content.headline);
    setPopoverTitle(title);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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


  /*

      --------------- NEWSPAPER STACKING ---------------

  */

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

  /*

      --------------- JSX (Rendered if assetsInitialised is True) ---------------

  */
  
  return assetsInitialised ? (
  <div className="page">
    {/* Background Image */}
    <img src={`${process.env.PUBLIC_URL}/stormont.jpg`} alt="background" className='background-image' />
    <div className='contents-container'>
      {/* Navigation Bar - Home Buttonn, Settings Button, Submit Button */}
        <div className="nav-bar" style={{ position: 'fixed', top: '20px', left: '20px' }}>
        <HomeIcon aria-label = "HomeIcon" className="home-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={displayConfirmQuitDialog} />
        <SettingsIcon aria-label = "SettingsIcon" className="settings-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white'}} onClick={displaySettingsDialog} />
        <CheckCircleOutlineIcon aria-label = "SubmitIcon" className="submit-button" sx={{ fontSize: '8vmin', marginRight: '10px', color: 'white' }} onClick={SubmitScales} />
    </div>

    <div className="title-and-balance-container">
        <Slide direction="down" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
          <h1>{pageTitle}</h1>
        </Slide>

        {/* Animated Number displaying Balance Percentage */}
        <Slide direction="down" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
          <h3>
              <AnimatedNumber
                value={balancePercentage}
                formatValue={(value) =>
              value.toFixed(2)}
              duration={1000} // Duration in milliseconds
              />
              % Balance Achieved
          </h3>
        </Slide>
    </div>

    <div className="shelf-and-scale-wrapper">
        <Slide direction="right" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
          <div className="shelf-zone">
            {/* Map over every issue in current phase and display on bookshelf */}
              <div className='books'>
                {bookshelfObject.getIssues().map((issue, index) => (
                <div
                className='book-on-shelf'
                aria-label={`BookOnShelf ${issue.name}`}
                role="button"
                key={index}
                onMouseEnter={(e) => handleMouseEnter(e, issue)}    // Popover Logic
                onMouseLeave={handleMouseLeave}
                onClick={displayIssueInfo.bind(this, issue)}
                >
                <img
                src={process.env.PUBLIC_URL + '/IMG_2965.png'}
                alt= {`BookOnShelf ${issue.name}`}
                className='book-img'
                />
              </div>
              ))}
              {bookName.show && (
              <div
              className="book-name" style={{ left: `${bookName.x}px`, top: `${bookName.y}px` }}
              >
              {bookName.text}
          </div>
          )}
    </div>

    <div className = "shelf" >
    <img
    src={process.env.PUBLIC_URL + '/shelf.png'}
    alt="Bookshelf"
    className="bookshelf-img" />
    </div>
  </div>
  </Slide>

  <Slide direction="left" in={showContents} mountOnEnter unmountOnExit timeout={1000}>
    <div
        className="drop-zone"
        >
        <div className="unionist-side">
          {/* Set height of unionist-books based on calculations in updateBalance function */}
          <div className="unionist-books" aria-label = "unionistBooks" style={{ height: `${unionistHeight}%` }}>
            {/* Map over the issues in 'rows' so the newspapers stack appropriately */}
          {unionistRows.map((rowIssues, idx) => (
          <div className="unionist-row" key={idx}>
              {rowIssues.map(issue => (
              <div className="unionist-issue" key={`${idx}-${issue.id}`}>
                <img
                src={process.env.PUBLIC_URL + '/newspaper-stack.png'}
                alt="Bookshelf"
                aria-label= {`unionistIssue ${issue.issue.name}`}
                className='newspaper-img'
                aria-describedby={issue.id}
                onMouseEnter={(event) => handlePopoverOpen(event, issue, 'THE ORANGE HERALD')}
                />
                {/* Newspaper Popover Logic */}
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
                  {/* Newspaper Popover Content */}
                <div className='newspaper-popover-container'>
                    <Typography sx={{ p: 1, color: 'red', fontFamily: 'Anton' }}>{popoverContent}</Typography>
                    <div className="newspaper-popover">
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
        <div className = "unionist-platform">
          <h4>UNIONIST</h4>
          <span aria-label = "invisibleUnionistWeight" className='invisible-weights'>{unionistWeight}</span>
        </div>
    </div>


    <div className="nationalist-side" >
      {/* Set height of unionist-books based on calculations in updateBalance function */}
        <div className="nationalist-books" aria-label = "nationalistBooks" style={{ height: `${nationalistHeight}%` }}>
          {/* Map over the issues in 'rows' so the newspapers stack appropriately */}
        {nationalistRows.map((rowIssues, idx) => (
        <div className="nationalist-row" key={idx}>
          {rowIssues.map(issue => (
          <div className="nationalist-issue" key={`${idx}-${issue.id}`}>
              <img
              src={process.env.PUBLIC_URL + '/newspaper-stack.png'}
              alt="Bookshelf"
              aria-label = {`nationalistIssue ${issue.issue.name}`}
              className="newspaper-img"
              aria-describedby={issue.id}
              onMouseEnter={(event) => handlePopoverOpen(event, issue, 'THE NORTHERN STAR')}
              />
              {/* Newspaper Popover Logic */}
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
                {/* Newspaper Popover Content */}
              <div className='newspaper-popover-container'>
                <Typography sx={{ p: 1, color: 'red', fontFamily: 'Anton' }}>{popoverContent}</Typography>
                <div className="newspaper-popover">
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
    <div className = "nationalist-platform">
        <h4>NATIONALIST</h4>
        <span aria-label = "invisibleNationalistWeight" className='invisible-weights'>{nationalistWeight}</span>
    </div>
    </div>
    </div>
  </Slide>
  </div>
  </div>

  {/* DIALOGS */}
  <IssueDialog
    isOpen={isDialogOpen}
    handleOptionA={selectOptionA}
    handleOptionB={selectOptionB}
    handleOptionC={selectOptionC}
    handleClose={handleCloseDialog}
    issue={selectedIssue}
    aria-label="Issue-Dialog"
    />
  <SettingsDialog 
    isOpen={isSettingsDialogOpen}
    handleClose={handleCloseSettingsDialog}
    aria-label="Settings-Dialog"/>
  <ConfirmQuitDialog 
    isOpen={isConfirmQuitDialogOpen}
    handleClose={handleCloseConfirmQuitDialog}
    aria-label="Confirm-Quit-Dialog"/>
  <RotateDeviceMessage />
  </div>
  ): null;
};

export default Scales;




