const mongoose = require("mongoose");

const ComplainsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: true
    },
    complain: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open","closed"],
        required: true,
        default:"open"
    },
    created_at: { type: Date, default: Date.now }

});

module.exports = Complains = mongoose.model("complains", ComplainsSchema);