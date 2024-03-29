import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/home';
import Scales from './pages/scales/scales';
import Settings from './pages/settings/settingsPage';
import ResultsPage from './pages/results/results';
import PreGameInfo from './pages/pre-game-info/pre-game-info';
import Reflection from './pages/reflection/reflection';
import Login from './pages/login/login';
import AdminPage from './pages/admin-page/adminPage';
import Tutorial from './pages/tutorial/tutorial';
import SettingsDialog from './dialogs/settingsDialog';

//Imports needed to use sound, functionality for playing sound on loop below

import useSound from "use-sound";
import { useEffect } from 'react';
import placeholderSound from "./sounds/placeholderSound.mp3";
import { SoundProvider } from './sounds/soundContext.js';
import { useSoundContext } from './sounds/soundContext.js';


function App() {
  const [fontSize, setFontSize] = useState(90); // Initial font size
 
  
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

const { isMuted } = useSoundContext(); // Get isMuted state from context

  const [playSound, { stop }] = useSound(placeholderSound, {
    volume: 1,
    loop: true,
  });

  useEffect(() => {
    if (!isMuted) {
      playSound();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [isMuted, playSound, stop]);

  return (
    <div className="App">
      {/* Application Routes */}
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/scales' element={<Scales />} />
          <Route path='/settingsDialog' element={<SettingsDialog/>} />
          <Route path='/settings' element={<Settings onFontSizeChange={handleFontSizeChange} />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='/pre-game-info' element={<PreGameInfo />} />
          <Route path='/reflection' element={<Reflection />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/tutorial' element={<Tutorial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default () => (
  <SoundProvider>
    <App />
  </SoundProvider>
);