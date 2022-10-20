const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { signUser } = require("../util/jwt");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({
        where: {
          firstName: username,
        },
      });

      if (!user) {
        return res.render("login", { message: "User not found" });
      }

      var passwordValid = bcrypt.compareSync(password, user.password);

      if (!passwordValid) {
        res.render("login", { message: "Invalid password" });
      }

      res.cookie(
        "token",
        signUser({ id: user.id, role: user.role }, process.env.JWT_SECRET)
      );

      if (user.role == "user") {
        res.redirect("/direksiya/users");
      } else if (user.role == "admin") {
        res.redirect("/direksiya/admin");
      }
    } catch (err) {
      res.render("login", {
        message: err.message,
      });
    }
  },
};
