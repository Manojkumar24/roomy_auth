const mongoose = require("mongoose");

const RateOccupantsAndRoomSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique:true
    },
    occupants:{
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: true  
    }
});

module.exports = RateOccupantsAndRoom = mongoose.model("rate_occupants_room", RateOccupantsAndRoomSchema);