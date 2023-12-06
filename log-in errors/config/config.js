require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 5001,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://0.0.0.0:27017/passportTestDB",
  },
};
module.exports = dev;
