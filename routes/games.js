const { Router } = require("express");
const gamesRouter = Router();
const controller = require("../controllers/gamescontroller");

gamesRouter.get("/", controller.showGames);

module.exports = gamesRouter;
