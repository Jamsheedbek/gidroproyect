const { Works, Users } = require("../models");

const handleWorks = async (id) => {
  var allWorks;
  if (id) {
    allWorks = await Works.findAll({
      include: Users,
      where: {
        userId: id,
      },
    });
  } else {
    allWorks = await Works.findAll({
      include: Users,
    });
  }
  const newRes = [];

  allWorks.forEach((e) => {
    e.dataValues.url =
      "https://uzhydroenergy.uz/download/" + e.dataValues.fileName;

    newRes.push(e.dataValues);
  });

  console.log(newRes);

  return newRes;
};

module.exports = handleWorks;
