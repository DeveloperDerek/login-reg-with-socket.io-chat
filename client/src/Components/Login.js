import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';

const Login = ({ setLoggedIn, socket }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const registerLink = () => {
        navigate("/register")
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const logUser = { email, password };
            await axios.post(
                "http://localhost:9000/api/login",
                logUser,
                { withCredentials: true, }
            );
            // logSocket();
            setLoggedIn();
            socket.emit("login", email);
            navigate("/users");
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.msg);
        }
    }

    return(
        <div className="container">
            <form onSubmit={login}>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
                <p className="error-message">{errorMessage ? errorMessage : ""}</p>
            </form>
            <button className="btn btn-success" onClick={registerLink}>Register</button>
        </div>
    )
}

export default Login;