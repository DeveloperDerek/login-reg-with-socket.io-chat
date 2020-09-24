const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        participants: [String],
        messages: [
            {
                username: String,
                text: String,
                date: Number,
            }
        ]
    }
)

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
