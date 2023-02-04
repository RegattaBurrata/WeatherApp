
const form = document.querySelector('form');
const input = document.querySelector('[data-city]');
const submit = document.querySelector('[button]');

const cityTitle = document.querySelector('.city-title');
const conditions = document.querySelector('.conditions')
const temp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity');

function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

async function getWeather(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b5f7ded5dc379894b9c55c481de4f36d&units=imperial`, {
    mode: 'cors'
    })
    return await res.json();
}

const updateTitle = async (city, element) => {
    const weather = await getWeather(city);
    element.textContent = `${weather.name}`
}


const updateConditions = async (city, element) => {
    const weather = await getWeather(city);
    const conditions = weather.weather[0].description
    element.textContent = `${capitalizeFirstLetter(conditions)}`
}

const updateTemp = async (city, element) => {
    const weather = await getWeather(city);
    console.log(weather)
    const temp = weather.main.temp
    element.innerHTML = `${Math.round(temp)}<span>&#176;</span>`;
}

const updateFeelsLike = async (city, element) => {
    const weather = await getWeather(city);
    console.log(weather)
    feel = weather.main.feels_like
    element.innerHTML = `Feels like ${Math.round(feel)}<span>&#176;</span>`;
}

const updateHumidity = async (city, element) => {
    const weather = await getWeather(city);
    element.textContent = `Humidity: ${weather.main.humidity}%`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateTitle(input.value, cityTitle)
    updateConditions(input.value, conditions)
    updateTemp(input.value, temp);
    updateFeelsLike(input.value, feelsLike)
    updateHumidity(input.value, humidity);
    input.value = ''
})
