const Conversation = require("../models/conversation.model");

module.exports = {
    create(req, res) {
        Conversation.create(req.body)
            .then((conversation) => {res.json(conversation)})
            .catch((err) => {res.status(400).json(err)});
    }
}