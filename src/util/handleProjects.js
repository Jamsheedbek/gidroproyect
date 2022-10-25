const { Projects, projectImages } = require("../models");

const handleProjects = async () => {
  try {
    const allProjects = await Projects.findAll({ include: projectImages });
    var newRes = {
      projects: [],
      images: [],
    };

    allProjects.forEach((e) => {
      if (e.dataValues.images.length > 0) {
        e.dataValues.url =
          "/files/assets/projects/" +
          e.dataValues.images[0].dataValues.fileName;
        newRes.projects.push(e.dataValues);
        e.dataValues.images.forEach((image) => {
          newRes.images.push({
            name: e.dataValues.name,
            imgUrl: "/files/assets/projects/" + image.dataValues.fileName,
            id: image.dataValues.id,
            fileName: image.dataValues.fileName,
          });
        });
      } else {
        newRes.projects.push(e.dataValues);
      }
    });

    return newRes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleProjects;
