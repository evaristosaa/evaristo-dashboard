// Fetch weather data from wttr.in
async function loadWeather() {
    const weatherContent = document.getElementById('weather-content');
    
    try {
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

// Fetch GitHub repos
async function loadGitHubRepos() {
    const reposGrid = document.querySelector('.repos-grid');
    
    try {
        const response = await fetch('https://api.github.com/users/evaristosaa/repos?sort=updated&per_page=3');
        const repos = await response.json();
        
        reposGrid.innerHTML = repos.map(repo => `
            <div class="repo-item">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sin descripción'}</p>
                <div class="repo-meta">
                    <span class="repo-lang">${repo.language || 'N/A'}</span>
                    <span class="repo-stars">⭐ ${repo.stargazers_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="repo-link">Ver en GitHub →</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        reposGrid.innerHTML = '<p style="color: #666;">Error cargando repositorios</p>';
    }
}

// Load OpenClaw status
function loadOpenClawStatus() {
    const premiumEl = document.getElementById('premium-status');
    const chatEl = document.getElementById('chat-status');
    const updateEl = document.getElementById('last-update');
    
    // Hardcoded status - updated by script
    const openclawStatus = {
        premium: "51% left",
        chat: "100% left",
        lastUpdate: "15 Feb 2026, 06:22"
    };
    
    premiumEl.textContent = openclawStatus.premium;
    chatEl.textContent = openclawStatus.chat;
    updateEl.textContent = openclawStatus.lastUpdate;
}

// Fetch AI news from backend API (you'll need to create this endpoint)
async function loadAINews() {
    const newsGrid = document.querySelector('.news-grid');
    
    // For now, using hardcoded news since Brave API requires server-side call
    // To connect real API, create a backend endpoint that calls Brave Search API
    // and serves the results to avoid exposing API keys in frontend
    
    const hardcodedNews = [
        {
            title: "OpenAI y xAI pierden investigadores clave",
            description: "Más renuncias en OpenAI y la mitad de cofundadores de xAI han dimitido en 24h",
            date: "15 Feb 2026"
        },
        {
            title: "Gigantes tech invertirán 60B en IA este año",
            description: "Los hyperscalers de IA planean gasto récord de 60 mil millones en 2026",
            date: "14 Feb 2026"
        },
        {
            title: "Hollywood crea academias para adaptarse a IA",
            description: "Curious Refuge entrena trabajadores de cine en IA mientras otros temen perder empleos",
            date: "15 Feb 2026"
        }
    ];
    
    newsGrid.innerHTML = hardcodedNews.map(news => `
        <article class="news-item">
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <span class="news-date">${news.date}</span>
        </article>
    `).join('');
}

// Load all data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    loadOpenClawStatus();
    loadGitHubRepos();
    loadAINews();
    
    // Refresh weather every 10 minutes
    setInterval(loadWeather, 10 * 60 * 1000);
    
    // Refresh repos every hour
    setInterval(loadGitHubRepos, 60 * 60 * 1000);
});
