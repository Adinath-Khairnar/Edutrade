<?php
// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// Your existing code below...
$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["error" => "User ID missing"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "edutrade");
$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["error" => "User ID missing"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "edutrade");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

$sql = "SELECT id, full_name, email, phone, location FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user); // ✅ THIS is valid JSON
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
