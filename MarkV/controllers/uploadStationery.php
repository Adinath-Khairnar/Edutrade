<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/db.php'; // update path if different

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id    = $_POST['user_id'];
    $name       = $_POST['name'];
    $course     = $_POST['course'];
    $location   = $_POST['location'];
    $price      = $_POST['price'];
    $condition  = $_POST['condition'];
    $brand      = $_POST['brand'];
    $color      = $_POST['color'];
    $size       = $_POST['size'];
    $description = $_POST['description'];

    $imagePath = '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/stationery/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true); // create folder if not exist
        }

        $fileName = uniqid() . "_" . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = 'http://localhost/MarkV/uploads/stationery/' . $fileName;
        } else {
            echo "Failed to upload image.";
            exit;
        }
    } else {
        echo "Image not uploaded properly.";
        exit;   
    }

    $stmt = $conn->prepare("INSERT INTO stationery_items (user_id, name, course, location, price, item_condition, brand, color, size, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssdssssss", $user_id, $name, $course, $location, $price, $condition, $brand, $color, $size, $description, $imagePath);

    if ($stmt->execute()) {
        echo "Stationery item listed successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
