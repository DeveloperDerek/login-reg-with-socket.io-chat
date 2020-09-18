require("dotenv").config(); //allows to use a config.env file to store keys

const express = require("express"),
    cookieParser = require('cookie-parser'), //allow to send info between server and client
    cors = require("cors");

const connectDB = require("./config/database"); //import database
connectDB(); //activate database

const app = express(); //initialize express

app.use(cookieParser()); //activate cookies
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //activate cors to allow crossing of browsers and server
app.use(express.json()); //activate the use of POST requests


require("./routes/user.routes")(app); //import routes and activate

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));
