const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({
        message: "User is created",
        data: newUser,
      });
    });
  } catch (error) {
    res.status(401).json({
      message: "User is not created",
      error: error.message,
    });
  }
};

const logInUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          res.status(201).json({
            message: "Valid user",
          });
        }
      });
    } else {
      res.status(401).send("User data is not found");
    }
  } catch (error) {
    res.status(401).json({
      message: "Bad user credential",
      error: error.message,
    });
  }
};
module.exports = { registerUser, logInUser };
