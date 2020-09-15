import React from 'react';
import './App.css';
import FirstPage from './Views/FirstPage';
import Register from './Views/Register';
import { Router } from "@reach/router";

function App() {
  return (
    <div>
      <Router>
        <FirstPage path="/" />
        <Register path="/register" /> 
      </Router>
    </div>
  );
}

export default App;
