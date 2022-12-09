const { Projects, projectImages } = require("../models");

const handleProjects = async (id) => {
  try {
    var newRes = [];
    var allProjects;
    if (id) {
      allProjects = await sequelize.query(`SELECT * FROM projects WHERE project_id = ${id}`);

      allProjects.imgUrl =
        "/files/assets/projects/" + allProjects.dataValues.fileName;

      return allProjects;
    }

    allProjects = await sequelize.query('SELECT * FROM projects ORDER BY createdAt DESC');

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
