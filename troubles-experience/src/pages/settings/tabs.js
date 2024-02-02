import React, { useState } from 'react';
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

//Slider Function - left general for use on both Volume and Contrast
function ContinuousSlider({ label }) {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Box sx={{ mb: 1, alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Slider aria-label={label} value={value} onChange={handleChange} />
      </Box>
    </Box>
  );
}
export default function BasicTabs({ onFontSizeChange }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <VolumeUp />
          <ContinuousSlider label="Volume" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <ContrastIcon />
          <ContinuousSlider label="Contrast" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <AbcIcon />
          <FontSizeRadioButtons onFontSizeChange={onFontSizeChange} />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PanToolIcon/>
          <Typography variant="subtitle1" sx={{ marginLeft: 7 }}>Drag and Drop</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px'}}>
          <FormControlLabel control={<Switch defaultChecked/>} />
        </Box>

      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* Content within Accessibility tab   */}
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

const marks = [
  { value: 10, label: 'Small' },
  { value: 18, label: 'Medium' },
  { value: 25, label: 'Large' },
];

function FontSizeRadioButtons({ onFontSizeChange }) {
  const [selectedValue, setSelectedValue] = React.useState(15); // Default to Medium

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSelectedValue(newValue);
    onFontSizeChange(newValue); // Call the parent function to change font size
    document.body.style.fontSize = `${newValue}px`; // Apply font size globally
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