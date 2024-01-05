const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

app.use(express.json());

// Use the separate route modules
app.use("/api", authRoutes);
app.use("/api", mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
