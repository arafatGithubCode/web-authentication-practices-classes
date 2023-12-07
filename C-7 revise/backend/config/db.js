const config = require("./config");
const mongoose = require("mongoose");

const dbUrl = config.db.url;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("mongo atlas is connected");
  } catch (error) {
    console.log("mongo atlas is not connected");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
