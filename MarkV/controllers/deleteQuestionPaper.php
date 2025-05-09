<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$question_paper_id = $data['question_paper_id'] ?? null;
$user_id = $data['user_id'] ?? null;

if (!$question_paper_id || !$user_id) {
    echo json_encode(["status" => "error", "message" => "Missing required parameters"]);
    exit;
}

// Verify the question paper belongs to the user before deleting
$verifyQuery = "SELECT question_paper_id FROM question_papers WHERE question_paper_id = $question_paper_id AND user_id = $user_id";
$verifyResult = mysqli_query($conn, $verifyQuery);

if (mysqli_num_rows($verifyResult) === 0) {
    echo json_encode(["status" => "error", "message" => "Question paper not found or you don't have permission to delete it"]);
    exit;
}

// Delete the question paper
$deleteQuery = "DELETE FROM question_papers WHERE question_paper_id = $question_paper_id";
$deleteResult = mysqli_query($conn, $deleteQuery);

if ($deleteResult) {
    echo json_encode(["status" => "success", "message" => "Question paper deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete question paper"]);
}