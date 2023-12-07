require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

require("./config/passport");

//register :post
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(401).send("This user already exits");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      await newUser
        .save()
        .then((user) => {
          res.status(201).send({
            success: true,
            message: "A user is created successfully",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((err) => {
          res.status(401).send({
            success: false,
            message: "User is not created",
          });
        });
    });
  } catch (error) {
    res.status(501).send(error.message);
  }
});

//login :post
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).send({
        success: false,
        message: "User is not found!",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2days",
    });

    res.status(201).send({
      success: true,
      message: "User is logged in successfully",
      token: "Bearer " + token, //Bearer and token must have a space
    });
  } catch (error) {
    res.status(501).send(error.message);
  }
});

//profile :get
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);
//base route
app.get("/", (req, res) => {
  res.status(200).send("home");
});

//route not found error
app.use((req, res, next) => {
  res.status(400).send("Requested is not found");
});

//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something broke");
});

module.exports = app;
