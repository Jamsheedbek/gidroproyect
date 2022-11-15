const { Projects, Works } = require("../models");
const fs = require("fs");
const path = require("path");

module.exports = {
  uploadWork: async (req, res) => {
    try {
      const { userId, title } = req.body;
      const file = req.files.file;

      const fileName = file.name;

      const newWork = await Works.create({ userId, title, fileName });

      fs.writeFile(path.resolve("./src/works", fileName), file.data, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.redirect("/direksiya/users");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/users");
    }
  },
  deleteWork: async (req, res) => {
    try {
      const { id } = req.body;
      const oldWork = await Works.findOne({ where: { id } });
      const Path = __basedir + "/src/works/" + oldWork.dataValues.fileName;

      fs.readFile(`./src/works/${oldWork.dataValues.fileName}`, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          fs.unlink(Path, function (err) {
            if (err) return console.log(err.message);
          });
        }
      });

      await Works.destroy({ where: { id } });

      res.redirect("/direksiya/admin/get/works");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/works");
    }
  },
  downloadWork: async (req, res) => {
    try {
      const fileName = req.params.name;
      const Path = path.resolve("./src/works", fileName);

      res.download(Path, fileName, (err) => {
        if (err) {
          console.log(err);
          res.redirect("/direksiya/admin/get/works");
        }
        res.redirect("/direksiya/admin/get/works");
      });
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/works");
    }
  },
};
