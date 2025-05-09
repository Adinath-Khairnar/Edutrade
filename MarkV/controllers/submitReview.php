<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->reviewer_id, $data->reviewee_id, $data->product_id, $data->rating, $data->review, $data->role)) {
    echo json_encode(["success" => false, "error" => "Incomplete review data"]);
    exit();
}

$reviewer_id = $data->reviewer_id;
$reviewee_id = $data->reviewee_id;
$product_id = $data->product_id;
$rating = $data->rating;
$review = $data->review;
$role = $data->role;

$sql = "INSERT INTO reviews (reviewer_id, reviewee_id, product_id, rating, review, role)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiiss", $reviewer_id, $reviewee_id, $product_id, $rating, $review, $role);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Review submitted successfully"]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
