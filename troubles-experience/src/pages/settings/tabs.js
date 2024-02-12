import React, { useState } from 'react';

import '../../styles/global.css';
import './settingsPage.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContrastIcon from '@mui/icons-material/Contrast';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PanToolIcon from '@mui/icons-material/PanTool';
import AbcIcon from '@mui/icons-material/Abc';
import Radio from '@mui/material/Radio';

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

//Slider Function - left general for now
function ContinuousSlider({ label }) {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Box sx={{ mb: 1, alignItems: 'center' }}>
        <Typography className="fontSize" variant="subtitle1" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Slider aria-label={label} value={value} onChange={handleChange} />
      </Box>
    </Box>
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

function applyFontStyling() {
  const root = document.getElementById('root');
  root.classList.toggle('font-increase');
}

export default function BasicTabs({ onFontSizeChange }) {
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

    const toggleFontIncrease = () => {
      setFontIncrease(!fontIncrease);
      applyFontStyling(); 
    };
    
  //Tabs 
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs" textColor="white">
          <Tab label="General" {...accessabilityProps(0)} />
          <Tab label="Accessibility" {...accessabilityProps(1)} />
          <Tab label="Admin" {...accessabilityProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        {/* Content within General tab   */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px' }}>
          <VolumeUp sx={{ marginRight: 2 }}/>
          <ContinuousSlider label="Volume"  />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px' }}>
          <ContrastIcon />
          <Typography className="fontSize" variant="subtitle1" sx={{ marginLeft: 2 }}>Black and White (Dark) Mode</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px'}}>
          <FormControlLabel  control={<Switch checked={blackAndWhiteMode} onChange={toggleBlackAndWhiteMode} />} 
            sx={{ marginLeft: 2 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px' }}>
          <AbcIcon sx={{ marginTop: 1 }}/>
          <FontSizeRadioButtons onFontSizeChange={onFontSizeChange} />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '10px' }}>
          <ContrastIcon />
          <Typography className="fontSize" variant="subtitle1" sx={{ marginLeft: 2 }}>High Contrast</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '10px'}}>
          <FormControlLabel  control={<Switch checked={highContrastMode} onChange={toggleHighContrastMode} />} 
            sx={{ marginLeft: 2 }}
          />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {/* Content within Admin tab   */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="contained">Login</Button>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

//Font sizes and labels for use on radio buttons
const marks = [
  { value: 75 , label: 'Small' },
  { value: 100, label: 'Medium' },
  { value: 125, label: 'Large' },
];

function FontSizeRadioButtons({ onFontSizeChange }) {
  const [selectedValue, setSelectedValue] = React.useState(100); // Default to Medium

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSelectedValue(newValue);
    onFontSizeChange(newValue); // Call the parent function to change font size
    document.body.style.fontSize = `${newValue}%`; // Apply font size globally
  };

  const controlProps = (item) => ({
    checked: selectedValue === item.value,
    onChange: handleChange,
    value: item.value,
    name: 'fontSize-radio-button',
    inputProps: { 'aria-label': item.label },
  });

  return (
    <div>
      {marks.map((mark, index) => (
        <Radio key={index} {...controlProps(mark)} /> 
      ))}
    </div>
  );
}