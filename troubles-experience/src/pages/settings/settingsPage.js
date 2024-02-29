import React from "react";
import './settingsPage.css';
import { Link } from 'react-router-dom';
import BasicTabs from './tabs.js';
import HomeIcon from '@mui/icons-material/Home';

const Settings = () => {
  return (
    <div className="backGround">
      <Link to="..\">
        <HomeIcon className="HomeIcon"/>
      </Link>
      
      <div className="foreground">
        <h1>Settings</h1>
        <BasicTabs/>
      </div>
    </div>
  );
};
export default Settings;
