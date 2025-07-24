<?php
// items/items.php
require_once '../db.php'; // Include database connection

header('Content-Type: application/json');

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getItem($_GET['id']);
        } else {
            getAllItems();
        }
        break;
    case 'POST':
        createItem();
        break;
    case 'PUT':
        updateItem();
        break;
    case 'DELETE':
        deleteItem();
        break;
    default:
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
        break;
}

function getAllItems() {
    $conn = getDbConnection();
    $sql = "SELECT * FROM items";
    $result = $conn->query($sql);

    $items = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
    }
    echo json_encode(['status' => 'success', 'data' => $items]);
    $conn->close();
}

function getItem($id) {
    $conn = getDbConnection();
    $stmt = $conn->prepare("SELECT * FROM items WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        echo json_encode(['status' => 'success', 'data' => $result->fetch_assoc()]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Item not found.']);
    }
    $stmt->close();
    $conn->close();
}

function createItem() {
    $input = json_decode(file_get_contents('php://input'), true);
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $category = $input['category'] ?? '';
    $location = $input['location'] ?? '';
    $user_id = $input['user_id'] ?? 1; // Placeholder for user_id

    if (empty($title) || empty($description) || empty($category) || empty($location)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        return;
    }

    $conn = getDbConnection();
    $stmt = $conn->prepare("INSERT INTO items (title, description, category, location, user_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $title, $description, $category, $location, $user_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Item created successfully!', 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create item: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}

function updateItem() {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $category = $input['category'] ?? '';
    $location = $input['location'] ?? '';

    if (empty($id) || empty($title) || empty($description) || empty($category) || empty($location)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        return;
    }

    $conn = getDbConnection();
    $stmt = $conn->prepare("UPDATE items SET title = ?, description = ?, category = ?, location = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $title, $description, $category, $location, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Item updated successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update item: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}

function deleteItem() {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? '';

    if (empty($id)) {
        echo json_encode(['status' => 'error', 'message' => 'Item ID is required.']);
        return;
    }

    $conn = getDbConnection();
    $stmt = $conn->prepare("DELETE FROM items WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Item deleted successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete item: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}
?>
