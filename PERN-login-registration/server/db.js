const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: process.env.db_password,
  host: "localhost",
  port: "5432",
  database: "pern-authentication-app",
});



module.exports = { pool };
