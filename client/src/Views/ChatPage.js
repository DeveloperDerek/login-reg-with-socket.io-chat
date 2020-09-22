import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Utils/UserContext";

const ChatPage = ({ socket }) => {
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentChatObject, setCurrentChatObject] = useState(null);

    // we need to set up all of our event listeners in the useEffect callback function
    useEffect(() => {
        socket.on("getMessages", chat => {
            setCurrentChatObject(chat);
        });

    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, []);
    
    const sendMessage = () => {
        socket.emit("new msg", currentMessage)
    };

    if (currentChatObject === null) {
        return (
            <div>still loading</div>
        )
    }
    return (
        <div>
            <h1>{loggedUser.email}</h1>
            <div>
            {currentChatObject.chats.map((chat, idx) => {
                return (
                    <p key={idx}>
                        {chat}
                    </p>
                )
            })} 
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text-area"
                    value={currentMessage}
                    placeholder=""
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                    }}
                />
                <button>Chat</button>
            </form>
        </div>
    )
}

export default ChatPage

