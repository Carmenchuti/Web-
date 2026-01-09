// js/ui.js

// =========================================
// 1. DATOS DE EJEMPLO (TUS CANCIONES REALES)
// =========================================
const cancionesMock = [
    { 
        titulo: "Fresh", 
        artista: "Bransboynd", 
        // Portada naranja estilo "Fresh"
        img: "https://placehold.co/300/ff9f43/ffffff?text=Fresh", 
        duracion: "2:06",
        url: "assets/audio/cancion1.mp3" 
    },
    { 
        titulo: "Music Free", 
        artista: "Audioknap", 
        // Portada azul estilo moderno
        img: "https://placehold.co/300/0abde3/ffffff?text=Music+Free", 
        duracion: "1:38",
        url: "assets/audio/cancion2.mp3" 
    },
    { 
        titulo: "Sweet Life", 
        artista: "AlexGhrol", 
        // Portada rosa estilo "Sweet"
        img: "https://placehold.co/300/ff9ff3/ffffff?text=Sweet+Life", 
        duracion: "1:42",
        url: "assets/audio/cancion3.mp3" 
    },
    { 
        titulo: "Hype Drill", 
        artista: "Kontraa", 
        // Portada roja estilo agresivo/drill
        img: "https://placehold.co/300/ee5253/ffffff?text=Hype+Drill", 
        duracion: "3:55",
        url: "assets/audio/cancion4.mp3" 
    },
    { 
        titulo: "Deep Abstract Ambient", 
        artista: "Umbrella", 
        // Portada morada estilo ambiente
        img: "https://placehold.co/300/5f27cd/ffffff?text=Ambient", 
        duracion: "1:38",
        url: "assets/audio/cancion5.mp3" 
    }
];

// =========================================
// 2. SELECCIÓN DE ELEMENTOS DEL DOM
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

// Procesar LOGIN (Simulado para facilitar la demo)
if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        entrarEnLaApp(email);
    });
}

// Procesar REGISTRO (Conectado a PHP)
if(registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Recoger datos del HTML
        const username = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // 2. Enviar a PHP (Backend)
        // Nota: Ajusta la ruta si 'php' está fuera de 'Frontend'
        // Si tu carpeta php está al mismo nivel que index.html, usa 'php/register.php'
        // Si tu carpeta php está un nivel arriba, usa '../php/register.php'
        const rutaPHP = 'php/register.php'; 

        fetch(rutaPHP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: username, 
                email: email, 
                password: password 
            })
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
            // Si falla la conexión, dejamos entrar en modo demo
            alert("Modo Demo: No se pudo conectar con la BD, pero entramos igual.");
            entrarEnLaApp(email);
        });
    });
}

// Función común para ENTRAR
function entrarEnLaApp(email) {
    authScreen.style.display = 'none';
    appInterface.style.display = 'grid';
    playerBar.style.display = 'flex';

    const nombreUsuario = email.split('@')[0];
    document.getElementById('username-display').textContent = 'Hola, ' + nombreUsuario;

    if(email.includes('admin')) {
        const adminMenu = document.getElementById('admin-menu-item');
        if(adminMenu) adminMenu.style.display = 'block';
        renderAdminTable();
    }

    cargarCanciones();
}

// =========================================
// 4. NAVEGACIÓN SPA
// =========================================
window.showSection = function(sectionId) {
    document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
    
    const target = document.getElementById('view-' + sectionId);
    if(target) target.style.display = 'block';

    const sidebar = document.querySelector('.sidebar');
    if(sidebar) sidebar.classList.remove('active');
};

// =========================================
// 5. GESTIÓN DE CANCIONES
// =========================================
function cargarCanciones() {
    const contenedor = document.getElementById('home-tracks');
    if(!contenedor) return;
    contenedor.innerHTML = ''; 

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
    card.addEventListener('click', () => {
        if(window.playTrack) window.playTrack(cancion);
    });
    return card;
}

// =========================================
// 6. BUSCADOR
// =========================================
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const resultados = cancionesMock.filter(cancion => 
            cancion.titulo.toLowerCase().includes(termino) || 
            cancion.artista.toLowerCase().includes(termino)
        );

        searchResults.innerHTML = ''; 
        
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
// 7. PANEL DE ADMINISTRADOR
// =========================================
function renderAdminTable() {
    if (!adminTableBody) return;
    adminTableBody.innerHTML = ''; 

    cancionesMock.forEach((cancion, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${cancion.img}" alt="cover" style="width:40px; border-radius:4px;"></td>
            <td>${cancion.titulo}</td>
            <td>${cancion.artista}</td>
            <td>
                <button class="action-btn btn-edit" onclick="alert('Función de editar simulada')">
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

window.borrarCancion = function(index) {
    if(confirm('¿Seguro que quieres eliminar esta canción del catálogo?')) {
        cancionesMock.splice(index, 1); 
        renderAdminTable(); 
        cargarCanciones();  
    }
};

if(adminForm) {
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nuevaCancion = {
            titulo: document.getElementById('admin-title').value,
            artista: document.getElementById('admin-artist').value,
            img: "https://placehold.co/300/grey/white?text=New", // Portada genérica
            duracion: document.getElementById('admin-duration').value,
            url: "" // Sin audio real para las nuevas subidas en demo
        };

        cancionesMock.push(nuevaCancion);
        renderAdminTable();
        cargarCanciones();
        
        alert('Canción añadida al catálogo con éxito (Solo visualmente en esta demo).');
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

const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        location.reload(); 
    });
}