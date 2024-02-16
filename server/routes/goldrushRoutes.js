const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

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
      "SELECT * FROM usersGoldrush WHERE LOWER(nickname) = LOWER($1);";
    const result = await global.dbPool.query(query, [nickname]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // Update last_login time
    const updateLastLoginQuery =
      "UPDATE usersGoldrush SET last_login = NOW() WHERE id = $1";
    await global.dbPool.query(updateLastLoginQuery, [result.rows[0].id]);

    res
      .status(200)
      .json({ id: result.rows[0].id, nickname: result.rows[0].nickname });
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
      INSERT INTO usersGoldrush (nickname, password, last_login)
      VALUES (LOWER($1), $2, NOW())
      RETURNING id, nickname;
    `;

    const result = await global.dbPool.query(query, [nickname, hashedPassword]);

    res.status(201).json({ user: result.rows[0] });
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
      INSERT INTO statisticsGoldrush (userId, escapedMatches, killedEnemies, timeSpendInMatches, totalMatches, spoilsvalue)
      VALUES ($1, $2, $3, $4, 1, $5)
      ON CONFLICT (userId)
      DO UPDATE SET
        escapedMatches = statisticsGoldrush.escapedMatches + $2,
        killedEnemies = statisticsGoldrush.killedEnemies + $3,
        timeSpendInMatches = statisticsGoldrush.timeSpendInMatches + $4,
        totalMatches = statisticsGoldrush.totalMatches + 1,
        spoilsvalue = statisticsGoldrush.spoilsvalue + $5;
    `;
    await global.dbPool.query(upsertQuery, [
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
          INSERT INTO itemstoragegoldrush (userId, itemid, quantity)
          VALUES ($1, $2, $3)
          ON CONFLICT (userId, itemid)
          DO UPDATE SET
          quantity = itemstoragegoldrush.quantity + $3
      `;
      await global.dbPool.query(upsertQuery, [userId, id, quantity]);
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
    const query = `SELECT json_agg(json_build_object('id', itemid, 'quantity', quantity)) as Items 
      FROM itemstorageGoldrush
      WHERE userId = $1;`;
    const storage = await global.dbPool.query(query, [userId]);
    res.status(200).json(storage.rows[0]);
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
          INSERT INTO itemstoragegoldrush (userId, itemid, quantity)
          VALUES ($1, $2, $3)
          ON CONFLICT (userId, itemid)
          DO UPDATE SET
          quantity = CASE
            WHEN (itemstoragegoldrush.quantity - $3) > 0 THEN (itemstoragegoldrush.quantity - $3)
            ELSE 0
          END
          WHERE itemstoragegoldrush.userId = $1 AND itemstoragegoldrush.itemid = $2;
      `;
      await global.dbPool.query(upsertQuery, [userId, id, quantity]);

      const deleteQuery = `
          DELETE FROM itemstoragegoldrush
          WHERE userId = $1 AND itemid = $2 AND quantity = 0;
      `;
      await global.dbPool.query(deleteQuery, [userId, id]);
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during removeFromStorage for GoldRush: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getLeaderboard", async (req, res) => {
  try {
    const query = `select usersgoldrush.nickname, statisticsgoldrush.spoilsvalue from statisticsgoldrush 
    inner join usersgoldrush on usersgoldrush.id = statisticsgoldrush.userid
    order by spoilsvalue desc fetch first 10 rows only`;
    const leaderboard = await global.dbPool.query(query);
    res.status(200).json(leaderboard.rows);
  } catch (error) {
    console.error("Database Goldrush 'getLeaderboard' error: ", error);
    res.status(500).json({
      message: "Internal server error Goldrush getLeaderboard " + this + ". ",
    });
  }
});

module.exports = router;
