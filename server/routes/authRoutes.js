const express = require("express");
const router = express.Router();
const { verifyGoogleToken } = require("../src/verifyGoogleToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../src/verifyToken");
const { executeQuery } = require("../src/database.js");

router.get("/testauth", async (req, res) => {
  res.status(200).json({ message: "Recovery test routes sent" });
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

    const checkUserQuery =
      "SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)";
    const result = await executeQuery(checkUserQuery, [emailOrUsername]);

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, result[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    await executeQuery("DELETE FROM active_sessions WHERE user_id = $1", [
      result[0].id,
    ]);

    // Update last_login time
    const updateLastLoginQuery =
      "UPDATE users SET last_login = NOW() WHERE id = $1";
    await executeQuery(updateLastLoginQuery, [result[0].id]);

    const token = jwt.sign(
      { userId: result[0].id, username: result[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await executeQuery(
      "INSERT INTO active_sessions (token, user_id) VALUES ($1, $2)",
      [token, result[0].id]
    );

    res.status(200).json({ user: result[0], token });
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

    if (username == "" || email == "") {
      return res.status(400).json({ error: "Username or email not defined" });
    }

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

    const result = await executeQuery(query, [email, username, hashedPassword]);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: result[0].id, username: result[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the registered user information along with the token
    res.status(201).json({ user: result[0], token });
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
    const query = "SELECT * FROM users WHERE google_id = $1 OR email = $2";
    const result = await executeQuery(query, [
      googleUser.sub,
      googleUser.email,
    ]);

    if (result.length > 0) {
      const user = result[0];

      // Update google_id if it is not set for the existing user
      if (!user.google_id) {
        const updateQuery = "UPDATE users SET google_id = $1 WHERE id = $2";
        await executeQuery(updateQuery, [googleUser.sub, user.id]);
      }

      // Generate a JWT token
      const generatedToken = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user: user, token: generatedToken });
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

router.post("/login-google-auth", async (req, res) => {
  console.log("entered");
  try {
    const { token } = req.body;
    const googleUser = await verifyGoogleToken(token);

    const query = "SELECT * FROM users WHERE google_id = $1 OR email = $2";
    console.log("query: ", query);

    const result = await executeQuery(query, [
      googleUser.sub,
      googleUser.email,
    ]);

    console.log("terminated");
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await executeQuery("DELETE FROM active_sessions WHERE user_id = $1", [
      result[0].id,
    ]);

    // Update last_login time
    const updateLastLoginQuery =
      "UPDATE users SET last_login = NOW() WHERE id = $1";
    await executeQuery(updateLastLoginQuery, [result[0].id]);

    const newToken = jwt.sign(
      { userId: result[0].id, username: result[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await executeQuery(
      "INSERT INTO active_sessions (token, user_id) VALUES ($1, $2)",
      [newToken, result[0].id]
    );

    res.status(200).json({ user: result[0], newToken });
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

    if (username == "" || email == "" || sub == "") {
      return res.status(400).json({ error: "Username or email not defined" });
    }

    // Insert the user into the database
    const insertQuery = `
        INSERT INTO users (email, username, google_id, last_login)
        VALUES ($1, $2, $3, NOW())
        RETURNING id, email, username;
      `;

    const result = await executeQuery(insertQuery, [email, username, sub]);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: result[0].id, username: result[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the registered user information along with the token
    res.status(201).json({ user: result[0], token });
  } catch (error) {
    console.error("Error during google user registration error: ", error);
    res.status(500).send("Internal Server Error: Google register");
  }
});

router.get("/users/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    // Optional: Check if the authenticated user is the one being the search

    if (parseInt(req.user.userId, 10) !== parseInt(userId, 10)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to access this user" });
    }

    const selectQuery = "SELECT id, dark_theme, theme FROM users WHERE id = $1";
    const result = await executeQuery(selectQuery, [userId]);

    res.status(200).json({
      message: `User ${result[0].username} successfully accessed!`,
      id: result[0].id,
      darkTheme: result[0].darktheme,
      theme: result[0].theme,
    });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/users/delete/:id", verifyToken, async (req, res) => {
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
    await executeQuery(deleteQuery, [userId]);

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/users/update/:id", verifyToken, async (req, res) => {
  try {
    const { userId, darkTheme, selectedColor } = req.body;
    // Optional: Check if the authenticated user is the one being the Update

    if (parseInt(req.user.userId, 10) !== parseInt(userId, 10)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this user" });
    }

    const updateQuery = "UPDATE users SET dark_theme = $1, theme = $2 WHERE id = $3";
    await executeQuery(updateQuery, [darkTheme, selectedColor, userId]);

    res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
