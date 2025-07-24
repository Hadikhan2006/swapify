<?php
header('Content-Type: application/json');

// Basic routing for API endpoints
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_segments = explode('/', trim($request_uri, '/'));

// Example: /backend/api.php/items
if (isset($uri_segments[2]) && $uri_segments[2] === 'items') {
    // Handle item-related requests
    include 'items/items.php';
} elseif (isset($uri_segments[2]) && $uri_segments[2] === 'users') {
    // Handle user-related requests
    include 'users/users.php';
} elseif (isset($uri_segments[2]) && $uri_segments[2] === 'auth') {
    // Handle authentication requests
    include 'auth/auth.php';
} else {
    echo json_encode(['status' => 'error', 'message' => 'API endpoint not found.']);
}
?>
