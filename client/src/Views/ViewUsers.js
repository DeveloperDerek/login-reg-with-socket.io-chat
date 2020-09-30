import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import { UserContext } from "../Utils/UserContext";

const ViewUsers = ({socket}) => {
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const [users, setUsers] = useState(null);
    const [contactID, setContactID] = useState("");
    const [contactz, setContacts] = useState([]);
    useEffect(() => {
        const getLoggedDataAndContacts = async () => {
            await axios
            .get("http://localhost:9000/api/users/view", {
                withCredentials: true,
            })
            .then((res) => {
                setUsers(res.data);
            })

            await axios
            .get("http://localhost:9000/api/findcontacts")
            .then((res) => {
                setContacts(res.data);
            })
        }
        getLoggedDataAndContacts();
    }, []);


    const sendRequest = (e) => {
        e.preventDefault();
        // must bring info(stuff) over while posting
        const stuff = "test"
        axios
            .post(`http://localhost:9000/api/requestcontact/${contactID}`, stuff, {
                withCredentials: true,
            })
            .then((res) => console.log(res))
            .catch(console.log);
    }

    if (users === null || loggedUser === null) {
        return (
            <div>still loading</div>
        )
    }

    return(
        <div>
            <h1>{loggedUser.username}</h1>
            <h2>{loggedUser._id}</h2>
            <h1>TESTING ZONE</h1>
            <ul>
                {users.map((user, idx) => {
                    return(
                        <li key={idx}>
                            <h2>{user.username}</h2>
                            {user.contacts.map((c) => {
                                return(
                                    <ul>
                                        <li>
                                            {c}
                                        </li>
                                    </ul>
                                )
                            })}
                        </li>
                    )
                })}
            </ul>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <h1>REQUEST CONTACTS</h1>
            <ul>
                {users.map((obj, idx) => {
                    if(obj._id != loggedUser._id)
                    return(
                        <li key={idx}>
                            {obj.username}
                            
                            <input
                                type="button"
                                value={obj._id}
                                onClick={(e) => {
                                    setContactID(e.target.value);
                                }}
                            />
                            <button onClick={sendRequest}>X</button>
                        </li>
                    )
                })}
            </ul>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <h1>CONTACTS</h1>
            <ul>
                {contactz.map((contact, idx) => {
                    return(
                        <li key={idx}>
                            <h6>{contact._id}</h6>
                            <h6>{contact.requester}</h6>
                            <h6>{contact.recipient}</h6>
                            <h6>{contact.status}</h6>
                        </li>
                    )
                })}
            </ul>
            <Link to="/chatpage">Click here to chat</Link>
        </div>
    )
}

export default ViewUsers