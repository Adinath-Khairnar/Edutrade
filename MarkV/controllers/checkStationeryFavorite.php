<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id ?? null;
$product_id = $data->product_id ?? null;

if (!$user_id || !$product_id) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$query = "SELECT * FROM favorites WHERE user_id = ? AND product_id = ? AND type = 'stationery'";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "favorited" => true]);
} else {
    echo json_encode(["success" => true, "favorited" => false]);
}
?>
