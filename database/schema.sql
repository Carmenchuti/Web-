-- =========================================
-- INICIALIZACIÓN COMPLETA DE LA BASE DE DATOS
-- =========================================

CREATE DATABASE IF NOT EXISTS musicapp;
USE musicapp;

-- Evitar errores por claves foráneas
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar tablas si existen
DROP TABLE IF EXISTS play_history;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================
-- TABLA: users
-- =========================================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'USER',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (username),
  UNIQUE (email)
);

-- =========================================
-- TABLA: songs
-- =========================================
CREATE TABLE songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  artist VARCHAR(150) NOT NULL,
  duration_seconds INT NOT NULL,
  cover_path VARCHAR(500),
  file_path VARCHAR(255) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  purpose VARCHAR(50) NOT NULL,
  year_published INT,
  license VARCHAR(30) NOT NULL,
  play_count INT NOT NULL DEFAULT 0,
  uploaded_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLA: playlists
-- =========================================
CREATE TABLE playlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_user_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500),
  visibility VARCHAR(10) NOT NULL DEFAULT 'PRIVATE',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLA: playlist_songs
-- =========================================
CREATE TABLE playlist_songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT NOT NULL,
  song_id INT NOT NULL,
  position INT NOT NULL
);

-- =========================================
-- TABLA: favorites
-- =========================================
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLA: play_history
-- =========================================
CREATE TABLE play_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  played_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- CLAVES FORÁNEAS
-- =========================================
ALTER TABLE songs
  ADD FOREIGN KEY (uploaded_by) REFERENCES users(id);

ALTER TABLE playlists
  ADD FOREIGN KEY (owner_user_id) REFERENCES users(id);

ALTER TABLE playlist_songs
  ADD FOREIGN KEY (playlist_id) REFERENCES playlists(id),
  ADD FOREIGN KEY (song_id) REFERENCES songs(id);

ALTER TABLE favorites
  ADD FOREIGN KEY (user_id) REFERENCES users(id),
  ADD FOREIGN KEY (song_id) REFERENCES songs(id);

ALTER TABLE play_history
  ADD FOREIGN KEY (user_id) REFERENCES users(id),
  ADD FOREIGN KEY (song_id) REFERENCES songs(id);

-- =========================================
-- DATOS DE EJEMPLO
-- =========================================

INSERT INTO users (id, username, email, password_hash, role) VALUES
(1, 'admin', 'admin@musicapp.local', 'admin1234', 'ADMIN'),
(2, 'maria', 'maria@musicapp.local', 'maria1234', 'USER'),
(3, 'juan',  'juan@musicapp.local',  'juan1234',  'USER');

INSERT INTO songs
(id, title, artist, duration_seconds, cover_path, file_path, genre, purpose, year_published, license, uploaded_by)
VALUES
(1, 'Bohemian Rhapsody', 'Queen', 355,
 'https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png',
 '/uploads/audio/bohemian_rhapsody.mp3',
 'Rock', 'escuchar', 1975, 'Public Domain', 1),

(2, 'Blinding Lights', 'The Weeknd', 200,
 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png',
 '/uploads/audio/blinding_lights.mp3',
 'Pop', 'ejercicio', 2019, 'CC BY', 1),

(3, 'Bad Guy', 'Billie Eilish', 194,
 'https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png',
 '/uploads/audio/bad_guy.mp3',
 'Pop', 'escuchar', 2019, 'CC BY', 1);

INSERT INTO playlists (id, owner_user_id, name, description, visibility) VALUES
(1, 2, 'Mis favoritas', 'Canciones que más me gustan', 'PRIVATE'),
(2, 1, 'Top MusicApp', 'Selección del administrador', 'PUBLIC');

INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 1, 1),
(2, 2, 2),
(2, 3, 3);

INSERT INTO favorites (user_id, song_id) VALUES
(2, 1),
(2, 3);

INSERT INTO play_history (user_id, song_id) VALUES
(2, 1),
(2, 1),
(2, 3),
(3, 2);
