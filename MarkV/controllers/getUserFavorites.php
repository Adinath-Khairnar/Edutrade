<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_URL', 'http://localhost/MarkV/');

include "../config/db.php";

if (isset($_GET['user_id'])) {
    $user_id = intval($_GET['user_id']);

    $query = "SELECT * FROM favorites WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $favorites = [];

    while ($row = $result->fetch_assoc()) {
        $type = $row['type'];
        $product_id = $row['product_id'];

        if ($type == 'book') {
            $bookQuery = "SELECT * FROM books WHERE id = ?";
            $bookStmt = $conn->prepare($bookQuery);
            $bookStmt->bind_param('i', $product_id);
            $bookStmt->execute();
            $bookResult = $bookStmt->get_result();
            $bookData = $bookResult->fetch_assoc();

            if ($bookData) {
                $imagePath = isset($bookData['image']) && !filter_var($bookData['image'], FILTER_VALIDATE_URL)
                    ? BASE_URL . $bookData['image']
                    : $bookData['image'];

                $favorites[] = [
                    'type' => 'book',
                    'id' => $bookData['id'],
                    'product_name' => $bookData['title'] ?? '',
                    'price' => $bookData['price'] ?? '',
                    'description' => $bookData['description'] ?? '',
                    'image' => $imagePath,
                ];
            }
        } elseif ($type == 'stationery') {
            $stationeryQuery = "SELECT * FROM stationery_items WHERE product_id = ?";
            $stationeryStmt = $conn->prepare($stationeryQuery);
            $stationeryStmt->bind_param('i', $product_id);
            $stationeryStmt->execute();
            $stationeryResult = $stationeryStmt->get_result();
            $stationeryData = $stationeryResult->fetch_assoc();

            if ($stationeryData) {
                $imagePath = isset($stationeryData['image_url']) && !filter_var($stationeryData['image_url'], FILTER_VALIDATE_URL)
                    ? BASE_URL . 'uploads/stationery/' . $stationeryData['image_url']
                    : $stationeryData['image_url'];

                $favorites[] = [
                    'type' => 'stationery',
                    'id' => $stationeryData['product_id'],
                    'product_name' => $stationeryData['name'] ?? '',
                    'price' => $stationeryData['price'] ?? '',
                    'description' => $stationeryData['description'] ?? '',
                    'image' => $imagePath,
                ];
            }
        }
    }

    echo json_encode(['favorites' => $favorites]);
} else {
    echo json_encode(['error' => 'User ID is missing']);
}
