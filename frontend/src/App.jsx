// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/land_page.jsx';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;