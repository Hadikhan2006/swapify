<?php
// users/users.php
require_once '../db.php'; // Include database connection

header('Content-Type: application/json');

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getUser($_GET['id']);
        } else {
            getAllUsers();
        }
        break;
    case 'POST':
        createUser();
        break;
    case 'PUT':
        updateUser();
        break;
    case 'DELETE':
        deleteUser();
        break;
    default:
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
        break;
}

function getAllUsers() {
    $conn = getDbConnection();
    $sql = "SELECT id, username, email, created_at FROM users";
    $result = $conn->query($sql);

    $users = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    echo json_encode(['status' => 'success', 'data' => $users]);
    $conn->close();
}

function getUser($id) {
    $conn = getDbConnection();
    $stmt = $conn->prepare("SELECT id, username, email, created_at FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        echo json_encode(['status' => 'success', 'data' => $result->fetch_assoc()]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    }
    $stmt->close();
    $conn->close();
}

function createUser() {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? ''; // Password should be hashed before storing

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        return;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT); // Hash the password

    $conn = getDbConnection();
    $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password_hash);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User created successfully!', 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create user: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}

function updateUser() {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? '';
    $username = $input['username'] ?? '';
    $email = $input['email'] ?? '';

    if (empty($id) || empty($username) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        return;
    }

    $conn = getDbConnection();
    $stmt = $conn->prepare("UPDATE users SET username = ?, email = ? WHERE id = ?");
    $stmt->bind_param("ssi", $username, $email, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User updated successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update user: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}

function deleteUser() {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? '';

    if (empty($id)) {
        echo json_encode(['status' => 'error', 'message' => 'User ID is required.']);
        return;
    }

    $conn = getDbConnection();
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User deleted successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete user: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}
?>
