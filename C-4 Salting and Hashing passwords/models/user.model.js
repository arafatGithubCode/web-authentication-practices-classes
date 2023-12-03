const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Usr name is required"],
  },
  email: {
    type: String,
    required: [true, "Usr email is required"],
  },
  password: {
    type: String,
    required: [true, "Usr password is required"],
  },
});

module.exports = mongoose.model("users", userSchema);
