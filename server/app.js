const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/register", (req, res) => {
  // Handle registration logic here
  res.send("Registration endpoint");
});

app.get("/login", (req, res) => {
  // Handle login logic here
  res.send("Login endpoint");
});
