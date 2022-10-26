const { Users } = require("../models");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  const admin = await Users.findOne({
    where: {
      role: "admin",
    },
  });
  if (!admin) {
    await Users.create({
      firstName: "bekzod",
      password: bcrypt.hashSync("Beggi19961002", 8),
      role: "admin",
    });
  }
};

module.exports = createAdmin;
