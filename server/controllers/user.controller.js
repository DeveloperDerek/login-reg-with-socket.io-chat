const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    // CREATE: Create a new user
    create(req, res) {
        User.create(req.body)
            .then((user) => {
                res.json(user)
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.cookie(
                    "usertoken", //name of cookie
                    token, //data of cookie
                    { httpOnly: true } //additional flag included in a Set-Cookie HTTP response header. Using it when generating a cookie helps mitigate the risk of client side script accessing the protected cookie. Can't be accessed by javascript
                )
                .json({ msg: "response has a cookie"})
            })
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
    // GETONE: Find one user by id
    getOne(req, res) {
        User.findById({ _id: req.params.id })
            .then(oneUser => res.json(oneUser))
            .catch(err => res.status(400).json(err))
    },
    // UPDATE: Update one user by id, re-running validators on any changed fields
    update(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: 'query' })
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
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered" })
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                res.status(400).json({ msg: "invalid email" });
                } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((passwordIsValid) => {
                        if (passwordIsValid) {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                            res.cookie(
                                "usertoken", //name of cookie
                                token, //data of cookie
                                { httpOnly: true } //additional flag included in a Set-Cookie HTTP response header. Using it when generating a cookie helps mitigate the risk of client side script accessing the protected cookie. Can't be accessed by javascript
                            )
                            .json({ msg: "response has a cookie"})
                        } else {
                            res.status(400).json({ msg: "invalid password" });
                        }
                    })
                    .catch((err) =>
                        res.status(400).json({ msg: "invalid login attempt" })
                    );
                }
            })
            .catch((err) => res.json(err));
    },
    // GETLOGGEDINUSER : Find the logged in user
    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    },
    // LOGOUTS: Remove logged cookies and revoke access
    logout2(req, res) {
        res
            .cookie("usertoken", jwt.sign({ _id:"" }, process.env.JWT_SECRET), {
                httpOnly: true,
                maxAge: 0,
            })
            .json({ msg: "ok" });
    },
    logout(req, res) {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoken cookie cleared" })
    },
    // GETLOGGEDINUSER : Find the logged in user
    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    },
// User1 sends out contact request
    async requestContact (req, res) {
        try{
            const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
            const loggedUser = await User.findById(decodedJWT.payload._id);
            const docA = await Contact.findOneAndUpdate(
                { requester: loggedUser._id, recipient: req.params.id },
                { $set: { status: 1 }},
                { upsert: true, new: true }
            )
            const docB = await Contact.findOneAndUpdate(
                { recipient: loggedUser._id, requester: req.params.id },
                { $set: { status: 2 }},
                { upsert: true, new: true }
            )
            const updateUserA = await User.findOneAndUpdate(
                { _id: loggedUser._id },
                { $addToSet: { contacts: docA._id }}
            )
            const updateUserB = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { contacts: docB._id }}
            )
            return res.json({msg: "sent request"})
        } catch(err) {
            console.log(err);
        }
        
    },
// User 2 accepts contact request
    async acceptContact (req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        const loggedUser = await User.findById(decodedJWT.payload._id);
        await Contact.findOneAndUpdate(
            { requester: loggedUser._id, recipient: req.params.id },
            { $set: { status: 3 }}
        )
        await Contact.findOneAndUpdate(
            { recipient: loggedUser._id, requester: req.params.id },
            { $set: { status: 3 }}
        )
        return res.json({ msg: "accepted request"})
    },
// User 2 rejects contact request
    async rejectContact(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        const loggedUser = await User.findById(decodedJWT.payload._id);
        const docA = await Contact.findOneAndRemove(
            { requester: loggedUser._id, recipient: req.params.id }
        )
        const docB = await Contact.findOneAndRemove(
            { recipient: loggedUser._id, requester: req.params.id }
        )
        const updateUserA = await User.findOneAndUpdate(
            { _id: loggedUser._id },
            { $pull: { contacts: docA._id }}
        )
        const updateUserB = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { contacts: docB._id }}
        )
        return res.json({ msg: "removed request"})
    },
// Get contacts
    findContacts(req, res) {
        Contact.find()
            .then((contacts) => res.json(contacts))
            .catch((err) => res.json(err));
    }
}




