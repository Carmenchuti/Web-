CREATE DATABASE IF NOT EXISTS musicapp;
USE musicapp;

-- =========================
-- LIMPIEZA (para poder re-ejecutar sin errores)
-- =========================
DROP TABLE IF EXISTS play_history;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS users;

-- =========================
-- TABLA: users
-- =========================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'USER',  -- 'ADMIN' o 'USER'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (username),
  UNIQUE (email)
);

-- =========================
-- TABLA: songs
-- (cover_path en la seed es URL completa)
-- (album puede ir NULL)
-- =========================
CREATE TABLE songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  artist VARCHAR(150) NOT NULL,
  album VARCHAR(150) NULL,
  duration_seconds INT NOT NULL,
  cover_path VARCHAR(500) NULL,     -- URL puede ser larga
  file_path VARCHAR(255) NOT NULL,  -- /uploads/audio/...
  genre VARCHAR(50) NOT NULL,
  purpose VARCHAR(50) NOT NULL,
  year_published INT NULL,
  license VARCHAR(30) NOT NULL,
  play_count INT NOT NULL DEFAULT 0,
  uploaded_by INT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLA: playlists
-- (cover_path opcional, no se usa en la seed pero se deja)
-- =========================
CREATE TABLE playlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_user_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500) NULL,
  cover_path VARCHAR(500) NULL,
  visibility VARCHAR(10) NOT NULL DEFAULT 'PRIVATE', -- 'PUBLIC' o 'PRIVATE'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLA: playlist_songs
-- (en la seed insertas playlist_id, song_id, position)
-- =========================
CREATE TABLE playlist_songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT NOT NULL,
  song_id INT NOT NULL,
  position INT NOT NULL
);

-- =========================
-- TABLA: favorites
-- =========================
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLA: play_history
-- =========================
CREATE TABLE play_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  played_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CLAVES FORÁNEAS (BÁSICAS)
-- =========================
ALTER TABLE songs
  ADD CONSTRAINT fk_songs_uploaded_by
  FOREIGN KEY (uploaded_by) REFERENCES users(id);

ALTER TABLE playlists
  ADD CONSTRAINT fk_playlists_owner
  FOREIGN KEY (owner_user_id) REFERENCES users(id);

ALTER TABLE playlist_songs
  ADD CONSTRAINT fk_playlist_songs_playlist
  FOREIGN KEY (playlist_id) REFERENCES playlists(id);

ALTER TABLE playlist_songs
  ADD CONSTRAINT fk_playlist_songs_song
  FOREIGN KEY (song_id) REFERENCES songs(id);

ALTER TABLE favorites
  ADD CONSTRAINT fk_favorites_user
  FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE favorites
  ADD CONSTRAINT fk_favorites_song
  FOREIGN KEY (song_id) REFERENCES songs(id);

ALTER TABLE play_history
  ADD CONSTRAINT fk_history_user
  FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE play_history
  ADD CONSTRAINT fk_history_song
  FOREIGN KEY (song_id) REFERENCES songs(id);
