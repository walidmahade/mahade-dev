<?php
/**
 * Homepage
 * Main portfolio page with all sections
 */

// Load data
require_once __DIR__ . '/includes/data.php';

// Page-specific settings
$current_page = 'home';
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/includes/head.php'; ?>
<body class="min-h-screen bg-black text-white font-jetbrains">
    <?php include __DIR__ . '/includes/header.php'; ?>

    <main>
        <?php include __DIR__ . '/sections/hero.php'; ?>
        <?php include __DIR__ . '/sections/experience.php'; ?>
        <?php include __DIR__ . '/sections/projects.php'; ?>
        <?php include __DIR__ . '/sections/contact.php'; ?>
    </main>
</body>
</html>
