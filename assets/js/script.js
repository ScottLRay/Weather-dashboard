var api_key = "760b3d74d0a727a108face9d7356d6bd";

const today = moment().format("MMM Do, YYYY");
$("#currentDay").text(today);
const city = document.querySelector("#city-input");

const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");

function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      var tempKelvin = weather.main.temp
      var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees"
      
      currentTempEl.innerHTML = "Temperature: " + tempF ;
      currentHumidityEl.innerHTML = "Humidity: " + weather.main.humidity + "%";
      currentWindEl.innerHTML = "Wind Speed: " + weather.wind.speed + " MPH";

      if (weather.cod === "404") {
        alert("city not found");
        return;
      }
      var lon = weather.coord.lon;
      var lat = weather.coord.lat;

      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&exclude=minutely,hourly`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) {
          currentUVEl.innerHTML = "UV Index: " + oneCallData.current.uvi;
          //forcast arry 1 - 5
          // var forcastEl = daily.
          // for(forcastEl; forcastEl<=5; forcastEl++){

          // }
          console.log(oneCallData);
        });
    });
}
getWeather("tucson");

// $("#weather-button").on("click", function(){
  //btns.innerhtml = "";
//   getWeather();
// })
function fromSubmit(e){
  e.preventDefault();
  const cityInput = document.querySelector("#city-input");

}

