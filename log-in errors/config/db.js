const mongoose = require("mongoose");
const config = require("./config");

const dbUrl = config.db.url;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("mongoDB atlas is connected");
  } catch (error) {
    console.log("mongoDB atlas is not connected");
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
