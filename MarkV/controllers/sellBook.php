<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
ob_start(); // Start output buffering

// Enable CORS and set JSON headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../config/db.php';

$response = ["success" => false];

// Handle OPTIONS request for CORS
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

// Ensure request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    $response["error"] = "Invalid request method";
    ob_end_clean();
    exit(json_encode($response));
}

// Validate required fields
$requiredFields = ['title', 'author', 'price', 'condition', 'description', 'seller_id'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field])) {
        http_response_code(400);
        $response["error"] = "Missing required field: $field";
        ob_end_clean();
        exit(json_encode($response));
    }
}

// Extract and sanitize input
$title = mysqli_real_escape_string($conn, $_POST['title']);
$author = mysqli_real_escape_string($conn, $_POST['author']);
$price = mysqli_real_escape_string($conn, $_POST['price']);
$location = mysqli_real_escape_string($conn, $_POST['location']);
$condition = mysqli_real_escape_string($conn, $_POST['condition']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$seller_id = mysqli_real_escape_string($conn, $_POST['seller_id']);
$edition =mysqli_real_escape_string($conn, $_POST['edition']);
$pages=mysqli_real_escape_string($conn, $_POST['pages']);
$language=mysqli_real_escape_string($conn, $_POST['language']);
$isbn=mysqli_real_escape_string($conn, $_POST['isbn']);
$imagePath = null;

// Handle File Upload
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $upload_dir = __DIR__ . '/../uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    $file_name = time() . '_' . basename($_FILES["image"]["name"]);
    $target_file = $upload_dir . $file_name;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $imagePath = 'uploads/' . $file_name;
    } else {
        http_response_code(500);
        $response["error"] = "Failed to upload image";
        ob_end_clean();
        exit(json_encode($response));
    }
}

// Insert into database
$sql = "INSERT INTO books (title, author, price, location, book_condition,edition,pages,language,isbn,description, image, user_id)
        VALUES ('$title', '$author', '$price', '$location', '$condition','$edition','$pages','$language','$isbn','$description','$imagePath', '$seller_id')";
echo $location;
if (mysqli_query($conn, $sql)) {
    http_response_code(201);
    $response["success"] = true;
    $response["message"] = "Book listed successfully!";
} else {
    http_response_code(500);
    $response["error"] = "Database error: " . mysqli_error($conn);
}

// Clear any previous output
ob_end_clean();
echo json_encode($response);
?>