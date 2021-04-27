import {config} from './config.js'

console.log('script connected', config.apiKey)






async function getWeather(search = "Boston") {
  const info = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${config.apiKey}`
  );
  const rawWeatherData = await info.json();
  console.log(rawWeatherData);

//   process weather data into object with just needed values
  const weatherData = processWeather(rawWeatherData);
  console.log(weatherData);
  
}

function processWeather (rwd){
    const temp = rwd.main.temp
    const feelsLike = rwd.main.temp
    const low = rwd.main.temp_min
    const high = rwd.main.temp_max
    const humid = rwd.main.humidity
    const coord = rwd.coord
    return {temp, feelsLike, low, high, humid, coord}
}

// running functions
getWeather()