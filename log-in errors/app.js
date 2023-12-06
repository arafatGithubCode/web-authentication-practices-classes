const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

require("dotenv").config();
require("./config/passport");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("view engine", "ejs");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());

//base route
app.get("/", (req, res) => {
  res.render("index");
});

//register :get
app.get("/register", (req, res) => {
  res.render("register");
});

//register :post
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send("This user already existed");
    } else {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        await newUser.save();
        res.status(201).redirect("/log-in");
      });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
};

// login : get
app.get("/log-in", checkLoggedIn, (req, res) => {
  res.render("log-in");
});

// login : post
app.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/profile",
    successRedirect: "/",
  })
);

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in");
};

// profile protected route
app.get("/profile", checkAuthenticated, (req, res) => {
  res.render("profile");
});

// logout route
app.get("/log-out", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//route not found error
app.use((req, res, next) => {
  res.status(400).send("Requested route is not found");
});

// server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
