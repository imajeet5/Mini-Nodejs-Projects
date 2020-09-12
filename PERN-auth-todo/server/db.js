const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: process.env.db_password,
  host: "localhost",
  port: "5432",
  database: "node-todo-auth-combine",
});



module.exports = { pool };
