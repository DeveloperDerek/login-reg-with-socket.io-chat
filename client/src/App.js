import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { navigate, Router } from "@reach/router";
import axios from "axios";
import io from "socket.io-client"
import ViewUsers from './Views/ViewUsers';
import Register from './Views/Register';
import FirstPage from './Views/FirstPage';
import ChatPage from "./Views/ChatPage";
import { UserContext } from "./Utils/UserContext";

const socket = io(":9000");

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:9000/api/users/loggedin", { withCredentials: true, })
    .then((res) => {
      setLoggedUser(res.data);
      setIsLoggedIn(true);
    })
    .catch(console.log);
  }, ["http://localhost:9000/api/users/loggedin"])

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

      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Router>
            <FirstPage path="/" setLoggedIn={() => setIsLoggedIn(true)} socket={socket} />
            <Register path="/register" />
            <ViewUsers path="/users" socket={socket} /> 
            <ChatPage path="/chatpage" socket={socket} />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
