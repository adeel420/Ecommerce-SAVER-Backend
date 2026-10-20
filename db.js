const mongoose = require("mongoose");

let connectionPromise;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise();
    return mongoose.connection;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not configured");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => mongoose.connection)
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
}

mongoose.connection.on("disconnected", () => {
  connectionPromise = undefined;
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

module.exports = connectDB;
