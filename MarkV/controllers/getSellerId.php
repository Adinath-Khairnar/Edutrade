<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (isset($input['book_id'])) {
        $book_id = $input['book_id'];

        $stmt = $conn->prepare("SELECT user_id FROM books WHERE id = ?");
        $stmt->bind_param("i", $book_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            echo json_encode(["success" => true, "seller_id" => $row['user_id']]);
        } else {
            echo json_encode(["success" => false, "error" => "Book not found"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Book ID not provided"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
