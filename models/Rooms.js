const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    mail: {
        type: String
    },
    phonenum: {
        type: Number,
        min: 1111111111,
        max: 9999999999
    },
    availability: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    smoker: {
        type: String, 
        enum: ["YES", "NO", "NOT SURE"],
        required: true
    },
    nightowl: {
        type: String, 
        enum: ["YES", "NO", "NOT SURE"],
        required: true
    },
    earlybird: {
        type: String, 
        enum: ["YES", "NO", "NOT SURE"],
        required: true
    },
    pets: {
        type: String, 
        enum: ["DOGS", "CATS", "BIRDS", "OTHERS", "NOT SURE"],
        required: true
    },
    vegetarians: {
        type: String, 
        enum: ["YES", "NO", "NOT SURE"],
        required: true
    },
    furnished: {
        type: String, 
        enum: ["FULLY", "SEMI", "NOT"],
        required: true
    },
    wifi: {
        type: String, 
        enum: ["YES", "NO"],
        required: true
    },
    parking: {
        type: String, 
        enum: ["FOUR WHEELER", "TWO WHEELER", "BOTH", "NONE"],
        required: true
    }
});

module.exports = Rooms = mongoose.model("rooms", RoomSchema);