USE musicapp;

-- =========================
-- USUARIOS
-- =========================
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@musicapp.local', 'admin1234', 'ADMIN'),
('maria', 'maria@musicapp.local', 'maria1234', 'USER'),
('juan',  'juan@musicapp.local',  'juan1234',  'USER');

-- =========================
-- CANCIONES
-- =========================
INSERT INTO songs
(title, artist, duration_seconds, cover_path, file_path, genre, purpose, year_published, license, uploaded_by)
VALUES
('Bohemian Rhapsody', 'Queen', 355,
 'https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png',
 '/uploads/audio/bohemian_rhapsody.mp3',
 'Rock', 'escuchar', 1975, 'Public Domain', 1),

('Blinding Lights', 'The Weeknd', 200,
 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png',
 '/uploads/audio/blinding_lights.mp3',
 'Pop', 'ejercicio', 2019, 'CC BY', 1),

('Bad Guy', 'Billie Eilish', 194,
 'https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png',
 '/uploads/audio/bad_guy.mp3',
 'Pop', 'escuchar', 2019, 'CC BY', 1);

-- =========================
-- PLAYLISTS
-- =========================
INSERT INTO playlists (owner_user_id, name, description, visibility) VALUES
(2, 'Mis favoritas', 'Canciones que más me gustan', 'PRIVATE'),
(1, 'Top MusicApp', 'Selección del administrador', 'PUBLIC');

-- =========================
-- PLAYLIST_SONGS
-- =========================
INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES
-- Mis favoritas
(1, 1, 1),
(1, 3, 2),

-- Top MusicApp
(2, 1, 1),
(2, 2, 2),
(2, 3, 3);

-- =========================
-- FAVORITOS
-- =========================
INSERT INTO favorites (user_id, song_id) VALUES
(2, 1),
(2, 3);

-- =========================
-- HISTORIAL DE REPRODUCCIÓN
-- =========================
INSERT INTO play_history (user_id, song_id) VALUES
(2, 1),
(2, 1),
(2, 3),
(3, 2);
