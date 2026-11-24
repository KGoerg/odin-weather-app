import { weatherData, currentDayData, nextWeekWeatherDataArray } from "./data-retrieval.js";

//Weather Card Container
const weatherContainer = document.querySelector(".weather-card");
weatherContainer.classList.add("weather-card", "container");

//Location Header
const weatherCardLocation = document.createElement("h1");

//Current Day's Weather Info
const currentDayContainer = document.createElement("div");
currentDayContainer.classList.add("current-day", "container");

const currentDayTemp = document.createElement("h2");

const moreCurrentTempInfoContainer = document.createElement("div");
moreCurrentTempInfoContainer.classList.add("more-current-temp", "container");
const feelsLike = document.createElement("p");
const currentDayHigh = document.createElement("p");
const currentDayLow = document.createElement("p");

const additionalWeatherConditionsContainer = document.createElement("div");
additionalWeatherConditionsContainer.classList.add("weather-conditions", "container");
const currentDayRainChance = document.createElement("p");
const currentDayHumidity = document.createElement("p");
const currentDayWindSpeed = document.createElement("p");

const currentDayIconContainer = document.createElement("div");
currentDayIconContainer.classList.add("current-day-icon-container", "container");
const currentDayIcon = document.createElement("img");
const currentDayCondition = document.createElement("p");

//Next Week's Weather Info
const nextWeekWeatherContainer = document.createElement("div");
nextWeekWeatherContainer.classList.add("next-week-weather", "container");

//Appends
weatherContainer.append(weatherCardLocation, currentDayContainer, nextWeekWeatherContainer);

currentDayContainer.append(currentDayTemp, moreCurrentTempInfoContainer, additionalWeatherConditionsContainer, currentDayIconContainer);

moreCurrentTempInfoContainer.append(feelsLike, currentDayHigh, currentDayLow);

additionalWeatherConditionsContainer.append(currentDayRainChance, currentDayHumidity, currentDayWindSpeed);

currentDayIconContainer.append(currentDayIcon, currentDayCondition);

export function populateWeatherInfo() {
    weatherCardLocation.textContent = weatherData.resolvedAddress;
    currentDayTemp.textContent = `${currentDayData.currentTemp}°`;
    feelsLike.textContent = `Feels Like: ${currentDayData.currentFeelsLike}°`;
    currentDayHigh.textContent = `High: ${currentDayData.currentMaxTemp}°`;
    currentDayLow.textContent = `Low: ${currentDayData.currentMinTemp}°`;
    currentDayRainChance.textContent = `Chance of Rain: ${currentDayData.currentPrecipProb}%`;
    currentDayHumidity.textContent = `Humidity: ${currentDayData.currentHumidity}%`;
    currentDayWindSpeed.textContent = `Wind Speed: ${currentDayData.currentWindSpeed}`;
    currentDayCondition.textContent = currentDayData.currentConditions;

    nextWeekWeatherContainer.replaceChildren();

    nextWeekWeatherDataArray.forEach(day => {
        const dayContainer = document.createElement("div");
        dayContainer.classList.add("day-container", "container");
        nextWeekWeatherContainer.appendChild(dayContainer);
        const dayName = document.createElement("p");
        dayName.textContent = day.date;
        const dayIcon = document.createElement("img");
        const maxTemp = document.createElement("p");
        maxTemp.textContent = `${day.tempMax}°`;
        const minTemp = document.createElement("p");
        minTemp.textContent = `${day.tempMin}°`;

        dayContainer.append(dayName, dayIcon, maxTemp, minTemp);
    })
}

const toCelsius = (fahrenheit) => Math.round((fahrenheit - 32) * 5 / 9);

const tempConvertButton = document.querySelector(".temp-convert");
let isFahrenheit = true;

function convertCurrentDayTemps() {
    if (isFahrenheit === false) {
        currentDayTemp.textContent = `${toCelsius(currentDayData.currentTemp)}°`;
        feelsLike.textContent = `Feels Like: ${toCelsius(currentDayData.currentFeelsLike)}°`;
        currentDayHigh.textContent = `High: ${toCelsius(currentDayData.currentMaxTemp)}°`;
        currentDayLow.textContent = `Low: ${toCelsius(currentDayData.currentMinTemp)}°`;
    } else {
        currentDayTemp.textContent = `${currentDayData.currentTemp}°`;
        feelsLike.textContent = `Feels Like: ${currentDayData.currentFeelsLike}°`;
        currentDayHigh.textContent = `High: ${currentDayData.currentMaxTemp}°`;
        currentDayLow.textContent = `Low: ${currentDayData.currentMinTemp}°`;
    }
};

// function convertNextWeekTemps() {
//     nextWeekWeatherDataArray.forEach(day => {
//         let celsiusMax = toCelsius(day.tempMax);
//         let fahrenheitMax = day.tempMax;
//         let celsiusMin = toCelsius(day.tempMin);
//         let fahrenheitMin = day.tempMin;
//         if (isFahrenheit === false) {
//             maxTemp.textContent = celsiusMax;
//             minTemp.textContent = celsiusMin;
//         }
//     })
// }

tempConvertButton.addEventListener("click", () => {
    isFahrenheit = !isFahrenheit;
    convertCurrentDayTemps();
    // convertNextWeekTemps();
});