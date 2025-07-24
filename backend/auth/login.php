<?php
// auth/login.php
require_once '../db.php'; // Include database connection

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Email and password are required.']);
        exit();
    }

    $conn = getDbConnection();

    // Prepare and execute the query to find the user by email
    $stmt = $conn->prepare("SELECT id, username, email, password_hash FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Verify the password
        if (password_verify($password, $user['password_hash'])) {
            // Password is correct, start a session (or generate a token)
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];

            echo json_encode(['status' => 'success', 'message' => 'Login successful!', 'user' => ['id' => $user['id'], 'username' => $user['username'], 'email' => $user['email']]]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid credentials.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
