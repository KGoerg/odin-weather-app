import "./styles.css";

let city = "";
let state = "";
let weatherData;
const weatherDataArray = [];

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
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}?unitGroup=us&elements=remove%3Adew%2Cremove%3Aicon%2Cremove%3Amoonphase%2Cremove%3Aprecipcover%2Cremove%3Apressure%2Cremove%3Asevererisk%2Cremove%3Asolarenergy%2Cremove%3Asolarradiation%2Cremove%3Asunrise%2Cremove%3AsunriseEpoch%2Cremove%3Asunset%2Cremove%3AsunsetEpoch%2Cremove%3Auvindex%2Cremove%3Avisibility%2Cremove%3Awindgust&contentType=json`);
        weatherData = await response.json();
        console.log(weatherData);
        extractWeatherData();
        console.log(weatherDataArray)
    } catch (error) {
        console.error(error);
    }
}

function extractWeatherData() {
    weatherDataArray.push(
        {cloudCover: weatherData.currentConditions.cloudcover},
        {conditions: weatherData.currentConditions.conditions},
        {feelsLike: weatherData.currentConditions.feelslike},
        {humidity: weatherData.currentConditions.humidity},
        {precipitation: weatherData.currentConditions.precip},
        {snowDepth: weatherData.currentConditions.snowdepth},
        {currentTemp: weatherData.currentConditions.temp},
    );
}