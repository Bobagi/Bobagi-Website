const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.all("*", (req, res) => {
  res.status(404).send({
    error: "NotFound",
    message: "This API endpoint does not exist",
  });
});

module.exports = router;
