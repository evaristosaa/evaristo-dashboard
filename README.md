# Dashboard Personal - Evaristo Saá

Dashboard personal responsive con clima, noticias de IA y repositorios destacados.

## 🚀 Características

- 🌤️ **Clima en tiempo real** - Integración con wttr.in para Dos Hermanas, Sevilla
- 🤖 **Noticias IA** - Últimas novedades del mundo de la Inteligencia Artificial
- 💾 **Repositorios GitHub** - Tus proyectos destacados
- 📱 **Responsive** - Se adapta a móvil, tablet y desktop
- 💚 **Diseño moderno** - Colores corporativos y tipografía Inter

## 🎨 Colores

- **Azul oscuro**: `#003366` (primary)
- **Verde**: `#00D084` (accent)
- **Blanco**: `#FFFFFF`
- **Gris claro**: `#F5F7FA` (background)

## 📂 Estructura

```
evaristo-dashboard/
├── index.html      # Estructura HTML
├── style.css       # Estilos CSS
├── script.js       # JavaScript (clima API)
└── README.md       # Este archivo
```

## 🌐 Deployment en GitHub Pages

### Opción 1: Desde la web de GitHub

1. Sube estos archivos a un repositorio público en GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona `main` branch y `/` (root)
4. Guarda y espera 1-2 minutos
5. Tu dashboard estará disponible en: `https://evaristosaa.github.io/nombre-repo/`

### Opción 2: Desde terminal

```bash
# Crear repo local
git init
git add .
git commit -m "feat: dashboard personal inicial"

# Conectar con GitHub
git remote add origin https://github.com/evaristosaa/evaristo-dashboard.git
git branch -M main
git push -u origin main

# Activar GitHub Pages desde Settings > Pages en la web
```

## 🔄 Actualizar contenido

### Cambiar noticias

Edita las noticias hardcodeadas en `index.html` (sección `.news-card`).

Para conectar una API de noticias en el futuro, modifica `script.js`.

### Cambiar repos

Edita los repositorios en `index.html` (sección `.repos-card`).

Para conectar con GitHub API:

```javascript
// En script.js, añade:
async function loadGitHubRepos() {
    const response = await fetch('https://api.github.com/users/evaristosaa/repos?sort=updated&per_page=3');
    const repos = await response.json();
    // Renderizar repos dinámicamente
}
```

## 📝 Créditos

Desarrollado con 💚 por **mAI** para Evaristo Saá.

## 📄 Licencia

MIT
