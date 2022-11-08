const axios = require("axios");

const handleCurrency = async () => {
  let link = "https://cbu.uz/oz/arkhiv-kursov-valyut/json/";

  const { data } = await axios.default.get(link);

  return data.slice(0, 3);
};

module.exports = handleCurrency;
