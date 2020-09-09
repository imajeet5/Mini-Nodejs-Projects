const router = require("express").Router();
const verify_jwt = require("../middleware/verify_jwt");
const { pool } = require("../db");

router.post("/", verify_jwt, async (req, res) => {
  try {
      console.log(req.user);
    const user = await pool.query("SELECT * FROM get_user(u_id:= $1)", [req.user]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
