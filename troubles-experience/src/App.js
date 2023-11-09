import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home';
import Scales from './pages/scales';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/scales' element={<Scales />} />
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;
