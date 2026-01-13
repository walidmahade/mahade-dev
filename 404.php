<?php
/**
 * 404 Not Found Page
 */

// Load data
require_once __DIR__ . '/includes/data.php';

// Page-specific settings
$current_page = '404';
$page_title = '404 - Page Not Found | Mahade Walid';
$page_description = 'The page you are looking for does not exist.';

// Set 404 header
http_response_code(404);
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/includes/head.php'; ?>
<body class="min-h-screen bg-black text-white font-jetbrains flex items-center justify-center">
    <div class="max-w-md px-6 mx-auto space-y-6 text-center">
        <div class="space-y-2">
            <h1 class="text-6xl font-bold text-zinc-300">404</h1>
            <h2 class="text-xl font-medium text-zinc-200 tracking-tight font-geist">
                Page Not Found
            </h2>
        </div>
        <p class="text-zinc-300 leading-relaxed font-geist tracking-tight">
            The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <a href="/" class="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-100 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-white/20 tracking-tight font-geist text-sm">
            <!-- ArrowLeft Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
            </svg>
            Back to Home
        </a>
    </div>
</body>
</html>
