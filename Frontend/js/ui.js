// =========================================
// 1. DATOS DE EJEMPLO (Simulación de BD)
// =========================================
const cancionesMock = [
    { titulo: "Bohemian Rhapsody", artista: "Queen", img: "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png", duracion: "5:55" },
    { titulo: "Blinding Lights", artista: "The Weeknd", img: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png", duracion: "3:20" },
    { titulo: "Himno de la Décima", artista: "Real Madrid", img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png", duracion: "4:05" }, // ¡Hala Madrid!
    { titulo: "Bad Guy", artista: "Billie Eilish", img: "https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png", duracion: "3:14" },
    { titulo: "Uptown Funk", artista: "Mark Ronson", img: "https://upload.wikimedia.org/wikipedia/en/a/a7/Mark_Ronson_-_Uptown_Funk_%28feat._Bruno_Mars%29_%28Official_Single_Cover%29.png", duracion: "4:30" },
];

// =========================================
// 2. SELECCIÓN DE ELEMENTOS DEL DOM
// =========================================
// Pantallas principales
const authScreen = document.getElementById('auth-screen');
const appInterface = document.getElementById('app-interface');
const playerBar = document.getElementById('player-bar');

// Formularios y Vistas de Auth
const loginView = document.getElementById('login-view');
const registerView = document.getElementById('register-view');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Botones de cambio Auth
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

// Elementos de la App
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const adminTableBody = document.getElementById('admin-table-body');
const adminForm = document.getElementById('admin-upload-form');

// =========================================
// 3. LÓGICA DE AUTENTICACIÓN (LOGIN/REGISTRO)
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

// Procesar LOGIN
if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        entrarEnLaApp(email);
    });
}

// Procesar REGISTRO
if(registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert("¡Cuenta creada correctamente! (Simulación)");
        entrarEnLaApp(email);
    });
}

// Función común para ENTRAR
function entrarEnLaApp(email) {
    // 1. Ocultar pantalla de carga y mostrar app
    authScreen.style.display = 'none';
    appInterface.style.display = 'grid';
    playerBar.style.display = 'flex';

    // 2. Mostrar nombre de usuario
    const nombreUsuario = email.split('@')[0];
    document.getElementById('username-display').textContent = 'Hola, ' + nombreUsuario;

    // 3. Comprobar si es ADMIN
    if(email.includes('admin')) {
        document.getElementById('admin-menu-item').style.display = 'block';
        renderAdminTable(); // Cargar la tabla de gestión
    }

    // 4. Cargar canciones en Inicio
    cargarCanciones();
}


// =========================================
// 4. NAVEGACIÓN SPA (Single Page Application)
// =========================================
window.showSection = function(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
    
    // Mostrar la seleccionada
    const target = document.getElementById('view-' + sectionId);
    if(target) target.style.display = 'block';

    // Cerrar menú móvil si está abierto
    const sidebar = document.querySelector('.sidebar');
    if(sidebar) sidebar.classList.remove('active');
};


// =========================================
// 5. GESTIÓN DE CANCIONES (Renderizado)
// =========================================
function cargarCanciones() {
    const contenedor = document.getElementById('home-tracks');
    if(!contenedor) return;
    contenedor.innerHTML = ''; // Limpiar

    cancionesMock.forEach(cancion => {
        const card = crearTarjetaCancion(cancion);
        contenedor.appendChild(card);
    });
}

function crearTarjetaCancion(cancion) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${cancion.img}" alt="${cancion.titulo}">
        <h4>${cancion.titulo}</h4>
        <p>${cancion.artista}</p>
    `;
    // Al hacer click, llamar a la función playTrack (en player.js)
    card.addEventListener('click', () => {
        if(window.playTrack) window.playTrack(cancion);
    });
    return card;
}


// =========================================
// 6. BUSCADOR EN TIEMPO REAL
// =========================================
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const resultados = cancionesMock.filter(cancion => 
            cancion.titulo.toLowerCase().includes(termino) || 
            cancion.artista.toLowerCase().includes(termino)
        );

        searchResults.innerHTML = ''; // Limpiar
        
        if(resultados.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron resultados.</p>';
        } else {
            resultados.forEach(cancion => {
                searchResults.appendChild(crearTarjetaCancion(cancion));
            });
        }
    });
}


// =========================================
// 7. PANEL DE ADMINISTRADOR (Gestión CRUD)
// =========================================

// Renderizar tabla
function renderAdminTable() {
    if (!adminTableBody) return;
    adminTableBody.innerHTML = ''; 

    cancionesMock.forEach((cancion, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${cancion.img}" alt="cover"></td>
            <td>${cancion.titulo}</td>
            <td>${cancion.artista}</td>
            <td>
                <button class="action-btn btn-edit" onclick="alert('Editar: ${cancion.titulo}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="action-btn btn-delete" onclick="borrarCancion(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        adminTableBody.appendChild(row);
    });
}

// Borrar canción (Global para que el HTML lo vea)
window.borrarCancion = function(index) {
    if(confirm('¿Seguro que quieres eliminar esta canción del catálogo?')) {
        cancionesMock.splice(index, 1); // Eliminar del array
        renderAdminTable(); // Actualizar tabla
        cargarCanciones();  // Actualizar vista inicio
    }
};

// Subir canción
if(adminForm) {
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nuevaCancion = {
            titulo: document.getElementById('admin-title').value,
            artista: document.getElementById('admin-artist').value,
            img: document.getElementById('admin-img').value || 'https://via.placeholder.com/150',
            duracion: document.getElementById('admin-duration').value
        };

        cancionesMock.push(nuevaCancion);
        renderAdminTable();
        cargarCanciones();
        
        alert('Canción añadida al catálogo con éxito.');
        adminForm.reset();
    });
}


// =========================================
// 8. INTERFAZ MÓVIL
// =========================================
const menuToggle = document.getElementById('menu-toggle');
if(menuToggle){
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

// Botón de salir
document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload(); // Recargar página para "salir"
});