// REACT IMPORTS
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// CSS IMPORTS
import '../../styles/global.css';
import './settingsPage.css';

// MUI IMPORTS
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContrastIcon from '@mui/icons-material/Contrast';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import AbcIcon from '@mui/icons-material/Abc';
import Radio from '@mui/material/Radio';
import { green } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';

import { useSoundContext } from '../../sounds/soundContext.js';

function accessabilityProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

//Styling functions - applies styling directly to .body in index.css 
function applyBlackAndWhiteStyling(apply) {
  const body = document.body;
  if (apply) {
    body.style.filter = 'grayscale(100%)';
  } else {
    body.style.filter = 'none';
  }
}

function applyHighContrastStyling(apply) {
  const body = document.body;
  if (apply) {
    body.style.filter = 'contrast(200%)';
  } else {
    body.style.filter = 'none';
  }
}


//Potential to change backend functionality of font increase to apply styling via global.css
/*
function applyFontStyling() {
  const root = document.getElementById('root');
  root.classList.toggle('font-increase');
}
*/
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { isMuted, toggleMute } = useSoundContext();
  
  //Defining state variables
  const [blackAndWhiteMode, setBlackAndWhiteMode] = useState(isDarkModeApplied()); 
  const [highContrastMode, setHighContrastMode] = useState(isHighContrastModeApplied());
  const [soundMuted, setSoundMuted] = useState(isMuted);
  const [fontIncrease, setFontIncrease] = useState(false);

    // Existing Styling
  function isDarkModeApplied() {
    const bodyStyle = document.body.style.filter;
    return bodyStyle.includes('grayscale(100%)');
  }

  function isHighContrastModeApplied() {
    const bodyStyle = document.body.style.filter;
    return bodyStyle.includes('contrast(200%)');
  }
    

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    //Toggling states 'on' and calling relevant functions
    const toggleBlackAndWhiteMode = () => {
      setBlackAndWhiteMode(!blackAndWhiteMode); // Toggle blackAndWhiteMode state
      setHighContrastMode(false); // Both Styles cant be true
      applyBlackAndWhiteStyling(!blackAndWhiteMode); // Apply black and white styles
    };
    
    const toggleHighContrastMode = () => {
      setHighContrastMode(!highContrastMode);
      setBlackAndWhiteMode(false); // Both styles cant be true
      applyHighContrastStyling(!highContrastMode); 
    };

    const handleToggleMute = () => {
      toggleMute(); // Call context function to toggle global mute state
      setSoundMuted(!soundMuted); // Also toggle local state to reflect the change
    };


    const GreenSwitch = styled(Switch)(({ theme }) => ({
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: green[600],
        '&:hover': {
          backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
        },
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: green[600],
      },
    }));

//Potential to change backend functionality of font increase to apply styling via global.css
    /*
    const toggleFontIncrease = () => {
      setFontIncrease(!fontIncrease);
      applyFontStyling(); 
    };
    */
    
  //Tabs 
  return (
    <Box sx={{ width: '100%', fontFamily: 'Anton' }}>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', fontFamily: 'Anton'}}>
      <Tabs
          sx={{
            '& .MuiTab-root': {
              color: 'white', // Tab color
              fontSize: 'calc(var(--base-font-size) + 1vmin)', // Adjust font size
              width: '50%', // Adjust width to 50% for each tab
            },
            '& .Mui-selected': {
              color: 'white', // White color for selected tab
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'white', // White indicator
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs"
        >
          <Tab label="General" {...accessabilityProps(0)} />
          <Tab label="Admin" {...accessabilityProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px' }}>
        <VolumeUp sx={{ marginRight: 1, fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white'  }} />
        <Typography className="font-size" variant="subtitle1" sx={{ marginLeft: 1, fontFamily: 'Anton', fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}>Mute Volume</Typography>
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px'}}>
         <FormControlLabel control={<GreenSwitch checked = {soundMuted} onChange={handleToggleMute}/>} sx={{ marginLeft: 2 }} />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px'}}>
          <ContrastIcon sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}/>
          <Typography className="font-size" variant="subtitle1" sx={{ marginLeft: 2, fontFamily: 'Anton', fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}>Black and White (Dark) Mode</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px'}}>
          <FormControlLabel  control={<GreenSwitch checked={blackAndWhiteMode} onChange={toggleBlackAndWhiteMode} />} 
            sx={{ marginLeft: 2 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px', fontFamily: 'Anton' }}>
          <ContrastIcon sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}/>
          <Typography className="font-size" variant="subtitle1" sx={{ marginLeft: 2, fontFamily: 'Anton', fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}>High Contrast</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px', fontFamily: 'Anton'}}>
          <FormControlLabel  control={<GreenSwitch checked={highContrastMode} onChange={toggleHighContrastMode}/>} 
            sx={{ marginLeft: 2, fontFamily: 'Anton'  }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px'}}>
        <AbcIcon sx={{ fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}/>
        <Typography className="font-size" variant="subtitle1" sx={{ marginLeft: 1, fontFamily: 'Anton', fontSize: 'calc(var(--base-font-size) + 2vmin)', color: 'white' }}>Adjust Font Size</Typography>
         </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
          <FontSizeRadioButtons />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* Content within Admin tab   */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
        <Link to="..\login">
            <Button className = "login-button" variant="contained">Login</Button>
          </Link>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

// Font sizes for use on radio buttons
const marks = [
  { value: 50, label: 'Small', size: 15 },
  { value: 100, label: 'Medium', size: 20 },
  { value: 150, label: 'Large', size: 25},
];

function FontSizeRadioButtons() {

  const currentBaseFontSizeVmin = parseFloat(getComputedStyle(document.documentElement)
                              .getPropertyValue('--base-font-size'));

  let currentPercentage = Math.round(currentBaseFontSizeVmin * 100);


  const [selectedValue, setSelectedValue] = React.useState(currentPercentage); // Default to Medium

  // const handleChange = (event) => {
  //   const newValue = parseInt(event.target.value);
  //   setSelectedValue(newValue);
  //   //onFontSizeChange(newValue); // Call the parent function to change font size

  //   document.body.style.fontSize = `${newValue}%`; // Apply font size globally
  // };

  const handleChange = (event) => {
    // Get the current base font size
    const currentBaseFontSize = getComputedStyle(document.documentElement)
      .getPropertyValue('--base-font-size');
    // Log the current base font size
    console.log(`Current base font size: ${currentBaseFontSize}`);
  
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) { // Simple validation to check if newValue is a number
      const newFontSize = newValue / 100; // Convert percentage to vmin
      document.documentElement.style.setProperty('--base-font-size', `${newFontSize}vmin`);
      setSelectedValue(newValue);
    } else {
      console.error("Invalid input for font size.");
    }
  };
  

  return (
    <FormGroup style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Anton'}}>
      {marks.map((mark, index) => (
        <FormControlLabel
          key={index}
          value={mark.value.toString()}
          control={<Radio
            className="Mui"
            sx={{
              '& .MuiSvgIcon-root': { 
                width: mark.size, 
                height: mark.size,
              },
              color: 'white', // default color set to white
              '&.Mui-checked': {
                color: 'white', // color when checked, set to white
              },
              '&:hover': {
                bgcolor: alpha('#ffffff', 0.04), // use hexadecimal color for white
              }
            }}
            checked={selectedValue === mark.value}
            onChange={handleChange}
            name="size-radio-button"
          />}
          label=""
          onChange={handleChange}
          checked={selectedValue === mark.value}
          name="size-radio-button"
        />
      ))}
    </FormGroup>
  );
}

