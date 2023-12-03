const userRouter = require("express").Router();

const { registerUser, logInUser } = require("../controllers/user.controller");

userRouter.post("/register", registerUser);
userRouter.post("/logIn", logInUser);

module.exports = userRouter;
