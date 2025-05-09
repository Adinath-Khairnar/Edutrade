<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include '../config/db.php';

$book_id = $_GET['book_id'];

$sql = "SELECT title FROM books WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $book_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(['success' => true, 'title' => $row['title']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Book not found']);
}
?>
