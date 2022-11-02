const { Users } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, password } = req.body;

      const newUser = await Users.create({
        firstName,
        lastName,
        password: bcrypt.hashSync(password, 8),
      });

      res.redirect("/direksiya/admin/get/users");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/users");
    }
  },
  editUser: async (req, res) => {
    try {
      const { id, firstName, lastName, password } = req.body;
      console.log(req.body);

      if (password && lastName && password) {
        await Users.update(
          { firstName, lastName, password: bcrypt.hashSync(password, 8) },
          {
            where: { id },
          }
        );
      } else if (lastName) {
        await Users.update(
          { lastName },
          {
            where: { id },
          }
        );
      } else if (firstName) {
        await Users.update(
          { firstName },
          {
            where: { id },
          }
        );
      } else if (password) {
        await Users.update(
          { password: bcrypt.hashSync(password, 8) },
          {
            where: { id },
          }
        );
      } else if (lastName && firstName) {
        await Users.update(
          { firstName, lastName },
          {
            where: { id },
          }
        );
      } else if (lastName && password) {
        await Users.update(
          { password: bcrypt.hashSync(password, 8), lastName },
          {
            where: { id },
          }
        );
      } else if (firstName && password) {
        await Users.update(
          { password: bcrypt.hashSync(password, 8), firstName },
          {
            where: { id },
          }
        );
      }
      res.redirect("/direksiya/admin/get/users");
    } catch (err) {
      console.log(err);
      res.redirect("/direksiya/admin/get/users");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);

      await Users.destroy({ where: { id } });

      res.redirect("/direksiya/admin/get/users");
    } catch (err) {
      console.log(err);
    }
  },
  logOutUser: (req, res) => {
    res.clearCookie("token");
    res.redirect("/direksiya/login");
  },
};
