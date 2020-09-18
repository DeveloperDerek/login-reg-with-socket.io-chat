import React, { useState } from "react";
import './App.css';
import FirstPage from './Views/FirstPage';
import Register from './Views/Register';
import { navigate, Router } from "@reach/router";
import ViewUsers from './Views/ViewUsers';
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    axios
      .post("http://localhost:9000/api/logout", {}, { withCredentials: true,})
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
      })
      .catch(console.log)
    navigate("/")
  }

  return (
    <div>

      <div className="jumbotron">
        <h1>MERN Users</h1>
        {isLoggedIn && <button onClick={logout}>Logout</button>}
      </div>

      <Router>
        <FirstPage path="/" setLoggedIn={() => setIsLoggedIn(true)} />
        <Register path="/register" />
        <ViewUsers path="/users" /> 
      </Router>
    </div>
  );
}

export default App;
