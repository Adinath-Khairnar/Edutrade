<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include __DIR__ . "/../config/db.php";

if (!isset($conn)) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get search parameters
$search = isset($_GET['title']) ? $conn->real_escape_string($_GET['title']) : '';
$location = isset($_GET['location']) ? $conn->real_escape_string($_GET['location']) : '';

// Base query
$sql = "SELECT id, title, author, price, image, location, edition, language, isbn, pages, book_condition, description FROM books WHERE 1";

// Add search filters
if (!empty($search)) {
    $sql .= " AND title LIKE '%$search%'";
}
if (!empty($location)) {
    $sql .= " AND location LIKE '%$location%'";
}

// Execute query
$result = $conn->query($sql);

$books = [];

if (!$result) {
    echo json_encode(["error" => "Query Failed: " . $conn->error]);
    exit;
}

while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

// Return JSON response
echo json_encode($books);
$conn->close();
?>
