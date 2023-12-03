const User = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "User is created",
      data: newUser,
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
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(201).json({
        message: "user is logged-In",
        data: user,
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
