require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const db = require("../models");
const Users = db.users;

const verifyToken = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unathorized",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
