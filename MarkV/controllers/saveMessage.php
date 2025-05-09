<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['book_id'], $data['buyer_id'], $data['sender_id'])) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

$book_id = $data['book_id'];
$buyer_id = $data['buyer_id'];
$sender_id = $data['sender_id'];
$message = $data['message'] ?? "";
$file_url = $data['file_url'] ?? null;

// Get seller_id using book_id
$query = $conn->prepare("SELECT user_id FROM books WHERE id = ?");
$query->bind_param("i", $book_id);
$query->execute();
$result = $query->get_result();
if ($result->num_rows == 0) {
    echo json_encode(["success" => false, "error" => "Book not found"]);
    exit;
}
$row = $result->fetch_assoc();
$seller_id = $row['user_id'];

$stmt = $conn->prepare("INSERT INTO chat (book_id, buyer_id, seller_id, sender_id, message, file_url) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iiiiss", $book_id, $buyer_id, $seller_id, $sender_id, $message, $file_url);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
