const mongoose = require("mongoose");
const Schema = mongoose.Schema

const contactSchema = new Schema(
    {
        requester: { 
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        recipient: { 
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            required: true,
            type: Number,
            enums: [
                1, // requested
                2, // pending
                3 // friends
            ]
        }
    }, 
    {timestaps: true}
)

module.exports = mongoose.model("Contact", contactSchema)