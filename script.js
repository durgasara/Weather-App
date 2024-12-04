const apiKey = 'a19d42314629259c4672939106669768'; // Replace with your actual API key

const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const currentWeather = document.getElementById('currentWeather');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Function to fetch weather data based on city
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // Log the full API response

        if (data.cod === 200) {
            // Successfully got data, update the weather details
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            currentWeather.textContent = `Weather: ${data.weather[0].description}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        } else {
            // If the city is not found or an error occurred
            alert('City not found. Please try again!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching data. Please try again later.');
    }
}

// Add event listener to search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Optional: Automatically fetch weather for the default city when the page loads
window.onload = () => {
    fetchWeather('Delhi'); // Default city if no city is entered
};
