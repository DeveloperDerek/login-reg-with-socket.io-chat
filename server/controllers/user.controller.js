const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    // CREATE: Create a new user
    create(req, res) {
        User.create(req.body)
            .then((user) => {res.json(user)})
            .catch((err) => {res.status(400).json(err);});
    },
    // REGISTER: Register a new user (same function as create)
    register(req, res) {
        const user = new User(req.body);
        user
            .save()
            .then(() => {
                res.json({ msg: "success!", user:user });
            })
            .catch((err) => res.status(400).json(err));
    },
    // GETALL: Find all users
    getAll(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.json(err));
    },
    // GETLOGGEDINUSER : Find all logged in users
    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    },
    // GETONE: Find one user by id
    getOne(req, res) {
        User.findById({ _id: req.params.id })
            .then(oneUser => res.json(oneUser))
            .catch(err => res.status(400).json(err))
    },
    // UPDATE: Update one user by id, re-running validators on any changed fields
    update(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            context: 'query'
        })
            .then((updatedUser) => res.json(updatedUser))
            .catch((err) => res.status(400).json(err));
    },
    // DELETE: Delete one Player by id
    delete(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then(deletedUser => res.json(deletedUser))
            .catch(err => res.status(400).json(err));
    },
    // LOGIN: If email and password are valid, grant access
    login(req, res) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                res.status(400).json({ msg: "invalid login attempt" });
                } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((passwordIsValid) => {
                        if (passwordIsValid) {
                            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                            res.cookie("usertoken", token, { httpOnly: true }).json({ msg: "response has a cookie"})
                        } else {
                            res.status(400).json({ msg: "invalid login attempt" });
                        }
                    })
                    .catch((err) =>
                        res.status(400).json({ msg: "invalid login attempt" })
                    );
                }
            })
            .catch((err) => res.json(err));
    },

    //not working .... need to combine with login1
    login2 (req, res) {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered" })
        const user = User.findOne({ email : req.body.email })
        if (!user)
            return res.status(400).json({ msg: "No account with this email has been registered" })
        bcrypt
            .compare(password, user.password)
            .then((passwordIsValid) => {
                if (!passwordIsValid) {
                    return res.status(400).json({ msg: "Invalid credentials" })
                } else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                    res.json({
                        token,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                    })
                }
            })
            .catch((err) =>
                res.status(400).json({ msg: "invalid login attempt" })
            );
    },
    // LOGOUT: Remove logged cookies and revoke access
    logout(req, res) {
        res
            .cookie("usertoken", jwt.sign({ _id:"" }, process.env.JWT_SECRET), {
                httpOnly: true,
                maxAge: 0,
            })
            .json({ msg: "ok" });
    },
    logout2(req, res) {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoke cookie cleared" })
    }
}