<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once '../config/db.php';

$seller_id = $_GET['seller_id'];
$type = $_GET['type']; // 'books' or 'stationery'

if ($type === 'books') {
    $table = 'chat';
} else {
    $table = 'stationery_chat';
}

$query = "SELECT * FROM $table WHERE seller_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $seller_id);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode($messages);
?>
