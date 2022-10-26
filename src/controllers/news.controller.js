const { News } = require("../models");
const fs = require("fs");
const path = require("path");

module.exports = {
  createNews: async (req, res) => {
    try {
      const { title, text } = req.body;

      const image = req.files.file;
      const fileName = image.name;
      const news = await News.create({
        title,
        text,
        fileName,
      });
      const uploadPath = path.resolve("./src/uploads/assets/news", fileName);

      fs.writeFile(uploadPath, image.data, (err) => {
        console.log(err);
      });

      res.redirect("/direksiya/admin");
    } catch (err) {
      console.log(err);
    }
  },
  editNews: async (req, res) => {
    try {
      const { id, text, title } = req.body;

      if ((text, title)) {
        await News.update(
          { title, text },
          {
            where: { id },
          }
        );

        res.redirect("/direksiya/admin");
      }
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

      res.redirect("/direksiya/admin");
    } catch (err) {
      console.log(err);
    }
  },
};
