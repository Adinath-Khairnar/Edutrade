<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

header("Content-Type: application/json");

// Database connection
$conn = new mysqli("localhost", "root", "", "edutrade");

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$product_id = $_GET['product_id'] ?? null;

if (!$product_id) {
    echo json_encode([]);
    exit;
}

$sql = "SELECT r.id, r.rating, r.review, r.created_at, u.full_name AS reviewer_name
        FROM reviews r
        JOIN users u ON r.reviewer_id = u.id
        WHERE r.product_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();

$reviews = [];

while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

echo json_encode($reviews);
?>
