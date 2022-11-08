const axios = require("axios");

var date = new Date();

const handleWheather = async () => {
  let link =
    "https://openweathermap.org/data/2.5/weather?id=1484839&appid=439d4b804bc8187953eb36d2a8c26a02";

  const { data } = await axios.default.get(link);
  return {
    temp: Math.round(data.main.temp),
    name: data.name,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind: data.wind.speed.toFixed(1),
    time: date.getHours() + ":" + date.getMinutes(),
    date: date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(),
  };
};

module.exports = handleWheather;
