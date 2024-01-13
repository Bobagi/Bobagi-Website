// verifyToken.js
const jwt = require("jsonwebtoken");
const pool = require("./db.js");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Check if the token is in active sessions
      const sessionResult = await pool.query(
        "SELECT * FROM active_sessions WHERE token = $1",
        [token]
      );
      if (sessionResult.rows.length === 0) {
        return res.status(401).send("Session expired. Please log in again.");
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json("Token is not valid");
    }
  } else {
    res.status(401).json("You are not authenticated");
  }
};

module.exports = verifyToken;
