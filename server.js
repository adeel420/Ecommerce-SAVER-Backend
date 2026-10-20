const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const connectDB = require("./db");
const passport = require("./middleware/auth");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const cartRoutes = require("./routes/CartRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const newsLetterRoutes = require("./routes/NewsLetterRoutes");
const accountRoutes = require("./routes/AccountRoutes");
const orderRoutes = require("./routes/OrderRoutes");

// Packages
app.use(cors());
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(passport.initialize());
const authMiddleware = passport.authenticate("local", { session: false });

// Wait for MongoDB before dispatching API requests. This also ensures every
// Vercel serverless invocation can establish/reuse the database connection.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database unavailable:", error.message);
    res.status(503).json({
      error: "The database is temporarily unavailable. Please try again shortly.",
    });
  }
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsLetterRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/orders", orderRoutes);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
