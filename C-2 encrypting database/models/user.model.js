const encrypt = require("mongoose-encryption");
const mongoose = require("mongoose");
require("dotenv").config();

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

const encKey = process.env.ENC_key_Any_Name;

userSchema.plugin(encrypt, {
  secret: encKey,
  encryptedFields: ["password", "email"],
});
module.exports = mongoose.model("users", userSchema);
