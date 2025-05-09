<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/db.php";

if (isset($_GET['id'])) {
    $product_id = $_GET['id'];

    $sql = "SELECT * FROM stationery_items WHERE product_id = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $product_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($row = mysqli_fetch_assoc($result)) {
            echo json_encode([
                "success" => true,
                "item" => $row
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Item not found"
            ]);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Query preparation failed"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Missing product_id"
    ]);
}
?>
