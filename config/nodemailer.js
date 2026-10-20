const nodemailer = require("nodemailer");
const path = require("path");

// Resolve backend env settings regardless of the shell's current directory.
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASS) {
  console.warn("SMTP is not configured: set ADMIN_EMAIL and ADMIN_PASS in the backend environment.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  connectionTimeout: 15000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  },
});

module.exports = transporter;
