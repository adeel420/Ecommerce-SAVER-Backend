const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("disconnected", () => {
  console.log("Disconnected to MongoDB");
});
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
module.exports = db;
