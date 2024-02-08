import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/home';
import Scales from './pages/scales/scales';
import Settings from './pages/settings/settingsPage';
import ResultsPage from './pages/results/results';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/scales' element={<Scales />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/results' element={<ResultsPage />} />
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;
