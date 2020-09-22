import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';

const ViewUsers = ({socket}) => {
    const [users, setUsers] = useState([]);

    const getLoggedInUser = () => {
        axios
            .get("http://localhost:9000/api/users/loggedin", {
                withCredentials: true,
            })
            .then((res) => console.log(res))
            .catch(console.log);
    };

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/users/view", {
                withCredentials: true,
            })
            .then((res) => {
                setUsers(res.data);
                console.log("all user data")
                console.log(res);
            })
            .catch((err) => {
                console.log("not authorized");
                console.log(err.response);
                navigate("/");
            });
    }, []);

    return(
        <div>
            <button onClick={getLoggedInUser}>Get Logged In User</button>
            <ul>
                {users.map((item, idx) => {
                    return(
                        <li key={idx}>
                            {item.username}
                        </li>
                    )
                })}
            </ul>
            <Link to="/chatpage">Click here to chat</Link>
        </div>
    )
}

export default ViewUsers