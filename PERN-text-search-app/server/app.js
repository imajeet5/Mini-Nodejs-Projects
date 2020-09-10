const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use("*", (req, res) => {
    console.log("new request at: ", new Date());
    req.next();
  });

//middleware
app.use(cors());

//Routes

//params => http://localhost:5000/:id => req.params
//query parameter => http://localhost:5000/?name=ajeet = req.query

app.get("/users", async (req, res) => {
  try {
    const { name } = req.query;

    //first_name last_name => %{}%
    //"ajeet => %ly%
    // || => OR SQL || => Concat

    const users = await pool.query("SELECT * FROM get_users($1)", [name]);

    //Below code is vulnerable to SQL injection)

    // const users = await pool.query(
    //   `SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE '% ${name}%'`
    // );

    //

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(9000, () => {
  console.log("Server is starting on port 9000");
});
