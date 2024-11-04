const API_KEY = '0299b86fffc24bccb5c170105240411'; 

async function getWeatherByCity() {
    const city = document.getElementById('location-input').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            alert(data.error.message);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not fetch weather data');
    }
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                displayWeather(data);
            } else {
                alert(data.error.message);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data');
        }
    });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${data.current.condition.icon}" alt="Weather icon">
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} kph</p>
    `;
    weatherInfo.style.display = 'block';
}
