// --- GESTIÓN DE PLAYLISTS ---

// 1. Cargar Playlists del usuario
async function loadMyPlaylists() {
    const userId = 1; // ID fijo temporalmente (login simulado)
    const container = document.getElementById('playlist-container');
    if(!container) return;

    try {
        const res = await fetch(`${API_URL}/playlists?userId=${userId}`);
        const playlists = await res.json();
        
        container.innerHTML = '';
        playlists.forEach(pl => {
            const div = document.createElement('div');
            div.className = 'playlist-item';
            div.innerHTML = `
                <span>${pl.name} (${pl.is_public ? 'Pública' : 'Privada'})</span>
                <button onclick="deletePlaylist(${pl.id})" class="btn-delete">🗑️</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error cargando playlists", error);
    }
}

// 2. Crear nueva Playlist
async function createPlaylist() {
    const name = prompt("Nombre de la nueva playlist:");
    if (!name) return;

    const userId = 1; 
    try {
        await fetch(`${API_URL}/playlists`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, name, isPublic: true })
        });
        loadMyPlaylists(); // Recargar la lista
    } catch (error) {
        alert("Error al crear playlist");
    }
}

// 3. Añadir canción a Playlist
async function promptAddToPlaylist(songId) {
    const playlistId = prompt("ID de la playlist donde quieres añadirla (Mira la consola para ver IDs):");
    if (!playlistId) return;

    try {
        const res = await fetch(`${API_URL}/playlists/${playlistId}/songs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songId })
        });
        if(res.ok) alert("Añadida correctamente");
    } catch (error) {
        console.error(error);
    }
}

// 4. Borrar Playlist
async function deletePlaylist(id) {
    if(!confirm("¿Borrar esta lista?")) return;
    await fetch(`${API_URL}/playlists/${id}`, { method: 'DELETE' });
    loadMyPlaylists();
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', loadMyPlaylists);