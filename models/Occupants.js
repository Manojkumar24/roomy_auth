const mongoose = require("mongoose");

const OccupantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms"
    }
});

module.exports = Occupants = mongoose.model("occupants", OccupantSchema);