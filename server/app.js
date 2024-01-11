const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const recoveryRoutes = require("./routes/accountRecovery");
const testRoutes = require("./routes/testRoutes");

app.use(express.json());
app.use(cors());

// Use the separate route modules
app.use("/api", recoveryRoutes);
app.use("/api", testRoutes);
app.use("/api", authRoutes);
app.use("/api", mainRoutes);

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:8080", // frontend server
    methods: ["GET", "POST"],
  },
});
require("./src/SocketIOTicTacToe")(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server with Socket.io is running on port ${PORT}`);
});
