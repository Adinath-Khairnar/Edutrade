<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "edutrade");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit();
}

$sql = "SELECT * FROM notes ORDER BY uploaded_at DESC";
$result = $conn->query($sql);

$notes = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }
}

echo json_encode(["success" => true, "notes" => $notes]);

$conn->close();
?>
