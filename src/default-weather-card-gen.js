import { weatherData } from "./data-retrieval.js";
import { getDefaultWeather } from "./data-retrieval.js";
import { populateWeatherInfo } from "./interface.js";

export async function loadDefaultWeatherCard() {
    await getDefaultWeather();
    console.log(weatherData.resolvedAddress);
    populateWeatherInfo();
};