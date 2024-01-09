const express = require("express");
const router = express.Router();
const { verifyGoogleToken } = require("../src/verifyGoogleToken");
const bcrypt = require("bcrypt");
const pool = require("../src/db.js");
const jwt = require("jsonwebtoken");
const verifyToken = require("../src/verifyToken");

// Test database connection endpoint
router.get("/test", async (req, res) => {
  try {
    // Test the database connection by querying a simple table
    const result = await pool.query(
      "SELECT 'Database connection test' AS test"
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.warn("Error during database connection test:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Username/Email and password are required" });
    }

    const query =
      "SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)";
    const result = await pool.query(query, [emailOrUsername]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Update last_login time
    const updateLastLoginQuery =
      "UPDATE users SET last_login = NOW() WHERE id = $1";
    await pool.query(updateLastLoginQuery, [result.rows[0].id]);

    const token = jwt.sign(
      { userId: result.rows[0].id, username: result.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: result.rows[0], token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    // Extract user information from the request body
    const { email, username, password, confirmPassword } = req.body;

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const query = `
      INSERT INTO users (email, username, password, last_login)
      VALUES (LOWER($1), LOWER($2), $3, NOW())
      RETURNING id, email, username;
    `;

    const result = await pool.query(query, [email, username, hashedPassword]);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: result.rows[0].id, username: result.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the registered user information along with the token
    res.status(201).json({ user: result.rows[0], token });
  } catch (error) {
    console.error("Error during user registration error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/google-auth", async (req, res) => {
  try {
    const { token } = req.body;
    const googleUser = await verifyGoogleToken(token);

    // Check if the user exists in the database
    const query = "SELECT * FROM users WHERE google_id = $1";
    const result = await pool.query(query, [googleUser.sub]);

    if (result.rows.length > 0) {
      // User exists, log them in
      // Generate JWT token, etc.
      // ...
      res.status(200).json({ user: result.rows[0], token: generatedToken });
    } else {
      // User doesn't exist, prompt for additional information
      res.status(202).json({
        message: "Additional information required",
        email: googleUser.email,
        sub: googleUser.sub,
      });
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "Authentication failed", error: error.message });
  }
});

router.post("/register-google-user", async (req, res) => {
  try {
    // Extract user information from the request body
    const { email, username, sub } = req.body;

    // Insert the user into the database
    const insertQuery = `
        INSERT INTO users (email, username, google_id)
        VALUES ($1, $2, $3)
        RETURNING id, email, username;
      `;

    const result = await pool.query(insertQuery, [email, username, sub]);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: result.rows[0].id, username: result.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the registered user information along with the token
    res.status(201).json({ user: result.rows[0], token });
  } catch (error) {
    console.error("Error during google user registration error: ", error);
    res.status(500).send("Internal Server Error: Google register");
  }
});

router.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    // Optional: Check if the authenticated user is the one being deleted

    if (parseInt(req.user.userId, 10) !== parseInt(userId, 10)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this user" });
    }

    // Delete the user from the database
    const deleteQuery = "DELETE FROM users WHERE id = $1";
    await pool.query(deleteQuery, [userId]);

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
