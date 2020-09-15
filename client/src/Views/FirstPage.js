import React from 'react';
import { navigate } from '@reach/router';

const FirstPage = () => {

    const registerLink = () => {
        navigate("/register")
    }
    return(
        <div className="container">
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
            <button className="btn btn-success" onClick={registerLink}>Register</button>
        </div>
    )
}

export default FirstPage;