import { weatherData } from "./data-retrieval.js";

const weatherContainer = document.querySelector(".weather-card");
const weatherCardLocation = document.createElement("h1");
weatherContainer.appendChild(weatherCardLocation);

export function generateInterface() {
    weatherCardLocation.textContent = weatherData.resolvedAddress;
}