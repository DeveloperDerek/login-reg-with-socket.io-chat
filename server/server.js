const dotenv = require("dotenv"); //allows to use a config.env file to store keys
const express = require("express")
const app = express(); //initialize express
const cors = require("cors");

// Allow use of POST requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //activate cors to allow crossing of browsers and server
dotenv.config({ path: './config/config.env' }); //import the config file

const PORT = process.env.PORT || 9000; //import the port key

const connectDB = require("./config/database"); //import database
connectDB(); //activate database

require("./routes/user.routes")(app); //import routes and activate

app.listen(PORT, console.log(`Server started on port ${PORT}`));
