const { Router } = require("express");
const category = require("../controllers/newcont");
const game = require("../controllers/newgamecont");
const newRouter = Router();

newRouter.get("/category", category.showPage);
newRouter.post("/category", category.addGenreChaining);

newRouter.get("/game", game.showPage);
newRouter.post("/game", game.addGameValidator);

module.exports = newRouter;
