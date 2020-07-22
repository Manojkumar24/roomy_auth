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
    sq_ft: {
        type: Number,
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
        enum: ["Yes", "No", "Not sure"],
        required: true
    },
    nightowl: {
        type: String, 
        enum: ["Yes", "No", "Not sure"],
        required: true
    },
    earlybird: {
        type: String, 
        enum: ["Yes", "No", "Not sure"],
        required: true
    },
    pets: {
        type: String, 
        enum: ["Dogs", "Cats", "Birds", "Others", "No Pets","Not sure"],
        required: true
    },
    vegetarians: {
        type: String, 
        enum: ["Yes", "No", "Not sure"],
        required: true
    },
    furnished: {
        type: String, 
        enum: ["Fully", "Semi", "Not Furnished"],
        required: true
    },
    wifi: {
        type: String, 
        enum: ["Yes", "No"],
        required: true
    },
    parking: {
        type: String,
        enum: ["Four Wheeler", "Two Wheeler", "Both", "No parking"],
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Not sure"],
        required: true
    },

    interested_people: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    }
});

module.exports = Rooms = mongoose.model("rooms", RoomSchema);