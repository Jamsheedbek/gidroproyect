const { Projects, projectImages } = require("../models");
const fs = require("fs");
const handleProjects = require("../util/handleProjects");

module.exports = {
  createProject: async (req, res) => {
    try {
      const { name } = req.body;

      const newProject = await Projects.create({ name });

      res.redirect("/direksiya/admin");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin");
    }
  },
  editProject: async (req, res) => {
    try {
      const { id, name } = req.body;

      if ((id, name)) {
        await Projects.update({ name }, { where: { id } });

        res.redirect("/direksiya/admin");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin");
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id } = req.body;

      const Project = await Projects.findOne({
        include: projectImages,
        where: { id },
      });

      Project.images.forEach((e) => {
        const Path =
          __basedir + "/src/uploads/assets/projects/" + e.dataValues.fileName;
        fs.unlink(Path, function (err) {
          if (err) return res.redirect("/direksiya/admin");
        });
      });
      await Projects.destroy({ where: { id } });

      res.redirect("direksiya/admin");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin");
    }
  },
  addImage: async (req, res) => {
    try {
      const { id } = req.body;
      const file = req.files.file;
      const fileName = file.name;

      const newProject = await projectImages.create({
        fileName,
        projectId: id,
      });

      const uploadPath =
        __basedir +
        "/src/uploads/assets/projects/" +
        newProject.dataValues.fileName;

      file.mv(uploadPath, function (err) {
        if (err) {
          res.redirect("/direksiya/admin");
        }

        res.redirect("/direksiya/admin");
      });
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin");
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { id, fileName } = req.body;

      const Path = __basedir + "/src/uploads/assets/projects/" + fileName;
      fs.unlink(Path, function (err) {
        if (err) return res.redirect("/direksiya/admin");
      });

      await projectImages.destroy({ where: { id } });

      res.redirect("/direksiya/admin");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin");
    }
  },
};
