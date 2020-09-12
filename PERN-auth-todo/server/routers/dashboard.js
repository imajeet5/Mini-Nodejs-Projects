const router = require("express").Router();
const verify_jwt = require("../middleware/verify_jwt");
const { pool } = require("../db");

// all todos and name
router.get("/", verify_jwt, async (req, res) => {
  try {
    console.log(req.user);
    const user = await pool.query("SELECT * FROM get_user_todos($1)", [
      req.user,
    ]);

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo

router.post("/todos", verify_jwt, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("SELECT * FROM create_todo($1, $2 )", [
      req.user,
      description,
    ]);

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo

router.put("/todos/:id", verify_jwt, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "SELECT * FROM update_todo($1, $2, $3)",
      [description, id, req.user]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo

router.delete("/todos/:id", verify_jwt, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("SELECT * FROM delete_a_todo($1, $2)", [
      id,
      req.user,
    ]);

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
