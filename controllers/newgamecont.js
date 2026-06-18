const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");
let errors = null;
let valErrors = null;
const addGameValidator = [
  body("game")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("The game has to be between 1 and 50 characters!"),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price can't be empty "),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty() === false) {
      valErrors = validationErrors.array();
      return res.redirect("/new/game");
    }
    const newGame = req.body.game;
    const newPice = req.body.price;
    const newGenre = req.body.genre;
    const games = await queries.getAllGames();
    for (game of games) {
      if (game.title === newGame) {
        errors = newGame;
        return res.redirect("/new/game");
      }
    }
    const genreId = await queries.getGenreId(newGenre);
    await queries.addGame(newGame, newPice, genreId);
    res.redirect("/");
  },
];

async function addGame(req, res) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty() === false) {
    valErrors = validationErrors.array();
    return res.redirect("/new/game");
  }
  const newGame = req.body.game;
  const newPice = req.body.price;
  const newGenre = req.body.genre;
  const games = await queries.getAllGames();
  for (game of games) {
    if (game.name === newGame) {
      errors = newGame;
      return res.redirect("/new/game");
    }
  }
  const genreId = await queries.getGenreId(newGenre);
  await queries.addGame(newGame, newPice, genreId);
  res.redirect("/");
}
async function showPage(req, res) {
  const genres = await queries.getAllGenres();
  let newArr = [];
  for (genre of genres) {
    newArr.push(genre.title);
  }
  if (valErrors !== null) {
    console.log("valerrors");
    res.render("addgame", {
      genres: newArr,
      errors: null,
      valError: valErrors,
    });
    valErrors = null;
    return;
  }
  console.log("non-valerrors");
  if (errors !== null) {
    res.render("addgame", { genres: newArr, errors: errors, valError: null });
    errors = null;
    return;
  }
  errors = null;
  res.render("addgame", { genres: newArr, errors: null, valError: null });
}
module.exports = { addGame, showPage, addGameValidator };
