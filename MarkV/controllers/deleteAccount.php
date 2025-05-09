<?php
// Allow Cross-Origin Requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id'])) {
    echo json_encode(["error" => "User ID is required"]);
    exit();
}

$user_id = intval($data['user_id']);

try {
    $conn->begin_transaction();

    // Adjust based on your actual column names in each table
    $conn->query("DELETE FROM favorites WHERE user_id = $user_id");
    $conn->query("DELETE FROM reviews WHERE reviewer_id = $user_id OR reviewee_id = $user_id");
    $conn->query("DELETE FROM chat WHERE buyer_id = $user_id OR seller_id = $user_id");
    $conn->query("DELETE FROM stationery_chat WHERE buyer_id = $user_id OR seller_id = $user_id");


    // Your transactions table might not have buyer_id - remove this if not needed
    // $conn->query("DELETE FROM transactions WHERE buyer_id = $user_id");

    // Delete uploaded products
    $conn->query("DELETE FROM books WHERE user_id = $user_id");
    $conn->query("DELETE FROM notes WHERE user_id = $user_id");
    $conn->query("DELETE FROM stationery_items WHERE user_id = $user_id");
    $conn->query("DELETE FROM question_papers WHERE user_id = $user_id");

    // Delete the user last
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    $conn->commit();

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["error" => "Failed to delete account: " . $e->getMessage()]);
}

$conn->close();
?>
