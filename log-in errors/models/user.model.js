const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [
      4,
      "Minimum length of name should be greater then 4 characters",
    ],
    maxLength: [
      20,
      "Maximum length of name should be less then 20 characrters",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email already exist"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [
      8,
      "Minimum length of password should be greater then 8 characters",
    ],
  },
});
const User = mongoose.model("passportUsers", userSchema);
module.exports = User;
