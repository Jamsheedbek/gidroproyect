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
        newProject.dataValues.fileName
      );

      fs.writeFile(uploadPath, file.data, (err) => {
        if (err) {
          return res.redirect("/direksiya/admin");
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
      const { id } = req.body;

      const Project = await Projects.findOne({ where: { id } });

      const Path = path.resolve(
        "./src/uploads/assets/projects",
        Project.dataValues.fileName
      );
      fs.unlink(Path, function (err) {
        if (err) return res.redirect("/direksiya/admin/get/projects");
      });

      await Projects.destroy({ where: { id } });

      res.redirect("direksiya/admin/get/projects");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/projects");
    }
  },
  editProject: async (req, res) => {
    try {
      const { ud, name, content, type } = req.body;
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
        newProject.dataValues.fileName
      );

      fs.writeFile(uploadPath, file.data, (err) => {
        if (err) {
          return res.redirect("/direksiya/admin");
        }
      });

      res.redirect("/direksiya/admin/get/projects");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/create/project");
    }
  },
};
