import { config } from "./config.js";

console.log("script connected", config.apiKey);

async function getWeather(search = "Boston", units = "imperial") {
  const info = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${config.apiKey}&units=${units}`
  );
  const rawWeatherData = await info.json();
  //   process weather data into object with just needed values
  console.log(rawWeatherData);

  const weatherData = processWeather(rawWeatherData, units);
  renderWeather(weatherData, units);
  renderMap(weatherData.coord);
}

function processWeather(rwd, units) {
  
  const name = rwd.name;
  const temp = Math.round(rwd.main.temp);
  const feelsLike = Math.round(rwd.main.feels_like);
  const low = Math.round(rwd.main.temp_min);
  const high = Math.round(rwd.main.temp_max);
  const humid = rwd.main.humidity;
  const coord = rwd.coord;
  return { name, temp, feelsLike, low, high, humid, coord, units};
}

function renderWeather(weatherObject, units) {
  let dispUnit = '';
  switch(units){
    case "imperial": 
       dispUnit ='℉';
       break
    case "metric":
       dispUnit = '℃'
       break
      
  } 
  const content = document.querySelector("#content")
  content.innerHTML = ''
  content.innerHTML = `<span id="name">${weatherObject.name}</span> <span class='curTemp'>     ${weatherObject.temp}${dispUnit}</span> <span class=''> Feels like: ${weatherObject.feelsLike}${dispUnit}</span>`;
  
}

function renderMap(coords) {
  mapboxgl.accessToken =
    config.mapToken;
  var map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [coords.lon, coords.lat], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}


function searchButton(){
    const btn = document.querySelector("#submitCity");
    const input = document.querySelector('#cityInput')
    btn.addEventListener("click", function(){
        console.log(input.value)
        getWeather(input.value)
    })
}
function unitsButton(){
  const unitBtn = document.querySelector('units')
  unitBtn.addEventListener("click", function(){

  })
}

function changeUnits(units){
  if (units === 'metric'){
    units = 'imperial'
  }else{
    units = "metric"
  }
}

// running functions
getWeather();
searchButton();