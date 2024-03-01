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


//Imports needed to use sound, functionality for playing sound on loop below
/*
import useSound from "use-sound";
import { useEffect } from 'react';
import clickSound from "./sounds/";
*/

function App() {
  const [fontSize, setFontSize] = useState(90); // Initial font size
 /*
  const [playSound, { stop }] = useSound(clickSound, { volume: 1, loop: true }); // Initialize the playSound function with loop option set to true
*/
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  /*
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
    <div className="App" style={{ fontSize: `${fontSize}%` }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/scales' element={<Scales />} />
          <Route path='/settings' element={<Settings onFontSizeChange={handleFontSizeChange}/>} />
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

export default App;