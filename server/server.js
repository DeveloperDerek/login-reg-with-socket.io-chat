const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); 

require("dotenv").config(); //allows to use a config.env file to store keys

const connectDB = require("./config/database"); //import database
connectDB(); //activate database

const app = express(); //initialize express
app.use(express.json());//activate the use of POST requests

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //activate cors to allow crossing of browsers and server


// require("./routes/user.routes")(app); //import routes and activate
app.use("/api", require("./routes/user.routes"))

const server = app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));

const io = require("socket.io")(server); //import and initialize the socket

let totalConnections = 0;

const currentChat = {
    emailList: [],
    currentMsg: "",
    chats: ["hello tehre", "yoyoy"],
};

/* Once initialized, we can now set event listeners and event emitters to help pass data along between the server and client. There is one event listener, named "connection", that is required that we must have before we can create our own event listeners. Here is what that looks like: */
io.on("connect", socket => {
    totalConnections++;
    console.log(socket.id); // Each client that connects gets their own socket id
    console.log(`new person has entered server. ${totalConnections} are connected.`);

    socket.on("login", (email) => {
        currentChat.emailList.push({ id: socket.id, nameId: email });
    });

    io.emit("getMessages", currentChat);

    socket.on("new msg", (msg) => {
        currentChat.chats.push(msg)
    });

    socket.on("disconnect", () => {
        totalConnections--;
        console.log(`person has left the server. ${totalConnections} are connected`);
    });
});