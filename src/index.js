import "./styles.css";
import { getDefaultWeather, locationForm, locationInput, getLocation, getWeather, weatherData } from "./data-retrieval.js";
import { populateWeatherInfo } from "./interface.js";
import {loadDefaultWeatherCard} from "./default-weather-card-gen.js";

loadDefaultWeatherCard();

//Get user's location input on form submit and run API with location
locationForm.addEventListener("submit", () => {
    getLocation();
    getWeather();
    locationInput.value = "";
    event.preventDefault();
});