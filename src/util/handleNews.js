const { News } = require("../models");
const moment = require("moment");
moment.locale("uz");

const handleAllNews = async (id) => {
  try {
    var news = [];
    var allNews;
    if (id) {
      allNews = await News.findOne({ where: { id } });
      allNews.dataValues.imgUrl =
        "/files/assets/news/" + allNews.dataValues.fileName;

      allNews.dataValues.date = moment(allNews.dataValues.createdAt).format(
        "L h:mm:ss"
      );

      return allNews;
    } else {
      const allNews = await News.findAll({ order: [["updatedAt", "DESC"]] });
      allNews.map((e) => {
        e.dataValues.imgUrl = "/files/assets/news/" + e.dataValues.fileName;

        e.dataValues.date = moment(e.dataValues.createdAt).format("L h:mm:ss");

        news.push(e.dataValues);
      });
    }

    return news;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleAllNews;
