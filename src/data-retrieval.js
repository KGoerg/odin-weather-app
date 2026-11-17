let city = "";
let state = "";
let weatherData;
let currentWeatherData;
let nextWeekWeatherDataArray = [];

export const locationForm = document.querySelector(".location-input");
export const locationInput = document.querySelector('input[type="text"]');

export function getLocation() {
    let location = "";
    location = locationInput.value.replaceAll(",", "").split(" ");
    console.log(location);
    city = location[0];
    state = location[1];
    console.log(`City = ${city} and State = ${state}`);
}

export async function getWeather() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}?unitGroup=us&contentType=json`);
        weatherData = await response.json();
        console.log(weatherData);
        emptyNextWeeksWeatherArray();
        extractCurrentWeatherData();
        getNextWeeksWeather()
        console.log(currentWeatherData);
        console.log(currentWeatherData.currentConditions);
    } catch (error) {
        alert("You must enter a location.");
    }
}

//Need to pull in data for following week, potentially in their own arrays. Might need to make a Class for following week's weather info to get the same data pulled into an object for each day.
function extractCurrentWeatherData() {
    currentWeatherData = {
        currentConditions: weatherData.currentConditions.conditions,
        currentFeelsLike: weatherData.currentConditions.feelslike,
        currentHumidity: weatherData.currentConditions.humidity,
        currentTemp: weatherData.currentConditions.temp,
        currentPrecipProb: weatherData.currentConditions.precipprob,
        currentWindSpeed: weatherData.currentConditions.windspeed,
        currentMaxTemp: weatherData.days[0].tempmax,
        currentMinTemp: weatherData.days[0].tempmin,
    };
}

class Day {
    constructor(date, conditions, precipProb, tempMin, tempMax) {
        this.date = date;
        this.conditions = conditions;
        this.precipProb = precipProb;
        this.tempMin - tempMin;
        this.tempMax = tempMax;
    }
}

function getNextWeeksWeather() {
    const nextWeek = weatherData.days.slice(1);
    nextWeek.forEach(day => {
        nextWeekWeatherDataArray.push(new Day(day.datetime, day.conditions, day.precipprob, day.tempmin, day.tempmax));
    })
    console.log(nextWeekWeatherDataArray);
};

function emptyNextWeeksWeatherArray() {
    nextWeekWeatherDataArray = [];
};