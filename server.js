const express = require("express");
const path = require("path");
const newsController = require("./src/controllers/news.controller");
const PORT = process.env.PORT || 9000;
const app = express();
const { sequelize } = require("./src/models");
const initialRoutes = require("./src/routes");

global.__basedir = __dirname;

app.use(express.static(path.resolve(__dirname, "./client")));
app.use(express.json());
initialRoutes(app);

app.get("/");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Drop end Resync db");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
