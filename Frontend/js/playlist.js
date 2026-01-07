// --- GESTIÓN DE PLAYLISTS (VERSIÓN VISUAL MEJORADA) ---

// 1. CARGAR PLAYLISTS (PINTAR TARJETAS)
async function loadMyPlaylists() {
    const userId = 1; // ID temporal
    const container = document.getElementById('playlist-container');
    if(!container) return;

    try {
        const res = await fetch(`${API_URL}/playlists?userId=${userId}`);
        const playlists = await res.json();
        
        container.innerHTML = ''; // Limpiar

        // A. PRIMERO: Botón de "Crear Nueva" siempre al principio
        const createBtn = document.createElement('div');
        createBtn.className = 'create-card-btn';
        createBtn.onclick = createPlaylist;
        createBtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            <span>Nueva Playlist</span>
        `;
        container.appendChild(createBtn);

        // B. LUEGO: Las playlists del usuario
        playlists.forEach(pl => {
            const card = document.createElement('div');
            card.className = 'playlist-card';
            
            // Generamos un degradado aleatorio sutil para cada una
            // O usamos uno fijo si prefieres uniformidad
            const randomDeg = Math.floor(Math.random() * 360);
            
            card.innerHTML = `
                <div class="playlist-cover-placeholder" style="background: linear-gradient(${randomDeg}deg, #450af5, #c4efd9);">
                    <i class="fa-solid fa-music"></i>
                    
                    <button class="delete-btn-card" onclick="deletePlaylist(event, ${pl.id})" title="Borrar Playlist">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                
                <div class="playlist-info">
                    <h4>${pl.name}</h4>
                    <p>${pl.is_public ? 'Pública' : 'Privada'} • 0 canciones</p>
                </div>
            `;
            
            // Al hacer click en la tarjeta (menos en borrar), abriríamos la playlist
            // Por ahora solo muestra un alert
            card.onclick = (e) => {
                if(!e.target.closest('.delete-btn-card')) {
                    alert(`Abriendo playlist: ${pl.name}`);
                    // Aquí iría la lógica para ver las canciones de dentro
                }
            };

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando playlists", error);
    }
}

// 2. CREAR NUEVA PLAYLIST
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
        loadMyPlaylists(); // Recargar grid
    } catch (error) {
        alert("Error al crear playlist");
    }
}

// 3. AÑADIR CANCIÓN (Se mantiene igual)
async function promptAddToPlaylist(songId) {
    const playlistId = prompt("ID de la playlist (Míralo en consola o base de datos por ahora):");
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

// 4. BORRAR PLAYLIST
async function deletePlaylist(event, id) {
    event.stopPropagation(); // Evita que se abra la playlist al dar click en borrar
    if(!confirm("¿Seguro que quieres borrar esta playlist?")) return;

    await fetch(`${API_URL}/playlists/${id}`, { method: 'DELETE' });
    loadMyPlaylists();
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadMyPlaylists);