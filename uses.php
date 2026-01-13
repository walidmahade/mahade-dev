<?php
/**
 * Uses Page
 * Tools, apps, and gear I use daily
 */

// Load data
require_once __DIR__ . '/includes/data.php';

// Page-specific settings
$current_page = 'uses';
$page_title = 'Uses - Tools & Technologies | Mahade Walid';
$page_description = 'Complete list of tools, technologies, and gear I use as a Senior Frontend Engineer. Including development tools, hardware, browser extensions, and productivity apps.';
$page_keywords = 'Developer Tools, Frontend Development Tools, VSCode, React Tools, TypeScript Tools, MacBook Pro, Development Setup, Programming Gear, Browser Extensions';
$canonical_url = $site_config['site_url'] . '/uses';
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/includes/head.php'; ?>
<body class="min-h-screen bg-black text-white font-jetbrains">
    <?php include __DIR__ . '/includes/header.php'; ?>

    <main>
        <div class="px-6 py-16 max-w-3xl mx-auto">
            <div class="space-y-12">
                <!-- Header -->
                <div class="space-y-4">
                    <h1 class="text-3xl sm:text-4xl font-light tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-[1.1] font-jetbrains">
                        Uses
                    </h1>
                    <p class="text-base text-zinc-300 leading-relaxed max-w-xl font-geist tracking-tight">
                        Here's a list of tools, apps, and gear I use daily to build software and stay productive.
                    </p>
                </div>

                <!-- Gear Sections -->
                <div class="space-y-12">
                    <?php foreach ($uses as $section): ?>
                        <div class="space-y-6">
                            <h2 class="text-xl font-medium text-zinc-50 tracking-tight font-geist">
                                <?php echo htmlspecialchars($section['header']); ?>
                            </h2>
                            <div class="space-y-2">
                                <?php foreach ($section['items'] as $item): ?>
                                    <a href="<?php echo htmlspecialchars($item['url']); ?>" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between py-3 hover:text-zinc-300 transition-colors duration-200">
                                        <span class="text-sm text-zinc-300 group-hover:text-zinc-200 font-geist">
                                            <?php echo htmlspecialchars($item['name']); ?>
                                        </span>
                                        <!-- ExternalLink Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14 21 3"></path>
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        </svg>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Back to home link -->
                <div class="pt-8 border-t border-zinc-800/50">
                    <a href="/" class="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors duration-200 font-medium tracking-tight font-geist">
                        <!-- ArrowLeft Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                        Back to home
                    </a>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
