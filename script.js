// Fetch weather data from wttr.in
async function loadWeather() {
    const weatherContent = document.getElementById('weather-content');
    
    try {
        // Fetch weather for Dos Hermanas, Sevilla
        const response = await fetch('https://wttr.in/Dos_Hermanas,Sevilla?format=j1');
        const data = await response.json();
        
        const current = data.current_condition[0];
        const today = data.weather[0];
        
        weatherContent.innerHTML = `
            <div class="weather-info">
                <div class="weather-main">${current.temp_C}°C</div>
                <div class="weather-desc">${current.weatherDesc[0].value}</div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <strong>Sensación</strong>
                        ${current.FeelsLikeC}°C
                    </div>
                    <div class="weather-detail">
                        <strong>Viento</strong>
                        ${current.windspeedKmph} km/h
                    </div>
                    <div class="weather-detail">
                        <strong>Humedad</strong>
                        ${current.humidity}%
                    </div>
                    <div class="weather-detail">
                        <strong>Máx/Mín</strong>
                        ${today.maxtempC}°C / ${today.mintempC}°C
                    </div>
                </div>
            </div>
        `;
        weatherContent.classList.remove('loading');
    } catch (error) {
        weatherContent.innerHTML = `
            <div class="weather-info">
                <div class="weather-desc">⚠️ Error cargando clima</div>
                <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">
                    Intenta recargar la página
                </div>
            </div>
        `;
        weatherContent.classList.remove('loading');
        console.error('Error fetching weather:', error);
    }
}

// Load weather on page load
document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    
    // Refresh weather every 10 minutes
    setInterval(loadWeather, 10 * 60 * 1000);
});
