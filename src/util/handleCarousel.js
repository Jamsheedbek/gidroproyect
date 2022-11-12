const { Carousel } = require("../models");

const handleCarousel = async () => {
  try {
    var arr = [];
    const carousel = await Carousel.findAll({ order: [["createdAt", "ASC"]] });

    carousel.forEach((e) => {
      e.dataValues.imgUrl = "/files/assets/images/" + e.dataValues.fileName;

      arr.push(e.dataValues);
    });

    return arr;
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleCarousel;
