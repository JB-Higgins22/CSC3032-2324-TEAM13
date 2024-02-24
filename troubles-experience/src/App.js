import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/home';
import Scales from './pages/scales/scales';
import Settings from './pages/settings/settingsPage';
import ResultsPage from './pages/results/results';
import PreGameInfo from './pages/pre-game-info/pre-game-info';
import Reflection from './pages/reflection/reflection';
import Login from './pages/login/login';
import Tutorial from './pages/tutorial/tutorial';
import SettingsDialog from './dialogs/settingsDialog';

//Imports needed to use sound, functionality for playing sound on loop below
/*
import useSound from "use-sound";
import { useEffect } from 'react';
import clickSound from "./sounds/";
*/

function App() {
 
  /*
  const [playSound, { stop }] = useSound(clickSound, { volume: 1, loop: true }); // Initialize the playSound function with loop option set to true

  
  useEffect(() => {
    // Cleanup function to stop the sound and clear the interval when component unmounts
    return () => {
      stop();
    };
  }, [stop]);

  useEffect(() => {
    playSound();
    
    // Cleanup function to stop the sound and clear the interval when component unmounts
    return () => {
      stop();
    };
  }, [playSound, stop]); // Run this effect whenever playSound or stop change
*/


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/scales' element={<Scales />} />
          <Route path='/settingsDialog' element={<SettingsDialog/>} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='/pre-game-info' element={<PreGameInfo />} />
          <Route path='/reflection' element={<Reflection />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tutorial' element={<Tutorial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;