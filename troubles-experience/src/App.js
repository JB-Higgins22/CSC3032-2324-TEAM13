import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/home';
import Scales from './pages/scales/scales';
import Settings from './pages/settings/settingsPage';

function App() {
  const [fontSize, setFontSize] = useState(18); // Initial font size

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  return (
    <div className="App" style={{ fontSize: `${fontSize}px` }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/scales' element={<Scales />} />
          <Route path='/settings' element={<Settings onFontSizeChange={handleFontSizeChange} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;