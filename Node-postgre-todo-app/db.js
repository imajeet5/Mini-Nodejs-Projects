const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "yourPassword",
  host: "localhost",
  port: "5432",
  database: "node-todo-app",
});

const executeQuery = async (query, [...rest]) => {
  try {
    const result = await pool.query(query, [...rest]);
    return result;
  } catch (error) {
    console.log(error.message);
    return 0
  }
};

module.exports = { pool, executeQuery };
