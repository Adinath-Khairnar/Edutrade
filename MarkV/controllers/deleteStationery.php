<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$product_id = $data['product_id'] ?? null;
$user_id = $data['user_id'] ?? null;

if (!$product_id || !$user_id) {
    echo json_encode(["status" => "error", "message" => "Missing required parameters"]);
    exit;
}

// Verify the stationery item belongs to the user before deleting
$verifyQuery = "SELECT product_id FROM stationery_items WHERE product_id = $product_id AND user_id = $user_id";
$verifyResult = mysqli_query($conn, $verifyQuery);

if (mysqli_num_rows($verifyResult) === 0) {
    echo json_encode(["status" => "error", "message" => "Item not found or you don't have permission to delete it"]);
    exit;
}

// Delete the stationery item
$deleteQuery = "DELETE FROM stationery_items WHERE product_id = $product_id";
$deleteResult = mysqli_query($conn, $deleteQuery);

if ($deleteResult) {
    echo json_encode(["status" => "success", "message" => "Stationery item deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete stationery item"]);
}