const { Projects } = require("../models");

const handleProjects = async () => {
  const allProjects = await Projects.findAll();
  const newRes = [];

  allProjects.forEach((e) => {
    e.dataValues.imgUrl =
      "/files/assets/projects/" +
      e.dataValues.id +
      "." +
      e.dataValues.formatFile;

    newRes.push(e.dataValues);
  });

  return newRes;
};

module.exports = handleProjects;
