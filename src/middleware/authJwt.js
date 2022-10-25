const { Users } = require("../models");
const { verifyUser } = require("../util/jwt");

const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.redirect("/direksiya/login");
  }

  const verifyToken = verifyUser(token);

  const user = await Users.findOne({
    where: {
      id: verifyToken.id,
    },
  });

  if (!user) {
    return res.redirect("/direksiya/login");
  }
  if (verifyToken.role == "user" && req.url == "/direksiya/admin") {
    return res.redirect("/direksiya/users");
  } else if (verifyToken.role == "admin" && req.url == "/direksiya/users") {
    return res.redirect("/direksiya/admin");
  }
  next();
};

module.exports = verifyToken;
