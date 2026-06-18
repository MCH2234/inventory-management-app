const { Router } = require("express");
const tableRouter = Router();
const queries = require("../db/queries");

tableRouter.get("/", (req, res) => {
  res.render("tables/tablesindex");
});
tableRouter.get("/games", async (req, res) => {
  const allGames = await queries.getAllGames();
  res.render("tables/games.ejs", { games: allGames });
});
tableRouter.get("/genres", async (req, res) => {
  const allGenres = await queries.getAllGenres();
  res.render("tables/genre.ejs", { genres: allGenres });
});
tableRouter.post("/games/delete/:title", async (req, res) => {
  const deleteItem = req.params.title;
  await queries.deleteGame(deleteItem);
  res.redirect("/tables/games");
});
module.exports = tableRouter;
