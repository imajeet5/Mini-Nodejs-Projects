const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "singh7890",
  host: "localhost",
  port: "5432",
  database: "text-search-db",
});

module.exports = pool;
