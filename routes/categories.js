const { Router } = require("express");
const controllers = require("../controllers/categoriescont");
const categoriesRouter = Router();

categoriesRouter.get("/", controllers.getCategories);
categoriesRouter.get("/:category", controllers.gamesOfGenre);

module.exports = categoriesRouter;
