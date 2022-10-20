const { sign, verify } = require("jsonwebtoken");

const signUser = (payload) => sign(payload, process.env.JWT_SECRET);
const verifyUser = (token) => verify(token, process.env.JWT_SECRET);

module.exports = {
  signUser,
  verifyUser,
};
