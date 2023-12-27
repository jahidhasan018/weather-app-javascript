// Key = b3b51e981352049d5c4838914eb2d1ee
// Api = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=b3b51e981352049d5c4838914eb2d1ee

const Key = "b3b51e981352049d5c4838914eb2d1ee";
const searchInput = document.querySelector("#search-city");
const searchBtn = document.querySelector("#search-btn");


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = searchInput.value;
    if (city) {
        getWeatherByLocation(city);
    }
});

function getWeatherByLocation(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            showWeather(data);
        });
}

function showWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    document.querySelector(".city").innerText = `Weather in ${name}, ${country}`;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
}

function currentDate() {
    const now = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateBuilder(now);
}

function dateBuilder(d) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November",
        "December"
    ];
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
}

currentDate();

// https://source.unsplash.com/1600x900/?london
// https://source.unsplash.com/1600x900/?paris
// https://source.unsplash.com/1600x900/?tokyo
