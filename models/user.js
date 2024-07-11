const db = require("../config/database");

exports.create = (username, password) => {
  return db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
};

exports.findByUsername = async (username) => {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};
