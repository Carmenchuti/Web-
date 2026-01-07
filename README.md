# Proyecto de Gestión de Playlists Musicales

Este proyecto es una aplicación web completa y responsive para la gestión de playlists y reproducción de música. Desarrollado como proyecto final para la asignatura de Desarrollo Web del Grupo M31.

## 📋 Descripción
La aplicación permite a los usuarios registrarse, explorar un catálogo musical, crear playlists personalizadas y reproducir música. Incluye un panel de administración para gestionar el catálogo de canciones. El proyecto ha sido desarrollado desde cero utilizando HTML, CSS y JavaScript Vanilla (sin frameworks), con un backend en Node.js.

## 🛠️ Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Backend:** Node.js, Express.
* **Base de Datos:** MySQL.
* **Seguridad:** Bcrypt (hashing de contraseñas), protección contra SQL Injection.

## ⚙️ Requisitos del Sistema
Para ejecutar este proyecto necesitas tener instalado:
* Node.js (v14 o superior).
* MySQL Server.
* Navegador web moderno (Chrome, Firefox, Edge).

## 🚀 Instalación Paso a Paso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Carmenchuti/Web-.git](https://github.com/Carmenchuti/Web-.git)
    cd Web-
    ```
   

2.  **Instalar dependencias del servidor:**
    Ve a la carpeta raíz (o donde esté el package.json) y ejecuta:
    ```bash
    npm install
    ```

3.  **Configurar la Base de Datos:**
    * Abre tu gestor de MySQL (Workbench, phpMyAdmin, o terminal).
    * Crea una base de datos llamada `music_platform`.
    * Importa el archivo `database/schema.sql` para crear las tablas automáticamente.
    * *(Opcional)*: Asegúrate de configurar las credenciales de tu base de datos en el archivo `Backend/database.js`.

4.  **Ejecutar el servidor:**
    ```bash
    npm start
    ```
    El servidor arrancará en `http://localhost:3000`.

## 👥 Credenciales de Prueba
Para facilitar la corrección, se han creado los siguientes usuarios por defecto:

* **Administrador:**
    * User: `admin`
    * Pass: `admin123`
* **Usuario Estándar:**
    * User: `usuario`
    * Pass: `usuario123`

## 📂 Estructura del Proyecto

```text
/
├── Backend/
│   ├── config/       # Configuración de BD
│   ├── controllers/  # Lógica del servidor
│   ├── routes/       # Definición de rutas API
│   └── uploads/      # Archivos MP3 e imágenes subidos
├── database/
│   └── schema.sql    # Script de creación de tablas
├── Frontend/
│   ├── assets/       # Imágenes estáticas
│   ├── css/          # Hoja de estilos principal
│   ├── js/           # Lógica del cliente (Player, App, Admin)
│   ├── index.html    # Página principal
│   └── admin.html    # Panel de administración
└── README.md         # Documentación