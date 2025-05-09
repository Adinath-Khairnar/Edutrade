<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id ?? null;
$product_id = $data->product_id ?? null;

if (!$user_id || !$product_id) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// Check if database connection is successful
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Check if already favorited
$checkQuery = "SELECT * FROM favorites WHERE user_id = ? AND product_id = ? AND type = 'stationery'";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("ii", $user_id, $product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Already favorited → remove it
    $deleteQuery = "DELETE FROM favorites WHERE user_id = ? AND product_id = ? AND type = 'stationery'";
    $deleteStmt = $conn->prepare($deleteQuery);
    $deleteStmt->bind_param("ii", $user_id, $product_id);
    if ($deleteStmt->execute()) {
        echo json_encode(["success" => true, "favorited" => false, "message" => "Removed from favorites"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to remove from favorites"]);
    }
} else {
    // Not favorited → insert
    $insertQuery = "INSERT INTO favorites (user_id, product_id, type) VALUES (?, ?, 'stationery')";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("ii", $user_id, $product_id);
    if ($insertStmt->execute()) {
        echo json_encode(["success" => true, "favorited" => true, "message" => "Added to favorites"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add to favorites"]);
    }
}
?>
