const mongoose = require("mongoose");

const UserReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    occupant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    smoker: {
        type: String
    },
    nightowl: {
        type: String
    },
    earlybird: {
        type: String
    },
    vegetarians: {
        type: String
    },
    review_text:{
        type:String
    },
    pets: {
        type: String
    }
});

module.exports = UserReview = mongoose.model("user_review", UserReviewSchema);