const matchManager = require("./matchManager");
let playerQueue = {};

module.exports = {
  getPlayerQueue() {
    return playerQueue;
  },
  addPlayerToQueue(io, userData, socket) {
    const { userId } = userData;
    if (!playerQueue[userId]) {
      playerQueue[userId] = {
        socketId: socket.id,
        ...userData,
      };
      console.log(`User ${userId} added to the queue`);
    } else {
      console.log(`User ${userId} is already in the queue`);
    }

    const match = this.tryToStartMatch(io);
    if (match.matchId == 0) {
      return {
        matchId: 0,
        playerOne: null,
        playerTwo: null,
      };
    } else {
      return match;
    }
  },

  removePlayerFromQueue(socketId) {
    for (let userId in playerQueue) {
      if (playerQueue[userId].socketId === socketId) {
        delete playerQueue[userId];
        console.log(`User ${userId} removed from the queue`);
        break;
      }
    }
  },

  tryToStartMatch(io) {
    const userIds = Object.keys(playerQueue);

    if (userIds.length >= 2) {
      const playerOneUserId = userIds[0];
      const playerTwoUserId = userIds[1];
      const playerOne = playerQueue[playerOneUserId];
      const playerTwo = playerQueue[playerTwoUserId];

      delete playerQueue[playerOneUserId];
      delete playerQueue[playerTwoUserId];

      return {
        matchId: matchManager.startMatch(io, playerOne, playerTwo),
        playerOne: playerOne,
        playerTwo: playerTwo,
      };
    }
    return 0;
  },
};
