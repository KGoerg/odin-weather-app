import { populateWeatherInfo } from "./interface.js";

let location = "";
export let weatherData;
export let currentDayData;
export let nextWeekWeatherDataArray = [];

export const locationForm = document.querySelector(".location-input");
export const locationInput = document.querySelector('input[type="text"]');

export function getLocation() {
    location = locationInput.value.replaceAll(",", "");
    console.log(location);
}

export async function getDefaultWeather() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/NewYork%2C%20NY?unitGroup=us&contentType=json`);
        weatherData = await response.json();
        console.log(weatherData);
        extractCurrentDayData();
        getNextWeeksWeatherData()
        console.log(currentDayData);
        console.log(currentDayData.currentConditions);
    } catch (error) {
        alert(error);
    }
}

export async function getWeather() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&elements=add%3AresolvedAddress&contentType=json`);
        weatherData = await response.json();
        console.log(weatherData);
        emptyNextWeeksWeatherArray();
        extractCurrentDayData();
        getNextWeeksWeatherData();
        populateWeatherInfo();
        console.log(currentDayData);
        console.log(currentDayData.currentConditions);
    } catch (error) {
        alert(error);
    }
}

function extractCurrentDayData() {
    currentDayData = {
        currentConditions: weatherData.currentConditions.conditions,
        currentFeelsLike: weatherData.currentConditions.feelslike,
        currentHumidity: Math.round(weatherData.currentConditions.humidity),
        currentTemp: Math.round(weatherData.currentConditions.temp),
        currentPrecipProb: weatherData.currentConditions.precipprob,
        currentWindSpeed: Math.round(weatherData.currentConditions.windspeed),
        currentMaxTemp: Math.round(weatherData.days[0].tempmax),
        currentMinTemp: Math.round(weatherData.days[0].tempmin),
        currentAddress: weatherData.resolvedAddress,
    };
}

class Day {
    constructor(date, conditions, precipProb, tempMin, tempMax) {
        this.date = date;
        this.conditions = conditions;
        this.precipProb = Math.round(precipProb);
        this.tempMin = Math.round(tempMin);
        this.tempMax = Math.round(tempMax);
    }
}

function getNextWeeksWeatherData() {
    const nextWeek = weatherData.days;
    nextWeek.forEach(day => {
        nextWeekWeatherDataArray.push(new Day(day.datetime, day.conditions, day.precipprob, day.tempmin, day.tempmax));
    })
    console.log(nextWeekWeatherDataArray);
};

function emptyNextWeeksWeatherArray() {
    nextWeekWeatherDataArray = [];
};