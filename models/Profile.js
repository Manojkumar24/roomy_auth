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
  profession: {
    type: String,
    default: ''
  },
  hobbies: {
    hobbies1: {
      type: String,
      default: ''
    },
    hobbies2: {
      type: String,
      default: ''
    },
    hobbies3: {
      type: String,
      default: ''
    }
  },


  phonenum: {
    type: String,
    min: 1111111111,
    max: 9999999999
  }

  
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
