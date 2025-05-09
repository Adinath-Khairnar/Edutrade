<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include '../config/db.php'; // Adjust path if needed

header('Content-Type: application/json');

$sellerId = $_GET['seller_id'];

$sql = "SELECT r.*, u.full_name AS reviewer_name 
        FROM reviews r 
        JOIN users u ON r.reviewer_id = u.id 
        WHERE r.reviewee_id = ? 
        ORDER BY r.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $sellerId);
$stmt->execute();

$result = $stmt->get_result();
$reviews = [];

while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

echo json_encode($reviews);
