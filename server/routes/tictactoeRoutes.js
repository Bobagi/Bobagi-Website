const express = require("express");
const router = express.Router();
const { executeQuery } = require("../src/database.js");

router.get("/statistics", async (req, res) => {
  const { id } = req.query;
  try {
    const queryTotalMatches =
      "SELECT COUNT(*) AS total_matches FROM matches WHERE player_one_id = $1 OR player_two_id = $1;";
    const resultTotalMatches = await executeQuery(queryTotalMatches, [id]);

    const queryWins =
      "SELECT COUNT(*) AS winned_matches FROM matches WHERE winner_id = $1;";
    const resultWins = await executeQuery(queryWins, [id]);

    res.status(200).json({
      message: "statistics return",
      totalMatches: resultTotalMatches[0].total_matches,
      totalWinnings: resultWins[0].winned_matches,
    });
  } catch (error) {
    console.error("Database TicTacToe '/statistics' error: ", error);
    res.status(500).json({
      message: "Internal server error TicTacToe '/statistics'.",
    });
  }
});

router.get("/statisticsagainst", async (req, res) => {
  const { id, opponentId } = req.query;
  try {
    const queryTotalMatches = `SELECT COUNT(*) AS total_matches
       FROM matches
       WHERE (player_one_id = $1 AND player_two_id = $2)
          OR (player_one_id = $2 AND player_two_id = $1);`;
    const resultTotalMatches = await executeQuery(queryTotalMatches, [
      id,
      opponentId,
    ]);

    const queryWins = `SELECT COUNT(*) AS winned_matches
       FROM matches
       WHERE ((player_one_id = $1 AND player_two_id = $2)
          OR (player_one_id = $2 AND player_two_id = $1))
         AND winner_id = $1;`;
    const resultWins = await executeQuery(queryWins, [id, opponentId]);

    res.status(200).json({
      message: "statistics return",
      totalMatches: resultTotalMatches[0].total_matches,
      totalWinnings: resultWins[0].winned_matches,
    });
  } catch (error) {
    console.error("Database TicTacToe '/statisticsagainst' error: ", error);
    res.status(500).json({
      message: "Internal server error TicTacToe '/statisticsagainst'.",
    });
  }
});

module.exports = router;
