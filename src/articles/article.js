const Sequelize = require("sequelize");
const connection = require("../database/db");
const Category = require("../categories/category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article); // Uma categoria tem muitos artigos
Article.belongsTo(Category); // Um artigo pertence a uma categoria

// Article.sync({ force: true });

module.exports = Article;
