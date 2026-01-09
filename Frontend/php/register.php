<?php
// Archivo: Frontend/php/register.php

// 1. Cabeceras para que JS entienda la respuesta
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// 2. Conexión a la Base de Datos (Mismos datos que canciones.php)
$host = "127.0.0.1";
$usuario = "root";
$password = "";      // En Mac con XAMPP suele ser vacío
$base_datos = "musicapp";

$conn = new mysqli($host, $usuario, $password, $base_datos);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Fallo de conexión: " . $conn->connect_error]);
    exit();
}

// 3. Recibir los datos del formulario (JSON)
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email']) || !isset($input['password']) || !isset($input['username'])) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit();
}

$username = $conn->real_escape_string($input['username']);
$email = $conn->real_escape_string($input['email']);
// Encriptamos la contraseña para seguridad (Requisito del proyecto)
$password_hash = password_hash($input['password'], PASSWORD_DEFAULT);

// 4. Comprobar si el email ya existe
$check = "SELECT id FROM users WHERE email = '$email'";
$result = $conn->query($check);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Este email ya está registrado"]);
    exit();
}

// 5. Insertar el nuevo usuario (Rol USER por defecto)
$sql = "INSERT INTO users (username, email, password_hash, role) VALUES ('$username', '$email', '$password_hash', 'USER')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Usuario creado"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error SQL: " . $conn->error]);
}

$conn->close();
?>