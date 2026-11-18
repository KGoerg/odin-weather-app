import { generateInterface } from "./interface.js";

async function loadDefaultWeatherCard() {
    await getDefaultWeather();
    console.log(weatherData.resolvedAddress);
    // generateInterface();
    console.log("Hi");
};