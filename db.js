const mongoose = require("mongoose");

let connectionPromise;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise();
    return mongoose.connection;
  }

  // Support both the name used by this project and MongoDB's common Vercel
  // integration variable name. Vercel does not load backend/.env on deploy.
  const mongoURL = process.env.MONGO_URL || process.env.MONGODB_URI;
  if (!mongoURL) {
    throw new Error("Set MONGO_URL or MONGODB_URI in the backend deployment environment");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(mongoURL, {
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
