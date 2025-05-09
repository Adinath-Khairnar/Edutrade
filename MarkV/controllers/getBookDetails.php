
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../config/db.php'; // Adjust if your connection file path differs

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "Book ID is required"]);
    exit;
}

$book_id = intval($_GET['id']); // Convert to integer for security

$sql = "SELECT b.*, u.location FROM books b 
        JOIN users u ON b.user_id = u.id 
        WHERE b.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $book_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $book = $result->fetch_assoc();
    echo json_encode($book);
} else {
    echo json_encode(["error" => "Book not found"]);
}

$stmt->close();
$conn->close();
?>
