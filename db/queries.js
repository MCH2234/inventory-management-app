const pool = require("./pool");

async function addGame(game, price, genre) {
  await pool.query(
    "INSERT INTO games (name, price, genre_id) VALUES($1, $2, $3)",
    [game, price, genre],
  );
}

async function getGenreId(genre) {
  const { rows } = await pool.query("SELECT id FROM genre WHERE title = $1", [
    genre,
  ]);
  return rows[0].id;
}

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function addGenre(genre) {
  await pool.query("INSERT INTO genre (title) VALUES($1)", [genre]);
}
async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}
async function deleteAll() {
  await pool.query("DELETE FROM games;");
}
async function deleteGame(game) {
  await pool.query("DELETE FROM games WHERE name=$1", [game]);
}

async function showGamesJoined() {
  const { rows } = await pool.query(
    "SELECT games.name, genre.title, games.price FROM games JOIN genre ON games.genre_id=genre.id",
  );
  return rows;
}
async function showGamesOfGenre(genre) {
  const games = await showGamesJoined();
  let allGames = [];
  for (game of games) {
    if (game.title == genre) {
      allGames.push(game);
    }
  }
  return allGames;
}

module.exports = {
  addGame,
  getAllGames,
  addGenre,
  getAllGenres,
  deleteAll,
  getGenreId,
  deleteGame,
  showGamesJoined,
  showGamesOfGenre,
};
