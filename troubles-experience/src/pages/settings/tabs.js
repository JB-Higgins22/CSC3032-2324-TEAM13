import * as React from 'react';
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
        <Typography variant="subtitle1" sx={{ mb: 1, color: '#fff' }}>
          {label}
        </Typography>
        <Slider aria-label={label} value={value} onChange={handleChange} />
      </Box>
    </Box>
  );
}
export default function BasicTabs() {
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


