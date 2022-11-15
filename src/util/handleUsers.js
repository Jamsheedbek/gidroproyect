const { Users, Works } = require("../models");
const fs = require("fs");

const handleAllUsers = async (id) => {
  var allUsers;
  if (id) {
    allUsers = await Users.findOne({
      include: Works,
      where: {
        id: id,
      },
    });
  } else {
    allUsers = await Users.findAll();
  }

  return allUsers;
};

module.exports = handleAllUsers;
