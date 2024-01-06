const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

app.use(express.json());

app.use(cors());

// Use the separate route modules
app.use("/api", authRoutes);
app.use("/api", mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
