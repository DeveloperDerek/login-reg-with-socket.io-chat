import React from 'react';
import './App.css';
import FirstPage from './Views/FirstPage';
import Register from './Views/Register';
import { Router } from "@reach/router";
import ViewUsers from './Views/ViewUsers';

function App() {
  return (
    <div>
      <Router>
        <FirstPage path="/" />
        <Register path="/register" />
        <ViewUsers path="/users" /> 
      </Router>
    </div>
  );
}

export default App;
