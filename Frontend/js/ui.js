// js/ui.js - VERSIÓN CONECTADA A BASE DE DATOS REAL

// =========================================
// 1. VARIABLES GLOBALES
// =========================================
// Aquí guardaremos las canciones que vengan de la Base de Datos
let cancionesGlobal = []; 

// =========================================
// 2. ELEMENTOS DEL DOM
// =========================================
const authScreen = document.getElementById('auth-screen');
const appInterface = document.getElementById('app-interface');
const playerBar = document.getElementById('player-bar');

const loginView = document.getElementById('login-view');
const registerView = document.getElementById('register-view');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const adminTableBody = document.getElementById('admin-table-body');
const adminForm = document.getElementById('admin-upload-form');

// =========================================
// 3. LÓGICA DE AUTENTICACIÓN
// =========================================

// Alternar entre Login y Registro
if(showRegisterBtn && showLoginBtn){
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.style.display = 'none';
        registerView.style.display = 'block';
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerView.style.display = 'none';
        loginView.style.display = 'block';
    });
}

// PROCESAR LOGIN
if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // En una app real, aquí haríamos otro fetch a login.php
        // Para la demo, entramos directamente:
        entrarEnLaApp(email);
    });
}

// PROCESAR REGISTRO
if(registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // Ruta relativa al archivo PHP
        const rutaPHP = 'php/register.php'; 

        fetch(rutaPHP, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success") {
                alert("¡Usuario registrado en la Base de Datos con éxito!");
                entrarEnLaApp(email); 
            } else {
                alert("Error al registrar: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error de conexión con el servidor (PHP).");
        });
    });
}

// FUNCIÓN DE ENTRADA AL SISTEMA
function entrarEnLaApp(email) {
    authScreen.style.display = 'none';
    appInterface.style.display = 'grid';
    playerBar.style.display = 'flex';

    const nombreUsuario = email.split('@')[0];
    document.getElementById('username-display').textContent = 'Hola, ' + nombreUsuario;

    // Si es admin, mostramos menú
    if(email.includes('admin')) {
        const adminMenu = document.getElementById('admin-menu-item');
        if(adminMenu) adminMenu.style.display = 'block';
    }

    // ¡AQUÍ ESTÁ LA MAGIA! Cargamos desde la BD real
    cargarDesdeBD();
}

// =========================================
// 4. CONEXIÓN CON LA BASE DE DATOS (NUEVO)
// =========================================
function cargarDesdeBD() {
    console.log("Intentando conectar con la Base de Datos...");
    
    // Llamamos al archivo que acabas de crear
    fetch('php/canciones.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Canciones recibidas:", data);
            
            if(data.error) {
                alert("Error de BD: " + data.error);
                return;
            }

            // Guardamos los datos reales en la variable global
            cancionesGlobal = data;
            
            // Renderizamos la interfaz
            renderizarCanciones(cancionesGlobal);
            renderAdminTable(); // Si es admin, llena la tabla también
            
            // IMPORTANTE: Pasamos la lista al reproductor para que el botón 'Siguiente' funcione
            if(window.playTrack) {
                // Actualizamos la referencia interna del player.js si fuera necesario
                // (Para simplificar, player.js usaba cancionesMock, ahora lo adaptamos dinámicamente)
                window.cancionesMock = cancionesGlobal; 
            }
        })
        .catch(error => {
            console.error('Error al cargar canciones:', error);
            document.getElementById('home-tracks').innerHTML = '<p style="color:red">Error: No se pudo conectar con la base de datos. Revisa get_songs.php</p>';
        });
}

// =========================================
// 5. RENDERIZADO DE LA INTERFAZ
// =========================================
function renderizarCanciones(listaCanciones) {
    const contenedor = document.getElementById('home-tracks');
    if(!contenedor) return;
    contenedor.innerHTML = ''; 

    if(listaCanciones.length === 0) {
        contenedor.innerHTML = '<p>No hay canciones en la base de datos.</p>';
        return;
    }

    listaCanciones.forEach(cancion => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${cancion.img}" alt="${cancion.titulo}">
            <h4>${cancion.titulo}</h4>
            <p>${cancion.artista}</p>
        `;
        card.addEventListener('click', () => {
            if(window.playTrack) window.playTrack(cancion);
        });
        contenedor.appendChild(card);
    });
}

// =========================================
// 6. NAVEGACIÓN SPA
// =========================================
window.showSection = function(sectionId) {
    document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
    const target = document.getElementById('view-' + sectionId);
    if(target) target.style.display = 'block';
    
    const sidebar = document.querySelector('.sidebar');
    if(sidebar) sidebar.classList.remove('active');
};

// =========================================
// 7. BUSCADOR (FILTRA SOBRE LO DESCARGADO)
// =========================================
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        
        // Filtramos sobre la variable global cargada desde la BD
        const resultados = cancionesGlobal.filter(cancion => 
            cancion.titulo.toLowerCase().includes(termino) || 
            cancion.artista.toLowerCase().includes(termino)
        );

        searchResults.innerHTML = ''; 
        
        if(resultados.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron resultados.</p>';
        } else {
            resultados.forEach(cancion => {
                // Reutilizamos lógica de tarjeta
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${cancion.img}" alt="${cancion.titulo}">
                    <h4>${cancion.titulo}</h4>
                    <p>${cancion.artista}</p>
                `;
                card.addEventListener('click', () => {
                    if(window.playTrack) window.playTrack(cancion);
                });
                searchResults.appendChild(card);
            });
        }
    });
}

// =========================================
// 8. PANEL DE ADMINISTRADOR
// =========================================
function renderAdminTable() {
    if (!adminTableBody) return;
    adminTableBody.innerHTML = ''; 

    cancionesGlobal.forEach((cancion, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${cancion.img}" alt="cover" style="width:40px; border-radius:4px;"></td>
            <td>${cancion.titulo}</td>
            <td>${cancion.artista}</td>
            <td>
                <button class="action-btn btn-delete" onclick="borrarCancion(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        adminTableBody.appendChild(row);
    });
}

// Nota: El borrado aquí es visual para la demo. 
// Para borrar de BD real necesitaríamos 'delete_song.php'
window.borrarCancion = function(index) {
    if(confirm('¿Eliminar de la lista? (Solo visualmente en esta demo)')) {
        cancionesGlobal.splice(index, 1);
        renderAdminTable(); 
        renderizarCanciones(cancionesGlobal);  
    }
};

// =========================================
// 9. INTERFAZ MÓVIL Y UTILS
// =========================================
const menuToggle = document.getElementById('menu-toggle');
if(menuToggle){
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        location.reload(); 
    });
}