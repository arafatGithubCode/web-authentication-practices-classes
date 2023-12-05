require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("db is not connected");
    console.log(err.message);
  });
