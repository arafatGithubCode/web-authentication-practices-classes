const { default: mongoose } = require("mongoose");

require("dotenv").config();

const dbUrl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
