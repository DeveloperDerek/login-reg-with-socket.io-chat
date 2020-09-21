import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { navigate, Router } from "@reach/router";
import axios from "axios";
import UserContext from "./context/UserContext";
import ViewUsers from './Views/ViewUsers';
import Register from './Views/Register';
import FirstPage from './Views/FirstPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:9000/api/users/loggedin", { withCredentials: true, })
      .then((res) => {
        setUserData(res.data);
        setIsLoggedIn(true);
        if (userData === null) {
          navigate("/users");
        }
      })
      .catch(console.log);
  }, [])

  const logout = () => {
    axios
      .post("http://localhost:9000/api/logout", {}, { withCredentials: true,})
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch(console.log);
  }

  return (
    <>
      <div className="jumbotron">
        <h1>MERN Users</h1>
        {isLoggedIn && <button onClick={logout}>Logout</button>}
      </div>

      <Router>
          <FirstPage path="/" />
          <Register path="/register" />
          <ViewUsers path="/users" /> 
      </Router>
    </>
  );
}

export default App;
