<?php
// Archivo: php/get_songs.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// 1. Conexión a la Base de Datos
$mysqli = new mysqli("127.0.0.1", "root", "", "musicapp");

if ($mysqli->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit();
}

// 2. Pedir las canciones
$sql = "SELECT * FROM songs";
$result = $mysqli->query($sql);

$songs = [];

// 3. Convertirlas al formato que entiende JS
while($row = $result->fetch_assoc()) {
    $songs[] = array(
        'titulo' => $row['title'],
        'artista' => $row['artist'],
        'img' => $row['cover_path'],
        // Convertimos segundos a formato mm:ss (ej: 126 seg -> 02:06)
        'duracion' => gmdate("i:s", $row['duration_seconds']),
        'url' => $row['file_path']
    );
}

// 4. Enviar JSON
echo json_encode($songs);
?>