const queries = require("../db/queries");

async function showGames(req, res) {
  const games = await queries.showGamesJoined();
  console.log(games);
  res.render("gamespage", { games: games });
}

module.exports = { showGames };
