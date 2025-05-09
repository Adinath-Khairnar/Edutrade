<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

include "../config/db.php";

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "User ID is missing."]);
    exit;
}

$response = [];

// Fetch books
$bookQuery = "SELECT * FROM books WHERE user_id = $user_id";
$bookResult = mysqli_query($conn, $bookQuery);
$books = mysqli_fetch_all($bookResult, MYSQLI_ASSOC);

// Fetch stationery
$stationeryQuery = "SELECT * FROM stationery_items WHERE user_id = $user_id";
$stationeryResult = mysqli_query($conn, $stationeryQuery);
$stationery = mysqli_fetch_all($stationeryResult, MYSQLI_ASSOC);

// Fetch notes
$notesQuery = "SELECT * FROM notes WHERE user_id = $user_id";
$notesResult = mysqli_query($conn, $notesQuery);
$notes = mysqli_fetch_all($notesResult, MYSQLI_ASSOC);

// Fetch question papers
$qpQuery = "SELECT * FROM question_papers WHERE user_id = $user_id";
$qpResult = mysqli_query($conn, $qpQuery);

if (!$qpResult) {
    error_log("Question papers query error: " . mysqli_error($conn));
    $questionPapers = [];
} else {
    $questionPapers = mysqli_fetch_all($qpResult, MYSQLI_ASSOC);
    error_log("Question papers found: " . count($questionPapers)); // Log count
}

$response = [
    "books" => $books,
    "stationery" => $stationery,
    "notes" => $notes,
    "questionPapers" => $questionPapers // Fixed typo here (was questionpapers)
];

error_log("Final response: " . json_encode($response)); // Log final response
echo json_encode($response);