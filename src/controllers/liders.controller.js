const { Leaders } = require("../models");

module.exports = {
  createLider: async (req, res) => {
    try {
      const { fullName, position, tel, mail, about, acceptance, commitment } =
        req.body;

      const image = req.files.file;
      const fileName = image.name;

      const newLeader = await Leaders.create(
        fullName,
        position,
        tel,
        mail,
        about,
        acceptance,
        commitment,
        fileName
      );

      const uploadPath = path.resolve("./src/uploads/assets/images", fileName);

      fs.writeFile(uploadPath, image.data, (err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
