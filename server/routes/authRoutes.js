const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  // Handle registration logic here
  res.send("Registration endpoint");
});

router.get("/login", (req, res) => {
  // Handle login logic here
  res.send("Login endpoint");
});

module.exports = router;
