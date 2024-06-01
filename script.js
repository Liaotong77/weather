const apikey = "58a4d4b0ff5819f46718572bcbb8be71";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const tempSwitchBtn = document.getElementById("temp-switch");
const weatherIcon = document.querySelector(".weather-icon");

const weathertype = {
    Clouds: "clouds",
    Clear: "clear",
    Rain: "rain",
    Drizzle: "drizzle",
    Mist: "mist",
};

let isCelsius = true;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            (isCelsius ? data.main.temp.toFixed(1) : ((data.main.temp * 9) / 5 + 32).toFixed(1)) +
            (isCelsius ? "°C" : "°F");
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherMain = data.weather[0].main;
        weatherIcon.src = `images/${weathertype[weatherMain] || "default"}.png`;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

function pressEnter(event) {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        event.preventDefault();
        searchBtn.click();
    }
}

searchBox.addEventListener("keydown", pressEnter);
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));

tempSwitchBtn.addEventListener("click", () => {
    isCelsius = !isCelsius;
    if (document.querySelector(".city").innerHTML !== "") {
        checkWeather(searchBox.value);
    }
});
