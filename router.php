<?php
/**
 * PHP Built-in Server Router
 * Handles URL routing for Railway deployment
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static files directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    // Set appropriate content types for assets
    $extension = pathinfo($uri, PATHINFO_EXTENSION);
    $mimeTypes = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject',
    ];

    if (isset($mimeTypes[$extension])) {
        header('Content-Type: ' . $mimeTypes[$extension]);
    }

    return false; // Serve the file directly
}

// Route handling
switch ($uri) {
    case '/':
    case '/index.php':
        require __DIR__ . '/index.php';
        break;

    case '/uses':
    case '/uses.php':
        require __DIR__ . '/uses.php';
        break;

    default:
        // 404 for unknown routes
        http_response_code(404);
        require __DIR__ . '/404.php';
        break;
}
