const { verifyUser } = require("../util/jwt");

const verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.redirect("/direksiya/login");
  }

  const role = verifyUser(token).role;
  if (!role) {
    return res.redirect("/direksiya/login");
  } else if (role == "user" && req.url == "/direksiya/admin") {
    return res.redirect("/direksiya/users");
  }
  next();
};

module.exports = verifyToken;
