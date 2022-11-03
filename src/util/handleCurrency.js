const axios = require("axios");

const handleCurrency = () => {
  let link = "https://cbu.uz/oz/arkhiv-kursov-valyut/json/";

  axios.default.get(link).then(({ data }) => {
    return data.slice(0, 3);
  });
};

module.exports = handleCurrency;
