<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); // ✅ Important
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require '../config/db.php'; // adjust path as needed

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id, $data->currentPassword, $data->newPassword)) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$id = $data->id;
$currentPassword = $data->currentPassword;
$newPassword = $data->newPassword;

// Fetch current user
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}

$row = $result->fetch_assoc();

if (!password_verify($currentPassword, $row['password'])) {
    echo json_encode(["success" => false, "message" => "Incorrect current password"]);
    exit;
}

// Update password
$newHashed = password_hash($newPassword, PASSWORD_DEFAULT);
$updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$updateStmt->bind_param("si", $newHashed, $id);

if ($updateStmt->execute()) {
    echo json_encode(["success" => true, "message" => "Password changed successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update password"]);
}
