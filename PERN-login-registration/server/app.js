const express = require("express");
const app = express();
const { pool } = require("./db");
const cors = require("cors");

app.use(express.json());

app.use("*", (req, res) => {
  console.log("new request at: ", new Date());
  req.next();
});

app.use(cors());

// Routes

// register and login router

app.use("/auth", require("./routers/auth"));

app.use("/dashboard", require("./routers/dashboard"));

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(9000, () => {
  console.log("Server is listening on port 9000");
});

/**
 * 
 *  const result = await executeQuery(
    "INSERT INTO todos (description) VALUES ($1) RETURNING *",
    [description]
  );
 */
