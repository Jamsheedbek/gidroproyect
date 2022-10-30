const { Leaders } = require("../models");

module.exports = {
  createLider: async (req, res) => {
    try {
      const { fullName, position, tel, mail, about } = req.body;

      const newLeader = await Leaders.create(
        fullName,
        position,
        tel,
        mail,
        about
      );
    } catch (err) {
      console.log(err);
    }
  },
};
