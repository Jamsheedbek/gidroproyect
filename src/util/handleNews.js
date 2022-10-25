const { News } = require("../models");
const moment = require("moment");

const handleAllNews = async () => {
  try {
    const allNews = await News.findAll();

    const news = [];
    allNews.map((e) => {
      e.dataValues.imgUrl = "/files/assets/news/" + e.dataValues.fileName;

      e.dataValues.createdAt = moment()
        .format(e.dataValues.createdAt.toString())
        .slice(5, 16);

      news.push(e.dataValues);
    });

    return news;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleAllNews;
