require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/witcher-db"
);

module.exports = mongoose.connection;
