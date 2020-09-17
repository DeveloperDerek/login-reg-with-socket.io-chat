const mongoose = require("mongoose"); //import backend
const reqErr = "{PATH} is required"; //insert string to error message
const uniqueValidator = require("mongoose-unique-validator"); //import unique validator
const bcrypt = require('bcrypt');

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
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        }
    }, {timestamps: true}
)

// add this after UserSchema is defined
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value));

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});

UserSchema.plugin(uniqueValidator, {message: "{PATH} is already taken"});

const User = mongoose.model("User", UserSchema);

module.exports = User;