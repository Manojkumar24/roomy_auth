const mongoose = require("mongoose");

const PreferencesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String
    },
    // sq_ft: {
    //     type: Number,
    // 
    // },
    // address: {
    //     type: String,
    // 
    // },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    // state: {
    //     type: String,
    // 
    // },
    // phonenum: {
    //     type: Number,
    //     min: 1111111111,
    //     max: 9999999999
    // },
    // availability: {
    //     type: Number,
    //     min: 0,
    //     max: 5,
    // 
    // },
    rent: {
        type: Number
    },
    smoker: {
        type: String,
        enum: ["Yes", "No", "Not sure"]
    },
    nightowl: {
        type: String,
        enum: ["Yes", "No", "Not sure"]
    },
    earlybird: {
        type: String,
        enum: ["Yes", "No", "Not sure"]
    },
    pets: {
        type: String,
        enum: ["Dogs", "Cats", "Birds", "Others", "No Pets", "Not sure"]
    },
    vegetarians: {
        type: String,
        enum: ["Yes", "No", "Not sure"]
    },
    furnished: {
        type: String,
        enum: ["Fully", "Semi", "Not Furnished"]
    },
    wifi: {
        type: String,
        enum: ["Yes", "No"]
    },
    parking: {
        type: String,
        enum: ["Four Wheeler", "Two Wheeler", "Both", "No parking"]
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Not sure"]
    }
});

module.exports = Preferences = mongoose.model("preferences", PreferencesSchema);