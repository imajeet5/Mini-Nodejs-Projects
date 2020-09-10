const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

const validInfo = require("../middleware/validinfo");

const verify_jwt = require("../middleware/verify_jwt");

// registering

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM get_user($1)", [email]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query("SELECT * FROM create_user($1, $2, $3)", [
      name,
      email,
      hashedPassword,
    ]);

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Server error");
  }
});

// login router

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM get_user($1)", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", verify_jwt, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
