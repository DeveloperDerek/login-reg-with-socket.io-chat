const mongoose = require("mongoose"); //import backend
const reqErr = "{PATH} is required"; //insert string to error message
const uniqueValidator = require("mongoose-unique-validator"); //import unique validator
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
        },
        contacts: [{
            type: Schema.Types.ObjectId,
            ref: "Contact"
        }]
    }, 
    {timestamps: true}
)

// As our UserSchema doesn't contain a field for confirmPassword (and we really wouldn't want to save that to our database) we will need to add in a touch of code to allow us to compare password with it. We can make use of mongoose virtuals—basically fields we don't want to save in MongoDB—to accomplish this. We will chain calls to get and set to the returned virtual object, allowing us to establish both a getter and a setter for the virtual field.
userSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value));

// Next we need to make use of some Middleware to add in another validation. Specifically we will be using the "pre hook" and having it run before validations.
userSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});

// It's recommended to use Bcrypt in an asynchronous way so we will be using it with Promises. The "10" inside the bcrypt.hash() function refers to the number of salt rounds that Bcrypt will use when generating a salt. For our purposes "10" will be a fine value here. As in our previous Middleware we will need to call the "next" function once the Promise is fulfilled.
userSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});


userSchema.plugin(uniqueValidator, {message: "{PATH} is already taken"});

const User = mongoose.model("User", userSchema);

module.exports = User;