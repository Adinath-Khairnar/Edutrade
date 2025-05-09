<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$conn = new mysqli("localhost", "root", "", "edutrade");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$full_name = $data['full_name'];
$phone = $data['phone'];
$location = $data['location'];

$sql = "UPDATE users SET full_name='$full_name', phone='$phone', location='$location' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
