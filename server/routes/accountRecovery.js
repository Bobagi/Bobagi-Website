const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { executeQuery } = require("../src/database.js");

router.get("/testrecovery", async (req, res) => {
  res.status(200).json({ message: "Recovery test recovery sent" });
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await executeQuery(checkUserQuery, [email]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updateTokenQuery = `
      UPDATE users 
      SET reset_password_token = $1, reset_password_expires = NOW() + INTERVAL '15 minutes' 
      WHERE email = $2`;
    await executeQuery(updateTokenQuery, [token, email]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bobagi.contact@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "bobagi.contact@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Please click on the following link, or paste this into your browser to complete the process:</p><p><a href="https://bobagi.net/ForgotPassword?token=${token}">https://bobagi.net/ForgotPassword?token=${token}</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(401).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Recovery email sent" });
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/resetpassword", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const tokenQuery = `
      SELECT id FROM users 
      WHERE reset_password_token = $1 
      AND reset_password_expires > NOW()`;
    const tokenResult = await executeQuery(tokenQuery, [token]);

    if (tokenResult.length === 0) {
      return res.status(400).send("Invalid or expired token.");
    }

    const userId = tokenResult[0].id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatePasswordQuery = `
      UPDATE users 
      SET password = $1, reset_password_token = NULL, reset_password_expires = NULL 
      WHERE id = $2`;
    await executeQuery(updatePasswordQuery, [hashedPassword, userId]);

    res.send("Password has been reset.");
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
