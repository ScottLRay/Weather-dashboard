var api_key = "760b3d74d0a727a108face9d7356d6bd";

const today = moment().format("MMM Do, YYYY");
$("#currentDay").text(today);

const nameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");
const forcastEl = document.querySelectorAll("#forecast");
const $form = document.querySelector(".form-control");

function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      var tempKelvin = weather.main.temp;
      var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
      // nameEl.innerHTML = weather.data.name;
      currentTempEl.innerHTML = "Temperature: " + tempF;
      currentHumidityEl.innerHTML = "Humidity: " + weather.main.humidity + "%";
      currentWindEl.innerHTML = "Wind Speed: " + weather.wind.speed + " MPH";

      if (weather.cod === "404") {
        alert("city not found");
        return;
      }
      var lon = weather.coord.lon;
      var lat = weather.coord.lat;

      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial&exclude=minutely,hourly`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) {
          currentUVEl.innerHTML = "UV Index: " + oneCallData.current.uvi;

          console.log(oneCallData);
          // for (let i = 0; i < array.length; i++) {
          //   const element = array[i];
            
          // }
          var forecast1 = document.querySelector(".forecast1");
          forecast1.textContent = oneCallData.daily[1].temp.max;
          var humid1 = document.querySelector(".humidity1");
          humid1.textContent = oneCallData.daily[1].humidity;
          var winspeed1 = document.querySelector(".windspeed1");
          winspeed1.textContent = oneCallData.daily[1].wind_speed;

          var forecast2 = document.querySelector(".forecast2");
          forecast2.textContent = oneCallData.daily[2].temp.max;
          var humid2 = document.querySelector(".humidity2");
          humid2.textContent = oneCallData.daily[2].humidity;
          var winspeed2 = document.querySelector(".windspeed2");
          winspeed2.textContent = oneCallData.daily[2].wind_speed;

          var forecast3 = document.querySelector(".forecast3");
          forecast3.textContent = oneCallData.daily[3].temp.max;
          var humid3 = document.querySelector(".humidity3");
          humid3.textContent = oneCallData.daily[3].humidity;
          var winspeed3 = document.querySelector(".windspeed3");
          winspeed3.textContent = oneCallData.daily[3].wind_speed;

          var forecast4 = document.querySelector(".forecast4");
          forecast4.textContent = oneCallData.daily[4].temp.max;
          var humid4 = document.querySelector(".humidity4");
          humid4.textContent = oneCallData.daily[4].humidity;
          var winspeed4 = document.querySelector(".windspeed4");
          winspeed4.textContent = oneCallData.daily[4].wind_speed;

          var forecast5 = document.querySelector(".forecast5");
          forecast5.textContent = oneCallData.daily[5].temp.max;
          var humid5 = document.querySelector(".humidity5");
          humid5.textContent = oneCallData.daily[5].humidity;
          var winspeed5 = document.querySelector(".windspeed5");
          winspeed5.textContent = oneCallData.daily[5].wind_speed;
        });
    });
}

$("#weather-button").on("click", function (e) {
  e.preventDefault();

  var cityInput = document.querySelector("#city-input").value;
  console.log(cityInput);
  getWeather(cityInput);
  save();
  renderSavedSearch()
});

userSearch = localStorage.getItem("Search History");
if (userSearch) {
  userSearch = JSON.parse(userSearch);
} else {
  userSearch = [];
}

//rendering the buttons from save
function renderSavedSearch(){
  var savebtn= document.querySelector(".save-search-container")
  savebtn.innerHTML=""

  for (let i = 0; i < userSearch.length; i++) {
    var city = userSearch[i];
    // creat Element in button form 
    var cityBtn = document.createElement("button");
    
    //.addClass(btn btn-outline-secondary btn-sm) add classes to turn in to buttons to press to rerun search
    cityBtn.classList.add("btn", "btn-outline-secondary", "btn-sm")

    //name of the buttons will but the city that enduser already search for
    cityBtn.textContent = city
    
      savebtn.append(cityBtn)
    
  }
}

//local save
var save = function () {
  var search = $form.value;
  userSearch.push(search);
  localStorage.setItem("Search History", JSON.stringify(userSearch));

  $form.value = "";
  return userSearch;
};


