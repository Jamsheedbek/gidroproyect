const { News } = require("../models");
const fs = require("fs");
const path = require("path");

module.exports = {
  createNews: async (req, res) => {
    try {
      const { title, content, type } = req.body;

      const image = req.files.file;
      const fileName = image.name;
      const news = await News.create({
        title,
        content,
        fileName,
        type,
      });
      const uploadPath = path.resolve("./src/uploads/assets/news", fileName);

      fs.writeFile(uploadPath, image.data, (err) => {
        console.log(err);
      });

      res.redirect("/direksiya/admin/create/news");
    } catch (err) {
      console.log(err);
    }
  },
  deleteNews: async (req, res) => {
    try {
      const { id, fileName } = req.body;
      const Path = path.resolve("./src/uploads/assets/news", fileName);
      fs.unlink(Path, function (err) {
        if (err) return console.log(err);
      });
      await News.destroy({ where: { id } });

      res.redirect("/direksiya/admin/get/news");
    } catch (err) {
      console.log(err);
    }
  },
};
