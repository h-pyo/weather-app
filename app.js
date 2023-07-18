let weatherAPI = {
  currentCity : "New York",
  metric: true,
  "apiKey": "8dbc842a556fd26be51eb33d0293e3b8",
  fetchMetricWeather: async function (cityName) {
    try {
      await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + this.apiKey
      ).then((response) => response.json())
        .then((data) => this.weatherInfo(data, this.metric));
    } catch {
      this.displayError();
    }
  },
  fetchImperialWeather: async function (cityName) {
    try {
      await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + this.apiKey
      ).then((response) => response.json())
        .then((data) => this.weatherInfo(data, this.metric));
    } catch {
      this.displayError();
    }
  },
  weatherInfo: function (data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, temp_max, temp_min, feels_like, humidity } = data.main;
    const { speed } = data.wind;
    this.currentCity = name;
    document.querySelector(".error").innerHTML = "";
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    document.querySelector(".city").innerText = `Current Weather in ${name}`;
    this.metric ? document.querySelector(".temperature").innerText = `${temp}℃` : document.querySelector(".temperature").innerText =`${temp}°F`;
    this.metric ? document.querySelector(".feels-like").innerText = `Feels like ${feels_like}℃` : document.querySelector(".feels-like").innerText = `Feels like ${feels_like}°F`;
    this.metric ? document.querySelector(".high-low").innerText = `High/Low: ${temp_max}℃ / ${temp_min}℃` : document.querySelector(".high-low").innerText = `High/Low: ${temp_max}°F / ${temp_min}°F`;
    document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".weather-description").innerText = description;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    this.metric ? document.querySelector(".wind-conditions").innerText = `Wind Speed ${speed}km/h` : document.querySelector(".wind-conditions").innerText = `Wind Speed ${speed}mph`;
  },
  search: function() {
    this.metric ? this.fetchMetricWeather(document.querySelector(".search-bar").value) : this.fetchImperialWeather(document.querySelector(".search-bar").value);
  },
  displayError: function () {
    document.querySelector(".error").innerText = "Invalid city name!!";
  } 
}

function changeUnits() {
  weatherAPI.metric = !weatherAPI.metric;
  weatherAPI.metric ? weatherAPI.fetchMetricWeather(weatherAPI.currentCity) : weatherAPI.fetchImperialWeather(weatherAPI.currentCity);
}

document.querySelector(".search-bar").addEventListener("keyup", function (action) {
  if (action.key === "Enter") {
    weatherAPI.search();
  }
});

document.querySelector(".search-button").addEventListener("click", function () {
  weatherAPI.search();
});

weatherAPI.metric ? weatherAPI.fetchMetricWeather(weatherAPI.currentCity) : weatherAPI.fetchImperialWeather(weatherAPI.currentCity);