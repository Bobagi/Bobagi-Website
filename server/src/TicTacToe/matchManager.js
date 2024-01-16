let activeMatches = {};
let currentMatchId = 0;
const timeouts = {};

function generateMatchId() {
  return ++currentMatchId; // Increment and return the new match ID
}

function checkForWin(cells, symbol) {
  // Winning combinations
  const lines = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // First diagonal
    [2, 4, 6], // Second diagonal
  ];

  // Check if any winning combination is met
  return lines.some((line) => {
    return line.every((index) => cells[index] === symbol);
  });
}

function isDraw(cells) {
  return cells.every((cell) => cell === "X" || cell === "O");
}

module.exports = {
  getActiveMatches() {
    return activeMatches;
  },
  startMatch(io, playerOne, playerTwo) {
    const matchId = generateMatchId();

    const match = {
      id: matchId,
      players: [playerOne, playerTwo],
      startTime: Date.now(),
      round: 1,
      whosRound: playerOne.userId,
      cells: Array(9).fill(""),
      finished: false,
      // ... other match properties ...
    };

    console.log(
      `Starting match between ${playerOne.userId} - ${playerOne.username} and ${playerTwo.userId} - ${playerTwo.username}`
    );

    activeMatches[matchId] = match;

    io.to(playerOne.socketId).emit("matchStart", {
      matchId: matchId,
      opponent: playerTwo.userId,
      opponentUsername: playerTwo.username,
      symbol: "X",
    });
    io.to(playerTwo.socketId).emit("matchStart", {
      matchId: matchId,
      opponent: playerOne.userId,
      opponentUsername: playerOne.username,
      symbol: "O",
    });

    this.setTimer(io, match, playerOne.userId, playerTwo.userId);

    return matchId;
  },
  setTimer(io, match, actualPlayerId, nextPlayerId) {
    // Start a new timeout for the opponent's move
    timeouts[match.id] = setTimeout(() => {
      if (match.whosRound === actualPlayerId && !match.finished) {
        // Opponent didn't make a move in time
        io.emit("moveTimeout");
        match.whosRound = nextPlayerId; // Switch back the turn to the current player
        match.round += 1;
        this.setTimer(io, match, nextPlayerId, actualPlayerId);
      }
    }, 20000); // 20 seconds
  },

  handlePlayerDisconnect(io, matchId, socketId) {
    const match = activeMatches[matchId];
    if (!match) {
      console.log(`No active match found for matchId: ${matchId}`);
      return;
    }

    // Find the disconnecting player and the opponent
    let disconnectingPlayer, opponentPlayer;

    for (let player of match.players) {
      if (player.socketId === socketId) {
        disconnectingPlayer = player;
      } else {
        opponentPlayer = player;
      }
    }

    // If there is an opponent player, notify them about the disconnection
    if (opponentPlayer) {
      io.to(opponentPlayer.socketId).emit("opponentDisconnected");
    }

    if (disconnectingPlayer && opponentPlayer && match.finished == false) {
      this.insertMatchInDatabase(
        disconnectingPlayer.userId,
        opponentPlayer.userId,
        opponentPlayer.userId, // Assuming the opponent is considered the winner
        match.startTime,
        match.round,
        false
      );
    }

    // Clean up the match
    delete activeMatches[matchId];
  },

  // this.socket.emit("makeMove", {
  //   matchId: this.matchId,
  //   userId: this.user.id,
  //   index: this.index,
  //   symbol: this.symbol,
  // });
  handleMove(io, socket, moveData) {
    // Retrieve the match using match ID
    const match = activeMatches[moveData.matchId];

    if (match) {
      if (moveData.userId !== match.whosRound) {
        return; // It's not this player's turn
      }

      if (match.cells[moveData.index] !== "") {
        socket.emit("invalidMove", "Place already taken!");
        return;
      }

      // Player made a valid move
      match.cells[moveData.index] = moveData.symbol;
      clearTimeout(timeouts[match.id]); // Clear the existing timeout for this match

      // Determine the opponent's user ID and socket ID
      const opponent = match.players.find((p) => p.userId !== moveData.userId);
      const opponentSocketId = opponent.socketId;
      const opponentUserId = opponent.userId;

      io.to(opponentSocketId).emit("moveMade", moveData);

      if (isDraw(match.cells)) {
        match.finished = true;
        io.emit("draw");

        this.insertMatchInDatabase(
          moveData.userId,
          opponentUserId,
          null,
          match.startTime,
          match.round,
          true
        );
        return;
      }

      if (checkForWin(match.cells, moveData.symbol)) {
        match.finished = true;
        io.to(socket.id).emit("gameOver", { winner: true });
        io.to(opponentSocketId).emit("gameOver", { winner: false });

        this.insertMatchInDatabase(
          moveData.userId,
          opponentUserId,
          moveData.userId,
          match.startTime,
          match.round,
          true
        );
        return;
      }

      // Update the round and whosRound for the next move
      match.whosRound = opponentUserId;
      match.round += 1;

      this.setTimer(io, match, opponentUserId, moveData.userId);
    }
  },
  async insertMatchInDatabase(
    winnerId,
    loserId,
    winner,
    startTime,
    totalRounds,
    wasFullMatch = false
  ) {
    try {
      const startDate = new Date(startTime);
      const query = `
      INSERT INTO matches (playerOne_id, playerTwo_id, winner, start_time, end_time, total_rounds, wasFullMatch)
      VALUES ($1, $2, $3, $4, NOW(), $5, $6)
    `;
      const values = [
        winnerId,
        loserId,
        winner,
        startDate,
        totalRounds,
        wasFullMatch,
      ];
      await global.dbPool.query(query, values);
    } catch (error) {
      console.error("Error inserting match into database:", error);
      throw error; // Or handle it as per your error handling strategy
    }
  },

  // Additional match management methods as needed
};
