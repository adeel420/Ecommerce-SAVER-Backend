const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("../emailTemplate");
const transporter = require("./nodemailer");

const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: { name: "SAVER", address: process.env.ADMIN_EMAIL },
      to: email, // list of receivers
      subject: "Verify your Email", // Subject line
      text: "Verify your Email", // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode,
      ), // html body
    });
    console.log("Email Sent Successfully", response);
    return response;
  } catch (err) {
    console.error("Verification email send failed:", err);
    throw err;
  }
};

const welcomeCode = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: { name: "SAVER", address: process.env.ADMIN_EMAIL },
      to: email,
      subject: "Welcome to SAVER",
      text: `Welcome, ${name}!`,
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log("Email Sent Successfully", response);
  } catch (err) {
    console.error("Error sending welcome email:", err);
  }
};

module.exports = { sendVerificationCode, welcomeCode };
