const { News } = require("../models");
const moment = require("moment");

const handleAllNews = async (id) => {
  try {
    var news = [];
    var allNews;
    if (id) {
      allNews = await News.findOne({ where: { id } });
      allNews.dataValues.imgUrl =
        "/files/assets/news/" + allNews.dataValues.fileName;

      allNews.dataValues.createdAt = moment()
        .format(allNews.dataValues.createdAt.toString())
        .slice(4, 16);

      return allNews;
    } else {
      const allNews = await News.findAll();
      allNews.map((e) => {
        e.dataValues.imgUrl = "/files/assets/news/" + e.dataValues.fileName;

        e.dataValues.createdAt = moment()
          .format(e.dataValues.createdAt.toString())
          .slice(4, 16);

        news.push(e.dataValues);
      });
    }

    return news;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleAllNews;
