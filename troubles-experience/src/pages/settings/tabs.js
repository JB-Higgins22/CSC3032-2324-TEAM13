import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/global.css';
import './settingsPage.css';

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

//Styling functions - applies styling from global.css to the root contained in index.js
function applyBlackAndWhiteStyling() {
  const root = document.getElementById('root');
  root.classList.toggle('black-white-mode');
}

function applyHighContrastStyling() {
  const root = document.getElementById('root');
  root.classList.toggle('high-contrast-mode');
}

//Potential to change backend functionality of font increase to apply styling via global.css
/*
function applyFontStyling() {
  const root = document.getElementById('root');
  root.classList.toggle('font-increase');
}
*/
export default function BasicTabs({ onFontSizeChange}) {
  const [value, setValue] = React.useState(0);
  
  //Defining state variables
    const [blackAndWhiteMode, setBlackAndWhiteMode] = useState(false); 
    const [highContrastMode, setHighContrastMode] = useState(false);
    const [fontIncrease, setFontIncrease] = useState(false);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    //Toggling states 'on' and calling relevant functions
    const toggleBlackAndWhiteMode = () => {
      setBlackAndWhiteMode(!blackAndWhiteMode); // Toggle blackAndWhiteMode state
      applyBlackAndWhiteStyling(); // Apply black and white styles
    };
    
    const toggleHighContrastMode = () => {
      setHighContrastMode(!highContrastMode);
      applyHighContrastStyling(); 

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider', fontFamily: 'Anton'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs" textColor="white">
          <Tab label="General" {...accessabilityProps(0)} />
          <Tab label="Admin" {...accessabilityProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      {/* Unused mute volume UI  
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px' }}>
        <VolumeUp sx={{ marginRight: 2 }} />
        <Typography className="fontSize" variant="subtitle1" sx={{ marginLeft: 1 }}>Mute Volume</Typography>
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px'}}>
          <FormControlLabel  control={<Switch />} sx={{ marginLeft: 2 }}/>
        </Box>
*/}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px'}}>
          <ContrastIcon />
          <Typography className="fontSize" variant="subtitle1" sx={{ marginLeft: 2, fontFamily: 'Anton' }}>Black and White (Dark) Mode</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px'}}>
          <FormControlLabel  control={<GreenSwitch checked={blackAndWhiteMode} onChange={toggleBlackAndWhiteMode} />} 
            sx={{ marginLeft: 2 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px', fontFamily: 'Anton' }}>
          <ContrastIcon />
          <Typography className="fontSize" variant="subtitle1" sx={{ marginLeft: 2, fontFamily: 'Anton'  }}>High Contrast</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px', fontFamily: 'Anton'}}>
          <FormControlLabel  control={<GreenSwitch checked={highContrastMode} onChange={toggleHighContrastMode}/>} 
            sx={{ marginLeft: 2, fontFamily: 'Anton'  }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px'}}>
        <AbcIcon/>
        <Typography className="fontSize" variant="subtitle1" sx={{ marginLeft: 1, fontFamily: 'Anton'  }}>Adjust Font Size</Typography>
         </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
          <FontSizeRadioButtons onFontSizeChange={onFontSizeChange} />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* Content within Admin tab   */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
        <Link to="..\login">
            <Button className = "loginButton" variant="contained">Login</Button>
          </Link>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

// Font sizes for use on radio buttons
const marks = [
  { value: 75, label: 'Small', size: 15 },
  { value: 90, label: 'Medium', size: 20 },
  { value: 125, label: 'Large', size: 25},
];

function FontSizeRadioButtons({ onFontSizeChange }) {
  const [selectedValue, setSelectedValue] = React.useState(90); // Default to Medium

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSelectedValue(newValue);
    onFontSizeChange(newValue); // Call the parent function to change font size
    document.body.style.fontSize = `${newValue}%`; // Apply font size globally
  };

  return (
    <FormGroup style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Anton'}}>
      {marks.map((mark, index) => (
        <FormControlLabel
          key={index}
          value={mark.value.toString()}
          control={<Radio  className = "Mui" sx={{ '& .MuiSvgIcon-root': { width: mark.size, height: mark.size} }} />}
          label=""
          onChange={handleChange}
          checked={selectedValue === mark.value}
          name="size-radio-button"
        />
      ))}
    </FormGroup>
  );
}

