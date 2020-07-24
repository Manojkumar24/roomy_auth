const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms"
    },
    payment_id: {
        type: String
    },
    amount: {
        type: Number
    },
    order_id: {
        type: String
    },
    transaction_date: {
        type: Date, default: Date.now
    },
    transaction_method: {
        type: String
    }
});

module.exports = Rent = mongoose.model("rent", RentSchema);