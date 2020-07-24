const mongoose = require("mongoose");

const RoomReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms"
    },
    rent: {
        type: Number
    },
    furnished: {
        type: String
    },
    wifi: {
        type: String
        
    },
    parking: {
        type: String
    },
    review_text: {
        type: String
    },
    owner_review: {
        type: String
    }
});

module.exports = RoomReview = mongoose.model("room_review", RoomReviewSchema);