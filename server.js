const express = require("express");
const path = require("path");
const app = express();
const queries = require("./db/queries");
const mainRouter = require("./routes/main");
const newRouter = require("./routes/new");
const categoriesRouter = require("./routes/categories");
const tableRouter = require("./routes/tables");
const gamesRouter = require("./routes/games");
const process = require("process");

process.loadEnvFile();

const PORT = parseInt(process.env.PORT);

const staticPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.static(staticPath));

app.use("/", mainRouter);
app.use("/new", newRouter);
app.use("/categories", categoriesRouter);
app.use("/tables", tableRouter);
app.use("/games", gamesRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
});
