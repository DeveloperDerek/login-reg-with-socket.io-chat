import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Register = () => {

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const createUser = (e) => {
        e.preventDefault()
        const newUser = {username, password, email, confirmPassword}
        axios
            .post("http://localhost:9000/api/users/register", newUser, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                navigate("/users");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

    return(
        <div className="container">
            <form onSubmit={createUser}>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    {/* ?. is called optional chaining, lets you safely try to access keys that might not exist and avoid errors */}
                    {errors?.email && (
                        <span className="error-message cap-first-letter">
                            {errors.email?.message}
                        </span>
                    )}
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    {errors?.username && (
                        <span className="error-message cap-first-letter">
                            {errors.username?.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    {errors?.password && (
                        <span className="error-message cap-first-letter">
                            {errors.password?.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                    />
                    {errors.confirmPassword && (
                        <span className="error-message cap-first-letter">
                            {errors.confirmPassword?.message}
                        </span>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register;