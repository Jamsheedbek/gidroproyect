const { Projects, projectImages } = require("../models");

const handleProjects = async (id) => {
  try {
    var newRes = [];
    var allProjects;
    if (id) {
      allProjects = await Projects.findOne({ where: { project_id: id }, attributes: [
        'project_id','name','type', 'fileName', 'content'
      ] });

      allProjects.imgUrl =
        "/files/assets/projects/" + allProjects.dataValues.fileName;

      return allProjects;
    }

    allProjects = await Projects.findAll({ order: [["createdAt", "DESC"]], attributes: [
      'project_id','name','type', 'fileName', 'content'
    ]});

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
