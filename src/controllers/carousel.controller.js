const { Carousel } = require("../models");
const path = require("path");
const fs = require("fs");
const handleCarousel = require("../util/handleCarousel");

module.exports = {
  createCarousel: async (req, res) => {
    try {
      const { title, text } = req.body;

      const image = req.files.file;
      const fileName = image.name;

      const carousel = await Carousel.create({ title, text, fileName });

      const uploadPath = path.resolve("./src/uploads/assets/images", fileName);

      fs.writeFile(uploadPath, image.data, (err) => {
        if (err) {
          res.status(500).send(err);
        }
      });

      res.json(carousel);
    } catch (err) {
      console.log(err.message);
    }
  },
  updateCarousel: async (req, res) => {
    try {
      const { id, title, text } = req.body;

      const image = req.files;

      const oldCArousel = await Carousel.findOne({ where: { carousel_id:id } });

      if (image) {
        const fileName = image.file.name;

        fs.unlink(
          path.resolve(
            "./src/uploads/assets/images",
            oldCArousel.dataValues.fileName
          ),
          (err) => {
            console.log(err);
          }
        );

        let craousel = await Carousel.update(
          {
            title,
            text,
            fileName,
          },
          { where: { carousel_id: oldCArousel.dataValues.id } }
        );

        const uploadPath = path.resolve(
          "./src/uploads/assets/images",
          fileName
        );

        fs.writeFile(uploadPath, image.file.data, (err) => {
          console.log(err);
        });
      } else {
        let carousel = await Carousel.update(
          {
            title,
            text,
            fileName: oldCArousel.dataValues.fileName,
          },
          {
            where: {
              carousel_id: oldCArousel.dataValues.id,
            },
          }
        );
      }

      res.redirect("/direksiya/admin/get/images");
    } catch (err) {
      console.log(err.message);
      res.redirect("/direksiya/admin/get/images");
    }
  },
};
