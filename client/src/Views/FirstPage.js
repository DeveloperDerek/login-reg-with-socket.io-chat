import React from "react";
import Login from "../Components/Login";

const FirstPage = ({ setLoggedIn, socket }) => {
    return (
        <div>
            <Login setLoggedIn={setLoggedIn} socket={socket} />
        </div>
    )
}

export default FirstPage;