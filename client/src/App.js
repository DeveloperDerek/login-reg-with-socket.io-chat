import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { navigate, Router } from "@reach/router";
import axios from "axios";
import cookies from "js-cookie";
// import io from 'socket.io-client';
import UserContext from "./context/UserContext";
import ViewUsers from './Views/ViewUsers';
import Register from './Views/Register';
import FirstPage from './Views/FirstPage';

function App() {
  // const [socket] = useState(() => io(':9000'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  // We cannot run async functions with useEffect directly, so we first create a function that has the async then run the function after
  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const token = 
  //   }

  // }, [])

  const cookieChecker = cookies.get("usertoken");
  console.log(cookieChecker);
  const logout = () => {
    axios
      .post("http://localhost:9000/api/logout", {}, { withCredentials: true,})
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch(console.log)
  }

  return (
    <>
      <div className="jumbotron">
        <h1>MERN Users</h1>
        {isLoggedIn && <button onClick={logout}>Logout</button>}
      </div>

      <Router>
        {/* <UserContext value={{ userData, setUserData }}> */}
          <FirstPage path="/" setLoggedIn={() => setIsLoggedIn(true)} />
          <Register path="/register" />
          <ViewUsers path="/users" /> 
        {/* </UserContext> */}
      </Router>
    </>
  );
}

export default App;
