const { Projects, sequelize } = require("../models");
const { QueryTypes } = require('sequelize');

const handleProjects = async (id) => {
  try {
    var newRes = [];
    var allProjects;
    if (id) {
      allProjects = await sequelize.query(`SELECT * FROM projects WHERE project_id = ${id}`, {
        type: QueryTypes.SELECT,
        model: Projects
      });

      allProjects.imgUrl =
        "/files/assets/projects/" + allProjects.dataValues.fileName;

      return allProjects;
    }

    allProjects = await sequelize.query('SELECT * FROM projects ORDER BY createdAt DESC', {
      type: QueryTypes.SELECT,
      model: Projects
    });

    console.log(allProjects);

    allProjects.forEach((e) => {
      e.dataValues.imgUrl = "/files/assets/projects/" + e.dataValues.fileName;
      newRes.push(e.dataValues);
    });

    return newRes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleProjects;
