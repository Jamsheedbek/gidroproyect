const { News } = require("../models");
const uploadFile = require("../middleware/upload");
const fs = require("fs");

module.exports = {
  createNews: async (req, res) => {
    try {
      const { title, text, image } = req.body;

      await News.create({ title, text, image }).then((news) => {
        res.status(200).json(news.dataValues);
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getNews: async (req, res) => {
    try {
      const baseUrl = "http://localhost:9000/files/";
      const directoryPath = __basedir + "/src/uploads/assets";
      await News.findAll().then((news) => {
        const newRes = news.slice();
        fs.readdir(directoryPath, function (err, files) {
          if (err) {
            return res.status(500).send({
              message: "Unable to scan files",
            });
          }
          newRes.forEach((e) => {
            e.dataValues.imgUrl =
              baseUrl + files.find((photo) => photo == e.dataValues.image);
          });
          res.status(200).json(newRes);
        });
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};
