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
  const [peaceScales, setPeaceScales] = useState(new ScalesObject([], [], [], 50, 50));
  const [bookshelfObject, setBookshelfObject] = useState(new BookshelfObject([]));
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [balancePercentage, setBalancePercentage] = useState(100);
  const [prevBalancePercentage, setPrevBalancePercentage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState('');
  const [issues, setIssues] = useState([]);
  const [phaseTwoIssues, setPhaseTwoIssues] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [assetsInitialised, setAssetsInitialised] = useState(false);

  // STATE OF SCALE HEIGHTS/WEIGHTS
  const [unionistHeight, setUnionistHeight] = useState(10);
  const [nationalistHeight, setNationalistHeight] = useState(10);
  const [phaseOneResult, setPhaseOneResult] = useState(0);
  const [phaseTwoResult, setPhaseTwoResult] = useState(0);

  // STATE OF PHASE
  const [currentPhase, setCurrentPhase] = useState(0); // Initial Phase
  const [showContents, setShowContents] = useState(true); // Transitions
  const [phaseIssues, setPhaseIssues] = useState();

  // STATE OF DIALOGS
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmQuitDialogOpen, setConfirmQuitDialogOpen] = useState(false);

  //MUI 
  const [checked, setChecked] = React.useState(false);

  // NAVIGATOR CONFIGURATION
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchIssues();     // Wait for issues to be retrieved from DB
      setDataFetched(true);
    };

    fetchData();
  }, []); 

  useEffect(() => {
    console.log(issues);
    initialiseScales();
    initialiseBookshelfObject();
    initialiseIssues(issues);
    setAssetsInitialised(true);
  }, [issues]);

  useEffect(() => {
    // Update prevBalancePercentage whenever balancePercentage changes
    setPrevBalancePercentage(balancePercentage);
  }, [balancePercentage]);


  const handlePopoverOpen = (event, content) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(content); // Set the content for this popover
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  // Initialise Scales & Bookshelf & Issues
  function initialiseScales() {           
    setPeaceScales(new ScalesObject([], [], [], 50, 50));
  }

  function initialiseBookshelfObject() {
    setBookshelfObject(new BookshelfObject([]));
  }

  function initialiseIssues(issues) {
    setPeaceScales(new ScalesObject([], [], [], 50, 50));
    setBookshelfObject(new BookshelfObject(issues));
    pageTitle = phaseNames[currentPhase];
  }

  // Level Progression
  function SubmitScales() {
    console.log(currentPhase);

    if (currentPhase === 1) {
      setPhaseTwoResult(balancePercentage);
      navigate('/results', { state: { balancePercentages: [phaseOneResult, phaseTwoResult] } });
    } else {
      setPhaseOneResult(balancePercentage);
      setShowContents(prevShowContents => !prevShowContents); // Make the Contents Disappear

      setTimeout(() => {
        setCurrentPhase(prevPhase => prevPhase + 1);
        setIssues(phaseTwoIssues);
        initialiseIssues(issues);
        setUnionistHeight(10);
        setNationalistHeight(10);
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


  //1998 PHASE ISSUES
  const decommissioningIssue = new Issue('Paramilitary Weapons Decomissioning ', 
                                            'There are calls for a procedure to be put in place that would see the paramilitaries surrendering all weaponry, doing so would help signify an end to the violence of the troubles and allow paramilitary groups demonstrate their willingness to work toward peace. ', 
                                            'For: Most people are in favour of this occurring. The main issues raised are with how the decommissioning would be implemented.  ',
                                            '/guns.avif',
                                            'Decommission Now',
                                            -10,
                                            'Lets go to the peace talks',
                                            8,
                                            'Np more IRA - class',
                                            'Install Commission',
                                            10,
                                            'understandable',
                                            14,
                                            'ideal folks',
                                            'No Decommissioning',
                                            10,
                                            'no peace talks',
                                            -5,
                                            'aw dear',
                                            3,
                                            'X'
                                            );

  // const northSouthCouncilIssue = new Issue('North/South Council', 
  //                                             'The North/South Ministerial Council (NSMC) is a body established under the Good Friday Agreement to co-ordinate activity and exercise certain governmental powers across the whole island of Ireland. The Council takes the form of meetings between ministers from both the Republic of Ireland and Northern Ireland and is responsible for twelve policy areas. Six of these areas are the responsibility of corresponding North/South Implementation Bodies. The body is based in the city of Armagh in Northern Ireland.', 
  //                                             'The North/South Ministerial Council and the Northern Ireland Assembly are "mutually inter-dependent" institutions: one cannot exist without the other.',
  //                                             '/north-south-council.jpeg',
  //                                             10);

  // const britishIrishCouncilIssue = new Issue('British/Irish Council', 
  //                                             'The British and Irish governments, and political parties in Northern Ireland, agreed to form a council under the British–Irish Agreement, part of the Good Friday Agreement reached in 1998. The council was formally established on 2 December 1999, when the Agreement came into effect. The councils stated aim is to "promote the harmonious and mutually beneficial development of the totality of relationships among the peoples of these islands".', 
  //                                             'At its June 2010 summit, the Council decided to move forward on recommendations to enhance the relationship between it and the British-Irish Parliamentary Assembly (BIPA).',
  //                                             '/british-irish-council.jpeg',
  //                                             10);

  // const selfDeterminationIssue = new Issue('The Right to Self-Determination', 
  //                                           'Under the terms of the British-Irish Agreement, both governments Recognised that it was the right of all persons born in Northern Ireland to identify as Irish or British, or both, and to hold both Irish and British citizenship if they so choose. This right is to continue regardless of any change in the status of Northern Ireland', 
  //                                           'Desc Two',
  //                                           '/self-determination.webp',
  //                                           10);

  // 2020 PHASE ISSUES
  const irishSeaBorderIssue = new Issue('Paramilitary Weapons Decomissioning ', 
  'There are calls for a procedure to be put in place that would see the paramilitaries surrendering all weaponry, doing so would help signify an end to the violence of the troubles and allow paramilitary groups demonstrate their willingness to work toward peace. ', 
  'For: Most people are in favour of this occurring. The main issues raised are with how the decommissioning would be implemented.  ',
  '/guns.avif',
  'Decommission Now',
  -10,
  'Lets go to the peace talks',
  10,
  'Np more IRA - class',
  'Install Commission',
  10,
  'understandable',
  10,
  'ideal folks',
  'No Decommissioning',
  10,
  'no peace talks',
  -10,
  'aw dear',
  3,
  'X'
  );

  const phase2020Issues = [irishSeaBorderIssue];

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


  // Scale Handling
  const selectOptionA = () => {
    const updatedScales = peaceScales.selectOptionA(selectedIssue);
    setPeaceScales(updatedScales);
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    updateHeight(updatedScales); // Call updateHeight to recalculate heights
    handleCloseDialog();
  }

  const selectOptionB = () => {
    const updatedScales = peaceScales.selectOptionB(selectedIssue);
    setPeaceScales(updatedScales);
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    updateHeight(updatedScales); // Call updateHeight to recalculate heights
    handleCloseDialog();
  }

  const selectOptionC = () => {
    const updatedScales = peaceScales.selectOptionC(selectedIssue);
    setPeaceScales(updatedScales);
    updateBalance(updatedScales) // Call updateBalance to recalculate the scale balance
    updateHeight(updatedScales); // Call updateHeight to recalculate heights
    handleCloseDialog();
  }


 const updateHeight = () => {
    const totalWeight = peaceScales.getUnionistWeight() + peaceScales.getNationalistWeight();
    
    // Calculate percentages based on weights
    const unionistPercentage = (peaceScales.getUnionistWeight() / totalWeight) * 100;
    const nationalistPercentage = (peaceScales.getNationalistWeight() / totalWeight) * 100;

    setUnionistHeight(unionistPercentage);
    setNationalistHeight(nationalistPercentage);
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

  function logScales() {
    console.log(peaceScales);
    console.log(peaceScales.getNationalistIssues);
    console.log(peaceScales.getUnionistIssues);
  }

  return assetsInitialised ? (
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

          <div className="titleAndBalanceContainer">
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
          </div>

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
                        key={issue.id}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/single-book.png'}
                          alt="Bookshelf"
                          style={{ 
                            width: '2em', 
                            height: 'auto',
                            display: 'block',
                            margin: 'auto',
                            cursor: 'pointer' // Add cursor pointer for hover effect
                          }}
                          aria-describedby={issue.id}
                          onMouseEnter={(event) => handlePopoverOpen(event, issue.headline)}
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
                        >
                          <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                        </Popover>
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
                        key={issue.id}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/single-book.png'}
                          alt="Bookshelf"
                          style={{ 
                            width: '2em', 
                            height: 'auto',
                            display: 'block',
                            margin: 'auto',
                            cursor: 'pointer' // Add cursor pointer for hover effect
                          }}
                          aria-describedby={issue.id}
                          onMouseEnter={(event) => handlePopoverOpen(event, issue.headline)}
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
                        >
                          <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                        </Popover>
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
          handleOptionA={selectOptionA}
          handleOptionB={selectOptionB}
          handleOptionC={selectOptionC}
          handleClose={handleCloseDialog}
          issue={selectedIssue}
        />

        <ConfirmQuitDialog 
          isOpen={isConfirmQuitDialogOpen}
          handleClose={handleCloseConfirmQuitDialog}/>

        <RotateDeviceMessage />
    </div>
  ): null;
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