let activeMatches = {};
let currentMatchId = 0;

function generateMatchId() {
  return ++currentMatchId; // Increment and return the new match ID
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
      // ... other match properties ...
    };

    console.log(
      `Starting match between ${playerOne.userId} - ${playerOne.username} and ${playerTwo.userId} - ${playerTwo.username}`
    );

    activeMatches[matchId] = match;

    io.to(playerOne.socketId).emit("matchStart", {
      matchId,
      opponent: playerTwo.userId,
      opponentUsername: playerTwo.username,
      symbol: "X",
    });
    io.to(playerTwo.socketId).emit("matchStart", {
      matchId,
      opponent: playerOne.userId,
      opponentUsername: playerOne.username,
      symbol: "O",
    });
    return matchId;
  },

  handlePlayerDisconnect(io, matchId, socketId) {
    const match = activeMatches[matchId];
    if (!match) {
      console.log(`No active match found for matchId: ${matchId}`);
      return;
    }

    // Identify the opponent's socket ID
    const opponentSocketId = match.players.find(
      (player) => player.socketId !== socketId
    )?.socketId;
    if (opponentSocketId) {
      io.to(opponentSocketId).emit("opponentDisconnected");
    }

    // Clean up the match
    delete activeMatches[matchId];
    console.log(`Match ${matchId} ended due to player disconnection.`);
  },

  // Additional match management methods as needed
};
