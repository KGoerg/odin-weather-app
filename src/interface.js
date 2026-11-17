import { weatherData } from "./data-retrieval.js";

export function generateInterface() {
    const weatherContainer = document.querySelector(".weather-card");
    const weatherCardLocation = document.createElement("h1");
    weatherContainer.appendChild(weatherCardLocation);
    weatherCardLocation.textContent = weatherData.resolvedAddress;
}