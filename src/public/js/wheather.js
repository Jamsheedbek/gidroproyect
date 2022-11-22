var date = new Date();

const handleWheather = async () => {
  let link =
    "https://openweathermap.org/data/2.5/weather?id=1484839&appid=439d4b804bc8187953eb36d2a8c26a02";

  const { data } = await axios.get(link);

  document.querySelector(".wheather-time").textContent =
    date.getHours() + ":" + date.getMinutes();

  document.querySelector(".wheather-temp").textContent =
    Math.round(data.main.temp) + "°C";

  document.querySelector(".wheather-wind").textContent =
    data.wind.speed.toFixed(1) + " m/s";

  document.querySelector(".wheather-humidty").textContent =
    data.main.humidity + " %";

  document.querySelector(".wheather-date").textContent =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

const handleCurrency = async () => {
  let link = "https://cbu.uz/uz/arkhiv-kursov-valyut/json/";

  const { data } = await axios.get(link, {
    headers: {
      "Access-Control-Allow-Origin": "origin-list",
    },
  });

  console.log(data);

  return data.slice(0, 3);
};

handleCurrency();

handleWheather();
