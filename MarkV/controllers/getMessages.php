<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$book_id = $_GET['book_id'] ?? null;
$buyer_id = $_GET['buyer_id'] ?? null;

if (!$book_id || !$buyer_id) {
    echo json_encode(["success" => false, "error" => "Missing book_id or buyer_id"]);
    exit;
}

$query = $conn->prepare("SELECT sender_id, message FROM chat WHERE book_id = ? AND buyer_id = ? ORDER BY id ASC");
$query->bind_param("ii", $book_id, $buyer_id);
$query->execute();

$result = $query->get_result();
$messages = [];

while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(["success" => true, "messages" => $messages]);
$conn->close();
?>
