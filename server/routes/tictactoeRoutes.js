const express = require("express");
const router = express.Router();

router.get("/statistics", async (req, res) => {
  const { id } = req.query;
  try {
    const queryTotalMatches =
      "select COUNT(*) AS TotalMatches from matches where playerone_id = $1 OR playertwo_id = $1;";
    const resultTotalMatches = await global.dbPool.query(queryTotalMatches, [
      id,
    ]);

    const queryWins =
      "select COUNT(*) AS WinnedMatches from matches where winner = $1;";
    const resultWins = await global.dbPool.query(queryWins, [id]);

    res.status(200).json({
      message: "statistics return",
      totalMatches: resultTotalMatches.rows[0].totalmatches,
      totalWinnings: resultWins.rows[0].winnedmatches,
    });
  } catch (error) {
    console.error("Database TicTacToe '/test' error: ", error);
    res
      .status(500)
      .json({ message: "Internal server error TicTacToe " + this + ". " });
  }
});

router.get("/statisticsagainst", async (req, res) => {
  const { id, opponentId } = req.query;
  try {
    const queryTotalMatches =
      "select COUNT(*) AS TotalMatches from matches where (playerone_id = $1 AND playertwo_id = $2) OR (playerone_id = $2 AND playertwo_id = $1);";
    const resultTotalMatches = await global.dbPool.query(queryTotalMatches, [
      id,
      opponentId,
    ]);

    const queryWins =
      "select COUNT(*) AS WinnedMatches from matches where ((playerone_id = $1 AND playertwo_id = $2) OR (playerone_id = $2 AND playertwo_id = $1)) AND winner = $1;";
    const resultWins = await global.dbPool.query(queryWins, [id, opponentId]);

    res.status(200).json({
      message: "statistics return",
      totalMatches: resultTotalMatches.rows[0].totalmatches,
      totalWinnings: resultWins.rows[0].winnedmatches,
    });
  } catch (error) {
    console.error("Database TicTacToe '/test' error: ", error);
    res
      .status(500)
      .json({ message: "Internal server error TicTacToe " + this + ". " });
  }
});

module.exports = router;
