const queries = require("../db/queries");
const getCategories = async (req, res) => {
  let newArr = [];
  const allGenres = await queries.getAllGenres();
  for (genre of allGenres) {
    newArr.push(genre.title);
  }
  res.render("categoriespage", { genres: newArr });
};
const gamesOfGenre = async (req, res) => {
  const games = await queries.showGamesOfGenre(req.params.category);
  console.log(games);
  res.render("category", { genre: req.params.category, games: games });
};

module.exports = {
  getCategories,
  gamesOfGenre,
};
