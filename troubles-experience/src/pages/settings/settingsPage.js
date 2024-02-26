import React from "react";
import './settingsPage.css';
import { Link } from 'react-router-dom';
import BasicTabs from './tabs.js';
import HomeIcon from '@mui/icons-material/Home';

const Settings = ({ onFontSizeChange}) => {
  return (
    <div className="backGround">
      <Link to="..\">
        <HomeIcon className="homeIcon"/>
      </Link>
      <div className="foreground">
        <h1>Settings</h1>
        <BasicTabs onFontSizeChange={onFontSizeChange}/>
      </div>
    </div>
  );
};
export default Settings;
