<?php
// Allow Cross-Origin Requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Include database connection
include '../config/db.php';

// Get the JSON request data
$data = json_decode(file_get_contents("php://input"), true);

// Check if request is valid
if (!$data || !isset($data['action'])) {
    echo json_encode(["error" => "Invalid request"]);
    exit();
}

$action = $data['action'];

if ($action == "login") {
    // LOGIN LOGIC
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // Validate required fields
    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email and Password are required"]);
        exit();
    }

    // Check if user exists
    $sql = "SELECT id, full_name, email, password, verified FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        if ($user['verified'] != 1) {
            http_response_code(403); // Forbidden
            echo json_encode(["error" => "Please verify your email before logging in."]);
        } elseif (password_verify($password, $user['password'])) {
            echo json_encode([
                "message" => "Login successful!",
                "user" => [
                    "id" => $user['id'],
                    "full_name" => $user['full_name'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["error" => "Invalid email or password"]);
        }
    } else {
        http_response_code(404); // Not found
        echo json_encode(["error" => "User not found"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid action"]);
}

// Close database connection
$conn->close();
?>
