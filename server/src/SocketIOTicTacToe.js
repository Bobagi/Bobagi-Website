let playerPairs = {}; // Object to store player and opponent pairs

module.exports = function (io) {
  console.log("Socket.io server initialized");

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("findMatch", (data) => {
      if (!playerPairs[socket.id]) {
        // Look for an available player
        for (let [id, opponentId] of Object.entries(playerPairs)) {
          if (!opponentId) {
            // Pair the current player with the waiting player
            playerPairs[id] = socket.id;
            playerPairs[socket.id] = id;

            if (io.sockets.sockets.get(id)) {
              // Notify both players
              io.to(id).emit("matchFound", data.username); // Opponent's username
              socket.emit("matchFound", io.sockets.sockets.get(id).username); // Waiting player's username
              startGame(io, socket.id, id);
            }

            return; // Exit after matching
          }
        }

        // If no available players, set this player as waiting
        playerPairs[socket.id] = null;
        socket.username = data.username; // Store the username with the socket
      }
    });

    socket.on("makeMove", (move) => {
      const opponentId = playerPairs[socket.id];
      if (opponentId) {
        io.to(opponentId).emit("moveMade", move);
        socket.emit("moveMade", move);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);

      if (playerPairs[socket.id]) {
        const opponentId = playerPairs[socket.id];
        if (opponentId) {
          io.to(opponentId).emit("opponentDisconnected");
        }
        delete playerPairs[socket.id]; // Clean up the pairing
        delete playerPairs[opponentId]; // Clean up the opponent pairing
      }
    });

    // More Socket.io event handling here
  });
};

function startGame(io, playerOneId, playerTwoId) {
  const playerOne = io.sockets.sockets.get(playerOneId);
  const playerTwo = io.sockets.sockets.get(playerTwoId);

  if (playerOne && playerTwo) {
    playerPairs[playerOneId] = playerTwoId;
    playerPairs[playerTwoId] = playerOneId;

    playerOne.emit("gameStart", "X");
    playerTwo.emit("gameStart", "O");
  }
}
