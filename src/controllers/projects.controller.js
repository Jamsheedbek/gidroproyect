const { Projects } = require("../models");
const fs = require("fs");
const handleProjects = require("../util/handleProjects");

module.exports = {
  createProject: async (req, res) => {
    try {
      const { name } = req.body;
      const file = req.files.file;
      const formatFile = file.name.split(".")[file.name.split(".").length - 1];

      const newProject = await Projects.create({ name, formatFile });

      const uploadPath =
        __basedir +
        "/src/uploads/assets/projects/" +
        newProject.dataValues.id +
        "." +
        formatFile;

      file.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).json(newProject.dataValues);
      });
    } catch (err) {
      console.log(err);
    }
  },
  getProjects: async (req, res) => {
    try {
      const projects = await handleProjects();

      res.send(projects);
    } catch (err) {
      console.log(err);
    }
  },
  editProject: async (req, res) => {
    try {
      const { id, name } = req.body;

      if ((id, name)) {
        await Projects.update({ name }, { where: { id } });

        return res.status(201).send({
          message: "The project has been changed successfully",
        });
      }

      res.status(404).send({
        message: "The request did not include a name or id",
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id } = req.body;
      const oldProject = await Projects.findOne({ where: { id } });
      if (!oldProject)
        return res.status(404).send({ message: "Project not found" });
      const Path =
        __basedir +
        "/src/uploads/assets/projects/" +
        id +
        "." +
        oldProject.dataValues.formatFile;
      fs.unlink(Path, function (err) {
        if (err) return res.status(500).send({ message: err.message });
      });
      await Projects.destroy({ where: { id } });

      res.status(200).send({ message: "Project deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  },
  // downloadProject: async (req, res) => {
  //   try {
  //     const { fileName: id } = req.body;
  //     const oldProject = await Projects.findOne({ where: { id } });
  //     const Path = __basedir + "/src/uploads/assets/projects/";
  //     const FileName = id + "." + oldProject.dataValues.formatFile;

  //     res.download(Path, FileName, (err) => {
  //       console.log(err);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
