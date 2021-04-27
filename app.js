import { config } from "./config.js";

console.log("script connected", config.apiKey);

async function getWeather(search = "Boston") {
  const info = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${config.apiKey}&units=imperial`
  );
  const rawWeatherData = await info.json();

  //   process weather data into object with just needed values
  const weatherData = processWeather(rawWeatherData);

  renderWeather(weatherData);

  renderMap(weatherData.coord);
}

function processWeather(rwd) {
  const name = rwd.name;
  const temp = rwd.main.temp;
  const feelsLike = rwd.main.temp;
  const low = rwd.main.temp_min;
  const high = rwd.main.temp_max;
  const humid = rwd.main.humidity;
  const coord = rwd.coord;
  return { name, temp, feelsLike, low, high, humid, coord };
}

function renderWeather(weatherObject) {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  content.innerHTML = `<span id="name">${weatherObject.name}</span> <span class='curTemp'> Current Temp: ${weatherObject.temp}</span> <span class=''> Feels like: ${weatherObject.feelsLike}</span>`;
}

function renderMap(coords) {
  mapboxgl.accessToken = config.mapToken;
  var map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [coords.lon, coords.lat], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}

function searchButton() {
  const btn = document.querySelector("#submitCity");
  const input = document.querySelector("#cityInput");
  btn.addEventListener("click", function () {
    console.log(input.value);
    getWeather(input.value);
  });
}

// running functions
getWeather();
searchButton();
