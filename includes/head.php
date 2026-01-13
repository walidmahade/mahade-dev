<?php
/**
 * HTML Head Component
 * Contains meta tags, fonts, Tailwind CSS, and custom styles
 */

// Default values
$page_title = $page_title ?? 'Mahade Walid - Senior Frontend Engineer | React TypeScript Expert';
$page_description = $page_description ?? 'Senior Frontend Engineer specializing in React, TypeScript, and modern web technologies. Building scalable design systems and applications. Expert in Next.js, TanStack, and component libraries.';
$page_keywords = $page_keywords ?? 'Frontend Engineer, React Developer, TypeScript, JavaScript, Next.js, TanStack, Design Systems, Component Libraries, Web Development, Senior Engineer, Allica Bank, Rakuten';
$canonical_url = $canonical_url ?? $site_config['site_url'];
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title); ?></title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="<?php echo htmlspecialchars($page_description); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($page_keywords); ?>">
    <meta name="author" content="Mahade Walid">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1">

    <!-- Open Graph Tags -->
    <meta property="og:title" content="<?php echo htmlspecialchars($page_title); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_description); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo htmlspecialchars($canonical_url); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($site_config['og_image']); ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="AFK Codes">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:creator" content="<?php echo htmlspecialchars($site_config['twitter_handle']); ?>">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($page_title); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($page_description); ?>">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($site_config['og_image']); ?>">

    <!-- Theme and Mobile -->
    <meta name="theme-color" content="#000000">
    <meta name="msapplication-TileColor" content="#000000">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <!-- Canonical -->
    <link rel="canonical" href="<?php echo htmlspecialchars($canonical_url); ?>">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon.svg">

    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://ik.imagekit.io">
    <link rel="dns-prefetch" href="https://ghchart.rshah.org">
    <link rel="dns-prefetch" href="https://github.com">

    <!-- Preload hero image -->
    <link rel="preload" href="https://ik.imagekit.io/1uvbazlmc/IMG_8564-1.webp?tr=w-320,h-320,q-80,f-webp" as="image" type="image/webp">

    <!-- Google Fonts -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" as="style">
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'jetbrains': ['"JetBrains Mono"', 'monospace'],
                        'geist': ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                        'geist-mono': ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
                    },
                    colors: {
                        zinc: {
                            50: '#fafafa',
                            100: '#f4f4f5',
                            200: '#e4e4e7',
                            300: '#d4d4d8',
                            400: '#a1a1aa',
                            500: '#71717a',
                            600: '#52525b',
                            700: '#3f3f46',
                            800: '#27272a',
                            900: '#18181b',
                            950: '#09090b',
                        }
                    }
                }
            }
        }
    </script>

    <!-- Custom Styles -->
    <link rel="stylesheet" href="/assets/css/styles.css">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo htmlspecialchars($site_config['ga_id']); ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<?php echo htmlspecialchars($site_config['ga_id']); ?>');
    </script>
</head>
