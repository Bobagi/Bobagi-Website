const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const socketHandler = require("./src/TicTacToe/socketHandler");
const app = express();
require("dotenv").config();

const pool = require("./src/db.js");
global.dbPool = pool;

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const recoveryRoutes = require("./routes/accountRecovery");
const testRoutes = require("./routes/testRoutes");
const tictactoeRoutes = require("./routes/tictactoeRoutes");
const goldrushRoutes = require("./routes/goldrushRoutes");
const cryptoAlert = require("./routes/cryptoAlert");

const debugTic = false;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use the separate route modules
app.use("/api/cryptoAlert", cryptoAlert);
app.use("/api/goldrush", goldrushRoutes);
app.use("/api/tictactoe", tictactoeRoutes);
app.use("/api", recoveryRoutes);
app.use("/api", testRoutes);
app.use("/api", authRoutes);
app.use("/api", mainRoutes);

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CORS_ORIGIN, // frontend server
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server with Socket.io is running on port ${PORT}`);
});

if (debugTic) {
  const queueManager = require("./src/TicTacToe/queueManager");
  const matchManager = require("./src/TicTacToe/matchManager.js");

  function logStatus() {
    const playerQueueStatus = queueManager.getPlayerQueue();
    const activeMatchesStatus = matchManager.getActiveMatches();

    console.log(`Current Player Queue: ${JSON.stringify(playerQueueStatus)}`);
    console.log(
      `Current Active Matches: ${JSON.stringify(activeMatchesStatus)}`
    );
    console.log("");
  }

  setInterval(logStatus, 3000);
}
