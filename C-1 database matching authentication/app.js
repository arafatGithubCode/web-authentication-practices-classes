require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.model");

const PORT = process.env.PORT || 5001;

const dbUrl = process.env.MONGO_URL;

//connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("atlas db is connected");
  } catch (error) {
    console.log("atlas db not is connected");
    console.log(error.message);
    process.exit(1);
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "user is created",
      data: newUser,
    });
  } catch (error) {
    res.status(401).json({
      message: "user is not created",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(202).json({
        message: "valid user",
      });
    } else {
      res.status(402).json({
        message: "user NOt found",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Bad user credential",
      error: error.message,
    });
  }
});

//home route
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/./views/index.html");
});

//route not found error
app.use((req, res, next) => {
  res.status(400).send("Requested route is not found");
});

//server errror
app.use((err, req, res, next) => {
  res.status(500).send("something broke");
});

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
