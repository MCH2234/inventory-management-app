const { Router } = require("express");
const mainRouter = Router();
const queries = require("../db/queries");

mainRouter.get("/", async (req, res) => {
  //await queries.deleteAll();
  //const rows = await queries.getAllGames();
  res.render("index");
});

module.exports = mainRouter;
