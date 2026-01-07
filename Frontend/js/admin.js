// Escuchar envío del formulario de subida
const form = document.getElementById('uploadForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        // FormData coge automáticamente los archivos y textos del form

        try {
            const res = await fetch(`${API_URL}/songs/upload`, {
                method: 'POST',
                body: formData // Importante: NO poner cabeceras manuales aquí
            });

            if (res.ok) {
                alert('¡Canción subida con éxito!');
                form.reset();
                if(typeof loadCatalog === 'function') loadCatalog(); // Actualizar home
            } else {
                const data = await res.json();
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión');
        }
    });
}