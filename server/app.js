const express = require("express");
const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

apiRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

apiRouter.get("/register", (req, res) => {
  // Handle registration logic here
  res.send("Registration endpoint");
});

apiRouter.get("/login", (req, res) => {
  // Handle login logic here
  res.send("Login endpoint");
});
