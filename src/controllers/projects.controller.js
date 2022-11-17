const { Projects, projectImages } = require("../models");
const fs = require("fs");
const path = require("path");

module.exports = {
  createProject: async (req, res) => {
    try {
      const { name, content, type } = req.body;
      const file = req.files.file;
      const fileName = file.name;

      const newProject = await Projects.create({
        name,
        content,
        fileName,
        type,
      });

      const uploadPath = path.resolve(
        "./src/uploads/assets/projects",
        fileName
      );

      fs.writeFile(uploadPath, file.data, (err) => {
        if (err) {
          return res.redirect("/direksiya/admin/create/project");
        }
      });

      res.redirect("/direksiya/admin/create/project");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/create/project");
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id, fileName } = req.body;

      const Path = path.resolve("./src/uploads/assets/projects", fileName);

      const files = await Projects.findAll({ where: { fileName: fileName } });

      if (files.length <= 1) {
        fs.readFile(Path, async (err, data) => {
          if (err) {
            console.log(err.message);
          }
          if (data) {
            fs.unlink(Path, function (err) {
              if (err) return res.redirect("/direksiya/admin/get/projects");
            });
          }
        });
      }

      await Projects.destroy({ where: { id } });

      res.redirect("direksiya/admin/get/projects");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/projects");
    }
  },
  editProject: async (req, res) => {
    try {
      const { id, name, content, type } = req.body;

      const image = req.files;

      const oldProject = await Projects.findOne({ where: { id } });

      if (image) {
        const fileName = image.file.name;
        fs.unlink(
          path.resolve(
            "./src/uploads/assets/projects",
            oldProject.dataValues.fileName
          ),
          function (err) {
            if (err) return console.log(err);
          }
        );

        let project = await Projects.update(
          {
            name,
            content,
            fileName,
            type,
          },
          {
            where: {
              id,
            },
          }
        );

        const uploadPath = path.resolve(
          "./src/uploads/assets/projects",
          fileName
        );

        fs.writeFile(uploadPath, image.file.data, (err) => {
          console.log(err);
        });
      } else {
        let project = await Projects.update(
          {
            name,
            content,
            fileName: oldNews.dataValues.fileName,
            type,
          },
          {
            where: {
              id,
            },
          }
        );
      }

      res.redirect("/direksiya/admin/get/projects");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/projects");
    }
  },
};
