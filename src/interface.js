import { weatherData, currentDayData, nextWeekWeatherDataArray } from "./data-retrieval.js";
import { format, parseISO } from "date-fns";

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

//Populate Weather
const toCelsius = (fahrenheit) => Math.round((fahrenheit - 32) * 5 / 9);

const toKPH = (mph) => Math.round((mph *1.609344));

const tempConvertButton = document.querySelector(".temp-convert");
let isFahrenheit = true;

export function populateWeatherInfo() {
    weatherCardLocation.textContent = weatherData.resolvedAddress;
    currentDayTemp.textContent = `${currentDayData.currentTemp}°F`;
    feelsLike.textContent = `Feels Like: ${currentDayData.currentFeelsLike}°F`;
    currentDayHigh.textContent = `High: ${currentDayData.currentMaxTemp}°F`;
    currentDayLow.textContent = `Low: ${currentDayData.currentMinTemp}°F`;
    currentDayRainChance.textContent = `Chance of Rain: ${currentDayData.currentPrecipProb}%`;
    currentDayHumidity.textContent = `Humidity: ${currentDayData.currentHumidity}%`;
    currentDayWindSpeed.textContent = `Wind Speed: ${currentDayData.currentWindSpeed} mph`;
    currentDayCondition.textContent = currentDayData.currentConditions;

    nextWeekWeatherContainer.replaceChildren();

    nextWeekWeatherDataArray.forEach(day => {
        const dayContainer = document.createElement("div");
        dayContainer.classList.add("day-container", "container");
        nextWeekWeatherContainer.appendChild(dayContainer);
        const dayName = document.createElement("p");
        const dateLabel = document.createElement("p");
        const date = day.date;
        const isoDate = parseISO(date);
        dayName.textContent = format (new Date(isoDate), "eee");
        dateLabel.textContent = format (new Date (isoDate), "MMM d");
        const tempsContainer = document.createElement("div");
        tempsContainer.classList.add("temps-container", "container");
        const dayIcon = document.createElement("img");
        const maxTemp = document.createElement("p");
        maxTemp.textContent = `${day.tempMax}°F`;
        const minTemp = document.createElement("p");
        minTemp.textContent = `${day.tempMin}°F`;

        tempsContainer.append(maxTemp, minTemp);
        dayContainer.append(dayName, dateLabel, dayIcon, tempsContainer);
    })
}

export function convertCurrentDayValues() {
    if (isFahrenheit === false) {
        currentDayTemp.textContent = `${toCelsius(currentDayData.currentTemp)}°C`;
        feelsLike.textContent = `Feels Like: ${toCelsius(currentDayData.currentFeelsLike)}°C`;
        currentDayHigh.textContent = `High: ${toCelsius(currentDayData.currentMaxTemp)}°C`;
        currentDayLow.textContent = `Low: ${toCelsius(currentDayData.currentMinTemp)}°C`;
        currentDayWindSpeed.textContent = `Wind Speed: ${toKPH(currentDayData.currentWindSpeed)} kph`;
    } else {
        currentDayTemp.textContent = `${currentDayData.currentTemp}°F`;
        feelsLike.textContent = `Feels Like: ${currentDayData.currentFeelsLike}°F`;
        currentDayHigh.textContent = `High: ${currentDayData.currentMaxTemp}°F`;
        currentDayLow.textContent = `Low: ${currentDayData.currentMinTemp}°F`;
        currentDayWindSpeed.textContent = `Wind Speed: ${currentDayData.currentWindSpeed} mph`;
    }
};

export function convertNextWeekTemps() {
    nextWeekWeatherContainer.replaceChildren();

    nextWeekWeatherDataArray.forEach(day => {
        const dayContainer = document.createElement("div");
        dayContainer.classList.add("day-container", "container");
        nextWeekWeatherContainer.appendChild(dayContainer);
        const dayName = document.createElement("p");
        const dayIcon = document.createElement("img");
        const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");
        dayName.textContent = day.date;
        if (isFahrenheit === false) {
            maxTemp.textContent = `${toCelsius(day.tempMax)}°C`;
            minTemp.textContent = `${toCelsius(day.tempMin)}°C`;
        } else {
            maxTemp.textContent = `${day.tempMax}°`;
            minTemp.textContent = `${day.tempMin}°`;
        }
        
        dayContainer.append(dayName, dayIcon, maxTemp, minTemp);
    })};

tempConvertButton.addEventListener("click", () => {
    isFahrenheit = !isFahrenheit;
    convertCurrentDayValues();
    convertNextWeekTemps();
});