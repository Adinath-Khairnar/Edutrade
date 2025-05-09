<?php
include '../config/db.php'; // Database connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Validate input
if (isset($_FILES['noteFile']) && isset($_POST['noteTitle']) && isset($_POST['subject']) && isset($_POST['user_id'])) {
    $file = $_FILES['noteFile'];
    $title = $_POST['noteTitle'];
    $subject = $_POST['subject'];
    $userId = $_POST['user_id']; // Must be passed from frontend

    $targetDir = "../uploads/notes/";
    $fileName = basename($file["name"]);
    $fileType = pathinfo($fileName, PATHINFO_EXTENSION);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        // ✅ Insert into database
        $sql = "INSERT INTO notes (user_id, title, subject, file_name, file_type) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("issss", $userId, $title, $subject, $fileName, $fileType);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Note uploaded and saved to database successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Database insert failed: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "File upload failed."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
}
?>
