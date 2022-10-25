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
      firstName: "Jamshidbek",
      lastName: "Odiljonov",
      password: bcrypt.hashSync("js0329", 8),
      role: "admin",
    });
  }
};

module.exports = createAdmin;
