<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['product_id']) ||
    !isset($data['seller_id']) ||
    !isset($data['buyer_id']) ||
    !isset($data['sender_id'])
) {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

$product_id = intval($data['product_id']);
$seller_id = intval($data['seller_id']);
$buyer_id = intval($data['buyer_id']);
$sender_id = intval($data['sender_id']);
$message = isset($data['message']) ? trim($data['message']) : null;
$file_url = isset($data['file_url']) ? trim($data['file_url']) : null;

if ($message === "" && $file_url === null) {
    echo json_encode(["success" => false, "message" => "Message and file cannot both be empty."]);
    exit;
}

$sql = "INSERT INTO stationery_chat (product_id, seller_id, buyer_id, sender_id, message, file_url, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiiss", $product_id, $seller_id, $buyer_id, $sender_id, $message, $file_url);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Message sent successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
