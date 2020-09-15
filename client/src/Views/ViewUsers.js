import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/users/view")
            .then((res) => {
                setUsers(res.data)
            })
    }, [])

    return(
        <div>
            <ul>
                {users.map((item, idx) => {
                    return(
                        <li key={idx}>
                            {item.username}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ViewUsers