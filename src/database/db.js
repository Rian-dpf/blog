const Sequelize = require("sequelize");

const connection = new Sequelize("blog_curso", "rian-dpf", "rian080920022019", {
  host: "mysql741.umbler.com",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
