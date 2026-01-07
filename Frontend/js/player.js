// =========================================
// 1. VARIABLES DE ESTADO
// =========================================
let isPlaying = false;
let currentProgress = 0;      // Progreso actual (0 a 100)
let progressInterval = null;  // Para el temporizador
let currentSongIndex = 0;     // Índice de la canción actual

// =========================================
// 2. ELEMENTOS DEL DOM
// =========================================
const playBtn = document.getElementById('play-pause-btn');
const playIcon = playBtn ? playBtn.querySelector('i') : null;
const prevBtn = document.querySelector('.controls button:first-child');
const nextBtn = document.querySelector('.controls button:last-child');

const progressBar = document.getElementById('progress-slider');
const currTimeText = document.getElementById('current-time');
const totTimeText = document.getElementById('total-duration');

const coverImg = document.getElementById('current-cover');
const titleText = document.getElementById('current-title');
const artistText = document.getElementById('current-artist');

// =========================================
// 3. FUNCIÓN PRINCIPAL: REPRODUCIR (Desde UI)
// =========================================
// Esta función se llama desde ui.js al hacer click en una tarjeta
window.playTrack = function(cancion) {
    // 1. Buscar el índice de la canción en la lista global (si existe)
    if (typeof cancionesMock !== 'undefined') {
        currentSongIndex = cancionesMock.indexOf(cancion);
    }

    // 2. Cargar datos visuales
    cargarDatosVisuales(cancion);

    // 3. Resetear y arrancar
    currentProgress = 0;
    progressBar.value = 0;
    currTimeText.textContent = "0:00";
    
    playAudio(); // Iniciar simulación
};

function cargarDatosVisuales(cancion) {
    titleText.textContent = cancion.titulo;
    artistText.textContent = cancion.artista;
    coverImg.src = cancion.img;
    totTimeText.textContent = cancion.duracion;
}

// =========================================
// 4. CONTROLES DE REPRODUCCIÓN
// =========================================

// Botón Play/Pause
if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (isPlaying) pauseAudio();
        else playAudio();
    });
}

function playAudio() {
    isPlaying = true;
    // Cambiar icono a Pausa
    if(playIcon) {
        playIcon.classList.remove('fa-circle-play');
        playIcon.classList.add('fa-circle-pause');
    }
    // Iniciar barra de progreso
    startProgressTimer();
}

function pauseAudio() {
    isPlaying = false;
    // Cambiar icono a Play
    if(playIcon) {
        playIcon.classList.remove('fa-circle-pause');
        playIcon.classList.add('fa-circle-play');
    }
    // Parar barra
    clearInterval(progressInterval);
}

// Botón Siguiente (Next)
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (typeof cancionesMock === 'undefined') return;
        
        // Calcular siguiente índice (circular)
        currentSongIndex++;
        if (currentSongIndex >= cancionesMock.length) {
            currentSongIndex = 0; // Volver al principio
        }
        window.playTrack(cancionesMock[currentSongIndex]);
    });
}

// Botón Anterior (Prev)
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (typeof cancionesMock === 'undefined') return;

        // Calcular índice anterior
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = cancionesMock.length - 1; // Ir al final
        }
        window.playTrack(cancionesMock[currentSongIndex]);
    });
}

// =========================================
// 5. BARRA DE PROGRESO (SIMULACIÓN)
// =========================================
function startProgressTimer() {
    // Limpiar intervalo anterior para evitar dobles velocidades
    clearInterval(progressInterval);

    progressInterval = setInterval(() => {
        if (currentProgress >= 100) {
            // Canción terminada: pasar a la siguiente
            nextBtn.click(); 
            return;
        }

        // Avanzar la barra (Simulación: 1% cada 500ms para que se vea fluido)
        currentProgress += 0.5; 
        progressBar.value = currentProgress;

        // Actualizar tiempo actual (Simulado basado en % y duración fake)
        actualizarTiempoTexto(currentProgress);

    }, 500); // Velocidad de actualización
}

// Permitir al usuario mover la barra manual
if (progressBar) {
    progressBar.addEventListener('input', (e) => {
        currentProgress = parseFloat(e.target.value);
        actualizarTiempoTexto(currentProgress);
    });
}

// Función auxiliar para formatear MM:SS falso
function actualizarTiempoTexto(progreso) {
    // Simulamos que el 100% son 4 minutos (240 segundos)
    const segundosTotalesSimulados = 240; 
    const segundosActuales = Math.floor((progreso / 100) * segundosTotalesSimulados);
    
    const mins = Math.floor(segundosActuales / 60);
    const secs = segundosActuales % 60;
    
    currTimeText.textContent = ⁠ ${mins}:${secs < 10 ? '0' : ''}${secs} ⁠;
}