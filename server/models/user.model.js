const mongoose = require("mongoose"); //import backend
const reqErr = "{PATH} is required"; //insert string to error message
const uniqueValidator = require('mongoose-unique-validator'); //import unique validator

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, reqErr],
            minlength: [5, "Username must be at least 5 characters"],
            unique: true
        },
        password: {
            type: String,
            required: [true, reqErr],
            minlength: [5, "Password must be at least 5 characters"]
        },
        email: {
            type: String,
            required: [true, reqErr],
            unique: true,
        }
    }, {timestamps: true}
)

UserSchema.plugin(uniqueValidator, {message: "{PATH} is already taken"});

const User = mongoose.model("User", UserSchema);

module.exports = User;