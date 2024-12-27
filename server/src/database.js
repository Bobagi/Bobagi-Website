const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || "default",
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || "dockerDB",
});

async function executeQuery(query, params) {
  let client;

  try {
    client = await pool.connect();
    // console.log("Connected to database");
  } catch (connectionError) {
    console.error("Failed to connect to the database:", connectionError);
    throw new Error("Database connection failed");
  }

  try {
    const result = await client.query(query, params);
    return result.rows;
  } catch (queryError) {
    console.error("Failed to execute query:", queryError);
    throw new Error("Query execution failed");
  } finally {
    if (client) {
      client.release();
      // console.log("Database connection released");
    }
  }
}

module.exports = { executeQuery };
