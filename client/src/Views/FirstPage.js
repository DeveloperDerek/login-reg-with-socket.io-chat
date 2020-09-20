import React from "react";
import Login from "../Components/Login";

const FirstPage = ({ setLoggedIn }) => {
    return (
        <div>
            <Login setLoggedIn={setLoggedIn} />
        </div>
    )
}

export default FirstPage;