const API_URL = 'http://localhost:3000/api'; // Ajusta puerto si es necesario

// INICIO DE LA APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
    setupSearch();
    setupFilters();
});

// --- 1. CARGAR CATÁLOGO DE CANCIONES ---
async function loadCatalog() {
    try {
        const res = await fetch(`${API_URL}/songs`);
        if (!res.ok) throw new Error('Error al conectar con servidor');
        const songs = await res.json();
        
        window.allSongs = songs; // Guardamos en variable global
        renderSongs(songs);      // Pintamos en la home
        renderSongs(songs, 'search-results'); // Pintamos también en la zona de búsqueda por defecto
    } catch (error) {
        console.error(error);
        const errHTML = '<p>No se pudo cargar el catálogo. Revisa si el servidor está encendido.</p>';
        document.getElementById('song-list').innerHTML = errHTML;
    }
}

// --- 2. PINTAR CANCIONES (Reutilizable) ---
function renderSongs(songs, containerId = 'song-list') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Limpiar lo anterior

    if (songs.length === 0) {
        container.innerHTML = '<p>No se encontraron canciones.</p>';
        return;
    }

    songs.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card'; // Usa los estilos del CSS actualizado
        
        // HTML de cada tarjeta
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${song.cover_path || 'assets/default_cover.png'}" alt="Cover">
            </div>
            <div class="info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <div class="controls-mini">
                    <button onclick="playSong('${song.file_path}', '${song.title}', '${song.artist}', '${song.cover_path}')">▶</button>
                    <button onclick="promptAddToPlaylist(${song.id})" style="background:#333; color:white;">+</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 3. BUSCADOR (Input mejorado) ---
function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        if (!window.allSongs) return;

        const filtered = window.allSongs.filter(s => 
            s.title.toLowerCase().includes(term) || 
            s.artist.toLowerCase().includes(term)
        );
        
        // Renderizamos en el contenedor de resultados de búsqueda
        renderSongs(filtered, 'search-results');
    });
}

// --- 4. FILTROS CON BOTONES (CHIPS) ---
function setupFilters() {
    const tags = document.querySelectorAll('.filter-tag');
    
    if (!tags.length) return;

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // A. Visual: Cambiar clase 'active'
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // B. Lógica: Filtrar array
            const genre = tag.getAttribute('data-genre');
            
            if (!window.allSongs) return;

            if (genre === 'all') {
                renderSongs(window.allSongs, 'search-results');
            } else {
                const filtered = window.allSongs.filter(s => s.genre === genre);
                renderSongs(filtered, 'search-results');
            }
        });
    });
}

// --- 5. PUENTE CON EL REPRODUCTOR ---
function playSong(url, title, artist, cover) {
    if (typeof loadTrack === 'function') {
        loadTrack(url, title, artist, cover);
    } else {
        console.error("El archivo player.js no está cargado correctamente.");
    }
}