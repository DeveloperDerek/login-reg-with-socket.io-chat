const express = require("express");
const cors = require("cors");
require("dotenv").config(); //allows to use a config.env file to store keys

const connectDB = require("./config/database"); //import database
connectDB(); //activate database

const app = express(); //initialize express
app.use(express.json());//activate the use of POST requests
app.use(cors());

// app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //activate cors to allow crossing of browsers and server


// require("./routes/user.routes")(app); //import routes and activate
app.use("/api", require("./routes/user.routes"))

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));
