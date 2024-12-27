const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { executeQuery } = require("../src/database.js");

router.get("/test", async (req, res) => {
  res.status(200).json({ message: "Goldrush test Get success" });
});

router.post("/login", async (req, res) => {
  try {
    const { nickname, password } = req.body;

    if (!nickname || !password) {
      return res
        .status(400)
        .json({ error: "Nickname and password are required." });
    }

    const query =
      "SELECT * FROM users_goldrush WHERE LOWER(nickname) = LOWER($1);";
    const result = await executeQuery(query, [nickname]);

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, result[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // Update last_login time
    const updateLastLoginQuery =
      "UPDATE users_goldrush SET last_login = NOW() WHERE id = $1";
    await executeQuery(updateLastLoginQuery, [result[0].id]);

    res.status(200).json({ id: result[0].id, nickname: result[0].nickname });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { nickname, password, confirmPassword } = req.body;

    if (nickname == "") {
      return res.status(400).json({ error: "Nickname not defined." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users_goldrush (nickname, password, last_login)
      VALUES (LOWER($1), $2, NOW())
      RETURNING id, nickname;
    `;

    const result = await executeQuery(query, [nickname, hashedPassword]);

    res.status(201).json({ user: result[0] });
  } catch (error) {
    console.error("Error during user registration error for GoldRush: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/saveMatchResults", async (req, res) => {
  try {
    const { userId, escaped, killedEnemies, elapsedTimeInMatch, spoilsValue } =
      req.body;

    // Format elapsedTimeInMatch
    const elapsedTimeFormatted =
      typeof elapsedTimeInMatch === "string"
        ? parseFloat(elapsedTimeInMatch.replace(",", "."))
        : elapsedTimeInMatch;

    // UPSERT query: update if exists, else insert
    const upsertQuery = `
      INSERT INTO statistics_goldrush (user_id, escaped_matches, killed_enemies, time_spent_in_matches, total_matches, spoils_value)
      VALUES ($1, $2, $3, $4, 1, $5)
      ON CONFLICT (userId)
      DO UPDATE SET
        escaped_matches = statistics_goldrush.escaped_matches + $2,
        killed_enemies = statistics_goldrush.killed_enemies + $3,
        time_spent_in_matches = statistics_goldrush.time_spent_in_matches + $4,
        total_matches = statistics_goldrush.total_matches + 1,
        spoils_value = statistics_goldrush.spoils_value + $5;
    `;
    await executeQuery(upsertQuery, [
      userId,
      escaped,
      killedEnemies,
      elapsedTimeFormatted,
      spoilsValue,
    ]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during saveMatchResults for GoldRush: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/saveSpoils", async (req, res) => {
  try {
    const { userId, items } = req.body;
    const itemsList = JSON.parse(items);

    for (let i = 0; i < itemsList.items.length; i++) {
      const { id, quantity } = itemsList.items[i];
      const upsertQuery = `
          INSERT INTO item_storage_goldrush (user_id, item_id, quantity)
          VALUES ($1, $2, $3)
          ON CONFLICT (user_id, item_id)
          DO UPDATE SET
          quantity = item_storage_goldrush.quantity + $3
      `;
      await executeQuery(upsertQuery, [userId, id, quantity]);
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during saveSpoils for GoldRush: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/loadStorage", async (req, res) => {
  const { userId } = req.query;
  try {
    const query = `SELECT json_agg(json_build_object('id', item_id, 'quantity', quantity)) as Items 
      FROM item_storage_goldrush
      WHERE user_id = $1;`;
    const storage = await executeQuery(query, [userId]);
    res.status(200).json(storage[0]);
  } catch (error) {
    console.error("Database Goldrush 'loadStorage' error: ", error);
    res.status(500).json({
      message: "Internal server error Goldrush loadStorage " + this + ". ",
    });
  }
});

router.post("/removeFromStorage", async (req, res) => {
  try {
    const { userId, items } = req.body;
    const itemsList = JSON.parse(items);

    // If the item is not registered and try to delete it, one copy of it will be registered instead... fix that
    for (let i = 0; i < itemsList.length; i++) {
      const { id, quantity } = itemsList[i];
      const upsertQuery = `
          INSERT INTO item_storage_goldrush (user_id, item_id, quantity)
          VALUES ($1, $2, $3)
          ON CONFLICT (user_id, item_id)
          DO UPDATE SET
          quantity = CASE
            WHEN (item_storage_goldrush.quantity - $3) > 0 THEN (item_storage_goldrush.quantity - $3)
            ELSE 0
          END
          WHERE item_storage_goldrush.user_id = $1 AND item_storage_goldrush.item_id = $2;
      `;
      await executeQuery(upsertQuery, [userId, id, quantity]);

      const deleteQuery = `
          DELETE FROM item_storage_goldrush
          WHERE user_id = $1 AND item_id = $2 AND quantity = 0;
      `;
      await executeQuery(deleteQuery, [userId, id]);
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during removeFromStorage for GoldRush: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getLeaderboard", async (req, res) => {
  try {
    const query = `select users_goldrush.nickname, statistics_goldrush.spoils_value from statistics_goldrush 
    inner join users_goldrush on users_goldrush.id = statistics_goldrush.user_id
    order by spoils_value desc fetch first 10 rows only`;
    const leaderboard = await executeQuery(query);
    res.status(200).json(leaderboard.rows);
  } catch (error) {
    console.error("Database Goldrush 'getLeaderboard' error: ", error);
    res.status(500).json({
      message: "Internal server error Goldrush getLeaderboard " + this + ". ",
    });
  }
});

module.exports = router;
