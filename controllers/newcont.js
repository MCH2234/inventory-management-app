const queries = require("../db/queries");
const { body, matchedData, validationResult } = require("express-validator");
let errors = null;

async function addGenre(req, res) {
  const newgenre = req.body.genre;
  const genres = await queries.getAllGenres();
  for (genre of genres) {
    if (genre.title === newgenre) {
      errors = newgenre;
      return res.redirect("/new/category");
    }
  }
  errors = validationResult(req);
  if (errors.isEmpty() === false) {
    return res.render("addcategory", { inDB: false, errors: errors.array() });
  }
  errors = null;
  await queries.addGenre(newgenre);
  res.redirect("/");
}

let addGenreChaining = [
  body("genre")
    .isAlpha()
    .withMessage("Genre can't contain numbers and special character")
    .isLength({ min: 3, max: 15 })
    .withMessage("Genre has to be between 3 and 15 characters"),
  async (req, res) => {
    const newgenre = req.body.genre;
    const genres = await queries.getAllGenres();
    for (genre of genres) {
      if (genre.title === newgenre) {
        errors = newgenre;
        return res.redirect("/new/category");
      }
    }
    let valErrors = validationResult(req);
    if (valErrors.isEmpty() === false) {
      errors = valErrors.array();
      return res.redirect("/new/category");
    }
    errors = null;
    await queries.addGenre(newgenre);
    res.redirect("/");
  },
];
function showPage(req, res) {
  if (errors === null) {
    return res.render("addcategory", { inDB: false, errors: null });
  } else if (Array.isArray(errors) === true) {
    res.render("addcategory", { inDB: false, errors: errors });
    errors = null;
    return;
  }
  res.render("addcategory", { inDB: true, name: errors, errors: null });
  errors = null;
}
module.exports = { addGenre, showPage, addGenreChaining };
