const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

//Controllers
const newsController = require("../controllers/news.controller");

let routes = (app) => {
  router
    // news
    .post("/news", upload.single("file"), newsController.createNews)
    .get("/news", newsController.getNews);

  app.use("/api", router);
};

module.exports = routes;
