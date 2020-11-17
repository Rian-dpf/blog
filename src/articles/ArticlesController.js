const express = require("express");
const router = express.Router();
const Category = require("../categories/category");
const Article = require("./article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  Article.findAll({ include: [{ model: Category }] }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

router.post("/articles/save", (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", (req, res) => {
  const id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", (req, res) => {
  let id = req.params.id;

  Article.findByPk(id)
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("admin/articles/edit", {
            categories: categories,
            article: article,
          });
        });
      } else {
        res.render("/");
      }
    })
    .catch((err) => {
      res.render("/");
    });
});

router.post("/articles/update", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let body = req.body.body;
  let category = req.body.category;

  Article.update(
    {
      title: title,
      body: body,
      categoryId: category,
      slug: slugify(title),
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
  let page = req.params.num;

  Article.findAndCountAll({
    limit: 4,
    offset: 0,
  }).then((articles) => {
    res.json(articles);
  });
});

module.exports = router;
