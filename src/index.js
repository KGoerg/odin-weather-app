import "./styles.css";

let city = "";
let state = "";
let weatherData;
const currentWeatherDataArray = [];
const nextWeekWeatherDataArray = [];

const locationForm = document.querySelector(".location-input");
const locationInput = document.querySelector('input[type="text"]');

function getLocation() {
    let location = "";
    location = locationInput.value.replaceAll(",", "").split(" ");
    console.log(location);
    city = location[0];
    state = location[1];
    console.log(`City = ${city} and State = ${state}`);
}

//Get user's location input on form submit and run API with location
locationForm.addEventListener("submit", () => {
    getLocation();
    getWeather();
    locationInput.value = "";
    event.preventDefault();
})

async function getWeather() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}?unitGroup=us&contentType=json`);
        weatherData = await response.json();
        console.log(weatherData);
        extractCurrentWeatherData();
        console.log(currentWeatherDataArray)
    } catch (error) {
        console.error(error);
    }
}

//Need to pull in data for following week, potentially in their own arrays. Might need to make a Class for following week's weather info to get the same data pulled into an object for each day.
function extractCurrentWeatherData() {
    currentWeatherDataArray.push(
        {currentConditions: weatherData.currentConditions.conditions},
        {currentFeelsLike: weatherData.currentConditions.feelslike},
        {currentHumidity: weatherData.currentConditions.humidity},
        {currentTemp: weatherData.currentConditions.temp},
        {currentPrecipProb: weatherData.currentConditions.precipprob},
        {currentWindSpeed: weatherData.currentConditions.windspeed},
    );
}

// class Day {
//     constructor(conditions, feelsLike, humidity, precipitation, precipitationProbability, temperature, minTemperature, maxTemperature, )
// }