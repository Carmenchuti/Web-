USE musicapp;

-- Desactivar chequeo de claves temporalmente para evitar errores de orden
SET FOREIGN_KEY_CHECKS = 0;

-- =========================
-- 1. LIMPIAR TABLAS (TRUNCATE)
-- Esto reinicia los contadores a 1 y borra los datos viejos
-- =========================
TRUNCATE TABLE play_history;
TRUNCATE TABLE favorites;
TRUNCATE TABLE playlist_songs;
TRUNCATE TABLE playlists;
TRUNCATE TABLE songs;
TRUNCATE TABLE users;

-- =========================
-- 2. INSERTAR USUARIOS (Con ID forzado)
-- =========================
INSERT INTO users (id, username, email, password_hash, role) VALUES
(1, 'admin', 'admin@musicapp.local', '$2b$10$8K1p/a0dL1e3q.w2r.5.e.12345678hashfalsoPARAPRUEBAS', 'ADMIN'),
(2, 'maria', 'maria@musicapp.local', '$2b$10$8K1p/a0dL1e3q.w2r.5.e.12345678hashfalsoPARAPRUEBAS', 'USER'),
(3, 'juan',  'juan@musicapp.local',  '$2b$10$8K1p/a0dL1e3q.w2r.5.e.12345678hashfalsoPARAPRUEBAS', 'USER'),
(4, 'lucia', 'lucia@musicapp.local', '$2b$10$8K1p/a0dL1e3q.w2r.5.e.12345678hashfalsoPARAPRUEBAS', 'USER');

-- =========================
-- 3. INSERTAR CANCIONES (Con ID forzado)
-- =========================
INSERT INTO songs
(id, title, artist, duration_seconds, cover_path, file_path, genre, purpose, year_published, license, uploaded_by)
VALUES
(1, 'Bohemian Rhapsody', 'Queen', 355,
 'https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png',
 'uploads/audio/bohemian_rhapsody.mp3',
 'Rock', 'escuchar', 1975, 'Public Domain', 1),

(2, 'Blinding Lights', 'The Weeknd', 200,
 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png',
 'uploads/audio/blinding_lights.mp3',
 'Pop', 'ejercicio', 2019, 'CC BY', 1),

(3, 'Bad Guy', 'Billie Eilish', 194,
 'https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png',
 'uploads/audio/bad_guy.mp3',
 'Pop', 'escuchar', 2019, 'CC BY', 1),

(4, 'Uptown Funk', 'Mark Ronson', 270,
 'https://upload.wikimedia.org/wikipedia/en/a/a7/Mark_Ronson_-_Uptown_Funk.png',
 'uploads/audio/uptown_funk.mp3',
 'Pop', 'fiesta', 2014, 'CC BY', 1),

(5, 'Lose Yourself', 'Eminem', 326,
 'https://upload.wikimedia.org/wikipedia/en/8/8b/Lose_Yourself.jpg',
 'uploads/audio/lose_yourself.mp3',
 'Urbano', 'motivacion', 2002, 'CC BY', 1),

(6, 'Take Five', 'Dave Brubeck', 324,
 'https://upload.wikimedia.org/wikipedia/en/9/9c/Time_out_album_cover.png',
 'uploads/audio/take_five.mp3',
 'Jazz', 'estudio', 1959, 'CC BY', 1);

-- =========================
-- 4. INSERTAR PLAYLISTS (Con ID forzado)
-- =========================
INSERT INTO playlists (id, owner_user_id, name, description, visibility) VALUES
(1, 2, 'Mis favoritas', 'Canciones que más me gustan', 'PRIVATE'),
(2, 3, 'Para entrenar', 'Música para hacer deporte', 'PRIVATE'),
(3, 1, 'Top MusicApp', 'Selección del administrador', 'PUBLIC');

-- =========================
-- 5. RELACIONES (Ahora sí funcionarán)
-- =========================

-- Canciones dentro de las playlists
INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES
(1, 1, 1), (1, 3, 2), (1, 6, 3), -- Playlist 1
(2, 2, 1), (2, 4, 2), (2, 5, 3), -- Playlist 2
(3, 1, 1), (3, 2, 2), (3, 5, 3); -- Playlist 3

-- Favoritos (Aquí es donde te daba el error antes)
INSERT INTO favorites (user_id, song_id) VALUES
(2, 1), (2, 3), -- Usuario 2 existe seguro
(3, 5),         -- Usuario 3 existe seguro
(4, 2);         -- Usuario 4 existe seguro

-- Historial
INSERT INTO play_history (user_id, song_id) VALUES
(2, 1), (2, 1), (2, 3),
(3, 5), (3, 5),
(4, 2);

-- Reactivar chequeo de claves
SET FOREIGN_KEY_CHECKS = 1;
