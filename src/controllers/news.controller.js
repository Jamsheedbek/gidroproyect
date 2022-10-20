const { News } = require("../models");
const fs = require("fs");

module.exports = {
  createNews: async (req, res) => {
    try {
      const { title, text } = req.body;

      const image = req.files.file;
      console.log(image);
      const fileName = image.name;
      await News.create({
        title,
        text,
        fileName,
      }).then((news) => {
        const uploadPath = __basedir + "/src/uploads/assets/news/" + fileName;

        image.mv(uploadPath, function (err) {
          if (err) {
            return console.log(err);
          }

          res.redirect("/direksiya/admin");
        });
      });
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
      const Path = __basedir + "/src/uploads/assets/news/" + fileName;
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
