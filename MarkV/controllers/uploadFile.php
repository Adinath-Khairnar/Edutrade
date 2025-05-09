<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$targetDir = "../uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES['file'])) {
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . uniqid() . "_" . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode([
            "success" => true,
            "file_url" => "http://localhost/MarkV/uploads/" . basename($targetFilePath)
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
}
?>
