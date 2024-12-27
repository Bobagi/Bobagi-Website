const express = require("express");
const router = express.Router();
const { executeQuery } = require("../src/database.js");

router.get("/", async (req, res) => {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersion = await executeQuery("SHOW server_version;");
    const maxConnections = await executeQuery("SHOW max_connections;");

    const databaseName = process.env.POSTGRES_DB;
    const stats = await executeQuery({
      text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
      values: [databaseName],
    });

    res.status(200).json({
      updated_at: updatedAt,
      dependecies: {
        database: {
          version: databaseVersion[0].server_version,
          max_connections: parseInt(maxConnections[0].max_connections),
          opened_connections: parseInt(stats[0].count),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
