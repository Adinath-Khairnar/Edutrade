<?php
// MUST BE AT THE VERY TOP - No whitespace above
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include DB
include("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subject = $_POST['subject'] ?? '';
    $university = $_POST['university'] ?? '';
    $year = $_POST['year'] ?? '';
    $user_id = $_POST['user_id'] ?? '';

    // Check for file
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        echo "Error uploading file.";
        exit;
    }

    $uploadDir = "../uploads/question_papers/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = basename($_FILES['file']['name']);
    $uniqueFileName = uniqid() . "_" . $fileName;
    $filePath = $uploadDir . $uniqueFileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        $relativePath = str_replace("../", "", $filePath); // e.g., uploads/question_papers/filename.pdf
        $stmt = $conn->prepare("INSERT INTO question_papers (user_id, subject, university, year, file_path) VALUES (?, ?, ?, ?, ?)");

        $stmt->bind_param("issis", $user_id, $subject, $university, $year, $uniqueFileName);

        if ($stmt->execute()) {
            echo "Question paper uploaded successfully.";
        } else {
            echo "Database error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Failed to move uploaded file.";
    }

    $conn->close();
} else {
    echo "Invalid request.";
}
?>
