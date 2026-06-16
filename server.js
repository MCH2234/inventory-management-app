const express = require("express");
const path = require("path");
const app = express();
const queries = require("./db/queries");
const mainRouter = require("./routes/main");

const PORT = 4000;

const staticPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.static(staticPath));

app.use("/", mainRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
});
