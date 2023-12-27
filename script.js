// Key = b3b51e981352049d5c4838914eb2d1ee
// Api = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=b3b51e981352049d5c4838914eb2d1ee

const Key           = "b3b51e981352049d5c4838914eb2d1ee";
const searchInput   = document.querySelector("#search-input");
const searchBtn     = document.querySelector("#search-btn");
const error         = document.querySelector("#error");
const weatherBox    = document.querySelector(".weather-details");
const weatherIcon   = document.querySelector(".weather-icon");
const city          = document.querySelector(".city");
const condition     = document.querySelector(".weather-condition");
const temppresure   = document.querySelector(".temp");
const humidityDiv   = document.querySelector(".humidity");
const wind          = document.querySelector(".wind");

// show function
const getError = (msg) => {    
    error.innerHTML = msg;
    error.style = "display: block;";
    weatherBox.style = "display: none;";
}


// Async function to get weather data
async function getWeatherData(value) {
    const cityName = value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Key}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    // Error handling if city not found
    if(response.status == 404 ) {
        getError("Invaild city name");
        return;
    }

    if( value == "" ) {
        getError("Please enter city name");
    }

    // If success then show weather data
    if(data.cod == 200) {
        showWeatherData(data);
        weatherBox.style = "display: block;";
        error.style = "display: none;";
    }
} 

// Show weather data
const showWeatherData = (weatherData) => {
    const { name } = weatherData;
    const { temp, humidity } = weatherData.main;
    const { speed } = weatherData.wind;
    const weatherCondition  = weatherData.weather[0].main;

    condition.innerHTML = weatherCondition;
    city.innerHTML = name;
    temppresure.innerHTML = Math.round(temp) + "°C";
    humidityDiv.innerHTML = humidity + "%";
    wind.innerHTML = speed + " km/h";

    if(weatherCondition == "Clear") {
        weatherIcon.src = "images/clear.png";
    }else if(weatherCondition == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    }else if(weatherCondition == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }else if(weatherCondition == "Rain") {
        weatherIcon.src = "images/rain.png";
    }else if(weatherCondition == "Snow") {
        weatherIcon.src = "images/snow.png";
    }else if(weatherCondition == "Mist") {
        weatherIcon.src = "images/mist.png";
    }else if(weatherCondition == "Haze") {
        weatherIcon.src = "images/haze.png";
    }else if(weatherCondition == "Thunderstorm") {
        weatherIcon.src = "images/thunder.png";
    }else{
        weatherIcon.src = "images/clear.png";
    }
}


// Click Event listener
searchBtn.addEventListener("click", () => {
    getWeatherData(searchInput.value);
});

// Enter key event listener
searchInput.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        getWeatherData(searchInput.value);
    }
});