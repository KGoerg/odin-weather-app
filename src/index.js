import "./styles.css";
import { locationForm, locationInput, getLocation, getWeather } from "./data-retrieval.js";

//Get user's location input on form submit and run API with location
locationForm.addEventListener("submit", () => {
    getLocation();
    getWeather();
    locationInput.value = "";
    event.preventDefault();
})