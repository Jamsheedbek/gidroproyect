const axios = require("axios");

const handleWheather = () => {
  let link =
    "https://openweathermap.org/data/2.5/onecall?lat=41.2646&lon=69.2163&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02";

  axios.default.get(link).then(({ data }) => {
    return data;
  });
};

module.exports = handleWheather;
