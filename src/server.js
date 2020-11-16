const express = require("express");
const path = require("path");
const connection = require("./database/db");
const bodyParser = require("body-parser");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const Article = require("./articles/article");
const Category = require("./categories/category");

const app = express();

// Body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static
app.use(express.static("public"));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", categoriesController);
app.use("/", articlesController);

// Rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Rodando ");
});
