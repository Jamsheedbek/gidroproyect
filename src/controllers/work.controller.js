const { Projects, Works } = require("../models");
const fs = require("fs");
const path = require("path");
const handleWorks = require("../util/handleWorks");

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
    }
  },
  deleteWork: async (req, res) => {
    try {
      const { id } = req.body;
      const oldWork = await Works.findOne({ where: { id } });
      if (!oldWork) return console.log("Project not found");
      const Path = __basedir + "/src/works/" + oldWork.dataValues.fileName;
      fs.unlink(Path, function (err) {
        if (err) return console.log(err.message);
      });
      await Projects.destroy({ where: { id } });

      res.redirect("/direksiya/admin");
    } catch (err) {
      console.log(err);
    }
  },
  downloadWork: async (req, res) => {
    try {
      const fileName = req.params.name;
      const Path = __basedir + "/src/works/";

      res.download(Path + fileName, fileName, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
