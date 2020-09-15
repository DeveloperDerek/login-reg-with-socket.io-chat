const User = require("../models/user.model");

module.exports = {
    // CREATE: Create a new user
    create(req, res) {
        User.create(req.body)
            .then((user) => {res.json(user)})
            .catch((err) => {res.status(400).json(err);});
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
    }
}