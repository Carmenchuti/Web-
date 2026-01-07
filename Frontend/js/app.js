const API_URL = 'http://localhost:3000/api'; 

// Al cargar la página
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
        window.allSongs = songs; // Guardamos globalmente para filtrar
        renderSongs(songs);
    } catch (error) {
        console.error(error);
        document.getElementById('song-list').innerHTML = '<p>No se pudo cargar el catálogo.</p>';
    }
}

// --- 2. PINTAR CANCIONES EN PANTALLA ---
function renderSongs(songs) {
    const container = document.getElementById('song-list');
    container.innerHTML = ''; // Limpiar lo anterior

    if (songs.length === 0) {
        container.innerHTML = '<p>No se encontraron canciones.</p>';
        return;
    }

    songs.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        // HTML de cada tarjeta de canción
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${song.cover_path || '../assets/default.png'}" alt="Cover">
            </div>
            <div class="info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <div class="controls">
                    <button onclick="playSong('${song.file_path}', '${song.title}')">▶ Reproducir</button>
                    <button onclick="promptAddToPlaylist(${song.id})">➕ Playlist</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 3. BUSCADOR ---
function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        // Filtramos del array global
        const filtered = window.allSongs.filter(s => 
            s.title.toLowerCase().includes(term) || 
            s.artist.toLowerCase().includes(term)
        );
        renderSongs(filtered);
    });
}

// --- 4. FILTROS ---
function setupFilters() {
    const select = document.getElementById('genreFilter');
    if (!select) return;

    select.addEventListener('change', (e) => {
        const genre = e.target.value;
        if (genre === 'all') {
            renderSongs(window.allSongs);
        } else {
            const filtered = window.allSongs.filter(s => s.genre === genre);
            renderSongs(filtered);
        }
    });
}

// Función auxiliar para conectar con el reproductor (Persona 2)
function playSong(url, title) {
    if (typeof loadTrack === 'function') {
        loadTrack(url, title);
    } else {
        console.log("Reproduciendo:", title); // Fallback por si no está el script de P2
    }
}