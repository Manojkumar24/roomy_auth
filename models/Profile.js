const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },


  phonenum: {
    type: String,
    min: 1111111111,
    max: 9999999999
  }

  
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
