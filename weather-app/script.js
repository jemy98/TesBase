const apiKey='6f0017cd91c27d8be2e2cc93af45eea3';
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');

async function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url); 
        const data = await response.json();
        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `${data.main.temp} °C`;
        descriptionElement.textContent = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to retrieve weather data. Please try again later.');
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherData(lat, lon);
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please ensure location services are enabled.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

window.onload = getLocation;