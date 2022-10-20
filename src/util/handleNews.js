const { News } = require("../models");
const fs = require("fs");

const handleAllNews = async () => {
  const allNews = await News.findAll();

  const news = [];
  allNews.map((e) => {
    e.dataValues.imgUrl = "/files/assets/news/" + e.dataValues.fileName;

    news.push(e.dataValues);
  });

  return news;
};

module.exports = handleAllNews;
