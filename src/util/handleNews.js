const { News, sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
const moment = require("moment");
moment.locale("uz");

const handleAllNews = async (id) => {
  try {
    var news = [];
    var allNews;
    if (id) {
      allNews = await sequelize.query(`SELECT * FROM news WHERE news_id = ${id}`,{
        type: QueryTypes.SELECT,
        model: News
      });
      allNews.dataValues.imgUrl =
        "/files/assets/news/" + allNews.dataValues.fileName;

      allNews.dataValues.date =
        moment(allNews.dataValues.createdAt).format("L h:mm").slice(0, 11) +
        (moment(allNews.dataValues.createdAt).format("L h:mm").slice(-5, -3) -
          0 +
          5) +
        moment(allNews.dataValues.createdAt).format("L h:mm").slice(-3);

      return allNews;
    } else {
      const allNews = await sequelize.query('SELECT * FROM news ORDER BY createdAt DESC',{
        type: QueryTypes.SELECT,
        model: News
      });
      allNews.map((e) => {
        e.dataValues.imgUrl = "/files/assets/news/" + e.dataValues.fileName;

        e.dataValues.date =
          moment(e.dataValues.createdAt).format("L h:mm").slice(0, 11) +
          (moment(e.dataValues.createdAt).format("L h:mm").slice(-5, -3) -
            0 +
            5) +
          moment(e.dataValues.createdAt).format("L h:mm").slice(-3);

        news.push(e.dataValues);
      });
    }

    return news;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleAllNews;
