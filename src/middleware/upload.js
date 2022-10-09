const multer = require("multer");
const maxSize = 50 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    cb(null, __basedir + "/src/uploads/assets");
  },
  filename: (req, file, cb) => {
    const imageName = file.originalname.split(" ").join("-");
    cb(null, imageName);
    req.body.image = imageName;
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

module.exports = upload;
