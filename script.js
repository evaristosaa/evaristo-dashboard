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

// Fetch AI news from backend API (you'll need to create this endpoint)
async function loadAINews() {
    const newsGrid = document.querySelector('.news-grid');
    
    // For now, using hardcoded news since Brave API requires server-side call
    // To connect real API, create a backend endpoint that calls Brave Search API
    // and serves the results to avoid exposing API keys in frontend
    
    const hardcodedNews = [
        {
            title: "Anthropic dona $20M para regular IA antes de elecciones 2026",
            description: "El laboratorio de IA aporta fondos para impulsar regulaciones y seguridad en el ámbito político estadounidense.",
            date: "13 Feb 2026"
        },
        {
            title: "Microsoft busca independencia de OpenAI con modelos propios",
            description: "Mustafa Suleyman lidera esfuerzos hacia 'verdadera autosuficiencia' en IA, construyendo modelos fundacionales propios.",
            date: "13 Feb 2026"
        },
        {
            title: "IA médica de U. Michigan diagnostica en segundos vía MRI",
            description: "Sistema de IA interpreta escáneres cerebrales instantáneamente, identifica condiciones neurológicas y prioriza casos urgentes.",
            date: "12 Feb 2026"
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
    loadGitHubRepos();
    loadAINews();
    
    // Refresh weather every 10 minutes
    setInterval(loadWeather, 10 * 60 * 1000);
    
    // Refresh repos every hour
    setInterval(loadGitHubRepos, 60 * 60 * 1000);
});
