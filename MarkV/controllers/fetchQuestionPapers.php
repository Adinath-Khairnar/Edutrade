<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db.php");

$sql = "SELECT * FROM question_papers ORDER BY uploaded_at DESC";
$result = $conn->query($sql);

$papers = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $fileName = basename($row['file_path']); // just the filename like xyz.pdf
        $papers[] = [
            "id" => $row['question_paper_id'],
            "user_id" => $row['user_id'],
            "subject" => $row['subject'],
            "university" => $row['university'],
            "year" => $row['year'],
            "file_url" => "uploads/question_papers/" . $fileName // ✅ relative path for frontend
        ];
    }
}

echo json_encode($papers);
$conn->close();
