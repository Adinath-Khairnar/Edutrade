<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

include '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $seller_id = $data['seller_id'];
    $buyer_id = $data['buyer_id'];
    $item_id = $data['book_id']; // used for both books and stationery
    $message = $data['message'];
    $sender_id = $data['sender_id'];
    $chat_type = $data['chat_type'];

    if ($chat_type === 'books') {
        $stmt = $conn->prepare("INSERT INTO chat (book_id, seller_id, buyer_id, message, sender_id, timestamp) VALUES (?, ?, ?, ?, ?, NOW())");
    } else if ($chat_type === 'stationery') {
        $stmt = $conn->prepare("INSERT INTO stationery_chat (product_id, seller_id, buyer_id, message, sender_id, timestamp) VALUES (?, ?, ?, ?, ?, NOW())");
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid chat type']);
        exit;
    }

    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("iiisi", $item_id, $seller_id, $buyer_id, $message, $sender_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Execution failed: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
