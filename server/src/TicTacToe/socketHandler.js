const queueManager = require("./queueManager");
const matchManager = require("./matchManager");
let socketToMatchId = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("requestStatus", () => {
      const status = {
        playerQueue: Object.keys(queueManager.getPlayerQueue()),
        activeMatches: Object.keys(matchManager.getActiveMatches()),
      };
      socket.emit("statusUpdate", status);
    });

    socket.on("disconnect", () => {
      queueManager.removePlayerFromQueue(socket.id);

      const matchId = socketToMatchId[socket.id];
      if (matchId) {
        console.log("Player was in a match: " + matchId);
        // Handle player disconnection in the match
        matchManager.handlePlayerDisconnect(io, matchId, socket.id);
        delete socketToMatchId[socket.id]; // Clean up the mapping
      }
    });

    socket.on("joinQueue", (userData) => {
      const match = queueManager.addPlayerToQueue(io, userData, socket);

      if (match.matchId > 0) {
        socketToMatchId[match.playerOne.socketId] = match.matchId;
        socketToMatchId[match.playerTwo.socketId] = match.matchId;
      }
    });

    socket.on("makeMove", (moveData) => {
      matchManager.handleMove(io, socket, moveData);
    });
  });
};
