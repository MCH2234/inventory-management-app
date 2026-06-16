const pool = require("./pool");

async function addGame(game, price, genre) {
  await pool.query(
    "INSERT INTO games (name, price, genre) VALUES($1, $2, $3)",
    [game, price, genre],
  );
}

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function deleteAll() {
  await pool.query("DELETE FROM games;");
}

module.exports = {
  addGame,
  getAllGames,
  deleteAll,
};
