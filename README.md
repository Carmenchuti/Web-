🎵 MusicApp - Plataforma de Gestión de Playlists

Asignatura: Proyecto de Desarrollo Web
Grupo: M31 - Grado de Ingeniería Informática
Fecha de Entrega: 09 de enero de 2026
1. 📋 Descripción del Proyecto

MusicApp es una aplicación web completa y responsive diseñada para la gestión de música y listas de reproducción.
El objetivo del proyecto es permitir a los usuarios gestionar un catálogo musical, crear playlists personalizadas (públicas y privadas) y reproducir audio en streaming.

El desarrollo se ha realizado desde cero, sin utilizar frameworks de frontend (como React o Vue) ni de backend pesado, aplicando conocimientos fundamentales de la arquitectura Cliente-Servidor y APIs REST.

Funcionalidades Principales
	•	Autenticación: Registro e inicio de sesión seguro (Roles: Admin y User).
	•	Gestión de Catálogo (Admin): Subida de archivos MP3 y portadas, edición y borrado de canciones.
	•	Gestión de Playlists: CRUD completo (Crear, Leer, Actualizar, Borrar).
	•	Reproductor: Reproducción de audio HTML5 con barra de progreso interactiva.
	•	Búsqueda y Filtros: Búsqueda en tiempo real por título/artista y filtrado por género.

⸻

2. 🛠️ Tecnologías Utilizadas

El proyecto sigue el stack tecnológico solicitado en la propuesta:

Frontend
	•	HTML5 (Semántico).
	•	CSS3 (Diseño Responsive, Flexbox, Grid, Variables CSS).
	•	JavaScript Vanilla (ES6+, Fetch API, Manipulación del DOM).

Backend
	•	Node.js (Entorno de ejecución).
	•	Express.js (Servidor web y API REST).
	•	Multer (Gestión de subida de archivos multimedia).

Base de Datos
	•	MySQL (Base de datos relacional).

Seguridad
	•	Bcrypt (Hashing de contraseñas).
	•	Cors (Gestión de acceso de origen cruzado).

⸻

3. ⚙️ Requisitos del Sistema

Para ejecutar este proyecto en local, necesitas tener instalado:
	1.	Node.js (v16 o superior)
https://nodejs.org/
	2.	MySQL Server (v8.0 o superior)
https://dev.mysql.com/downloads/
	3.	Git (para clonar el repositorio).

⸻

4. 🚀 Instrucciones de Instalación y Ejecución

Sigue estos pasos detallados para poner en marcha el proyecto:

Paso 1: Clonar el repositorio
git clone https://github.com/TU_USUARIO/WEB-.git
cd WEB-
Paso 2: Instalar Dependencias

Instala las librerías necesarias definidas en el package.json:
npm install
Paso 3: Configuración de la Base de Datos
	1.	Abre tu gestor de base de datos (MySQL Workbench, phpMyAdmin o Terminal).
	2.	Crea una base de datos vacía llamada music_platform.
	3.	Importa/Ejecuta el script SQL ubicado en database/schema.sql.
	4.	(Opcional) Verifica que el archivo Backend/config/database.js tiene la contraseña correcta de tu MySQL local.

Paso 4: Ejecutar el Servidor
npm start
La terminal mostrará:
Servidor corriendo en puerto 3000.
Paso 5: Abrir la Aplicación

Abre el archivo Frontend/index.html en tu navegador.
Recomendación: usar la extensión Live Server de VS Code.
5. 👥 Credenciales de Prueba
Para facilitar la corrección, se han creado los siguientes usuarios por defecto:
* **Administrador:**
    * User: `admin`
    * Pass: `admin123`
* **Usuario Estándar:**
    * User: `usuario`
    * Pass: `usuario123`
6. 📂 Estructura del Proyecto
WEB-/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── database/
│   └── schema.sql
├── Frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   │   ├── app.js
│   │   ├── admin.js
│   │   ├── player.js
│   │   ├── playlists.js
│   │   └── ui.js
│   ├── index.html
│   └── admin.html
├── package.json
└── README.md
7. 🗄️ Documentación de Base de Datos
	•	users: credenciales y roles (Admin / User).
	•	songs: catálogo musical (título, artista, género, rutas).
	•	playlists: listas creadas por los usuarios.
	•	playlist_songs: relación N:M entre playlists y canciones.

⸻

8. 📸 Capturas de Pantalla
Vista Principal y Reproductor
Panel de Administración
Gestión de Playlists
9. ⚖️ Licencias y Créditos

Música: Canciones con licencia CC0 o Creative Commons, uso educativo.
Ver archivo MUSIC_LICENSES.md.

Código: Desarrollado por el Grupo M31.

Autores
	•	Pablo Embil – Backend & Base de Datos
	•	Javier Belloch – Frontend & UI
	•	Carmen Bolaños – Lógica de Negocio & Integración