<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$product_id = $data["product_id"];
$type = $data["type"] ?? "book"; // Default to 'book' if not provided

$conn = new mysqli("localhost", "root", "", "edutrade");
mysqli_query($conn, "SET FOREIGN_KEY_CHECKS=0");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit();
}

// Check if already favorited for the specific type
$checkQuery = "SELECT * FROM favorites WHERE user_id = ? AND product_id = ? AND type = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("iis", $user_id, $product_id, $type);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Remove from favorites
    $deleteQuery = "DELETE FROM favorites WHERE user_id = ? AND product_id = ? AND type = ?";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param("iis", $user_id, $product_id, $type);
    $stmt->execute();
    echo json_encode(["success" => true, "action" => "removed"]);
} else {
    // Add to favorites
    $insertQuery = "INSERT INTO favorites (user_id, product_id, type) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("iis", $user_id, $product_id, $type);
    $stmt->execute();
    echo json_encode(["success" => true, "action" => "added"]);
}
$conn->close();
?>
