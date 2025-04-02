import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Buses from './pages/Buses';
import Fares from './pages/Fares';
import BusRoutes from './pages/Routes'; // Renamed to avoid conflict with Router

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/fares" element={<Fares />} />
        <Route path="/routes" element={<BusRoutes />} /> 
      </Routes>
    </Router>
  );
}

export default App;