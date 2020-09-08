const express = require("express");
const app = express();
const { pool, executeQuery } = require("./db");

app.use(express.json());

app.use("*", (req, res) => {
  console.log("new request at: ", new Date());
  req.next();
});

// Routes

// get all todos

app.get("/todos", async (req, res) => {
  const { rows } = await pool.query("select * from get_all_todo()");

  res.status(200).send(rows);
});

// get a todo

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`select * from get_a_todo(${id})`);

  res.status(200).send(rows);
});

// create a todo

app.post("/todos", async (req, res) => {
  const { description } = req.body;

  const { rows } = await pool.query(
    `select * from insert_todo('${description}')`
  );

  res.status(200).send(rows);
});

// update a todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { rows } = await pool.query(
    `select * from update_todo(${id}, '${description}')`
  );

  res.status(200).send(rows);
});

// delete a todo

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`select * from delete_a_todo(${id})`);
  res.status(200).send(rows);
});

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

/**
 * 
 *  const result = await executeQuery(
    "INSERT INTO todos (description) VALUES ($1) RETURNING *",
    [description]
  );
 */
