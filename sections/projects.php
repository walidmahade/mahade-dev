<?php
/**
 * Projects Section
 * Project cards with GitHub activity
 */
?>
<section id="projects" class="px-4 sm:px-6 py-12 sm:py-16 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto border-t border-zinc-800/50">
    <div class="space-y-6 sm:space-y-8">
        <div class="flex items-center gap-3 sm:gap-4">
            <!-- Code Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-300 sm:w-5 sm:h-5">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <h2 class="text-lg sm:text-xl font-medium text-zinc-50 tracking-tight font-geist">
                Projects
            </h2>
        </div>

        <div class="space-y-4 sm:space-y-6">
            <?php foreach ($projects as $index => $project): ?>
                <div class="group p-4 sm:p-6 bg-zinc-950/20 hover:bg-zinc-950/30 rounded-xl transition-all duration-300 border border-transparent hover:border-zinc-800/50" style="animation-delay: <?php echo $index * 0.1; ?>s;">
                    <!-- Mobile: Simplified header with project name and primary action -->
                    <div class="flex items-start justify-between mb-3 sm:hidden">
                        <h3 class="font-semibold text-white text-base tracking-tight font-geist leading-tight">
                            <?php echo htmlspecialchars($project['name']); ?>
                        </h3>
                        <a href="<?php echo htmlspecialchars($project['deployed'] ?? $project['github']); ?>" class="text-zinc-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-900/50" title="<?php echo $project['deployed'] ? 'View project' : 'View on GitHub'; ?>" target="_blank" rel="noopener noreferrer">
                            <?php if ($project['deployed']): ?>
                                <!-- ExternalLink Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14 21 3"></path>
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                </svg>
                            <?php else: ?>
                                <!-- GitHub Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            <?php endif; ?>
                        </a>
                    </div>

                    <!-- Desktop: Full header with all actions -->
                    <div class="hidden sm:flex sm:justify-between sm:items-start mb-4">
                        <div class="space-y-2">
                            <h3 class="font-semibold text-white group-hover:text-zinc-50 text-lg tracking-tight font-geist">
                                <?php echo htmlspecialchars($project['name']); ?>
                            </h3>
                            <p class="text-base text-zinc-300 leading-relaxed tracking-tight font-geist max-w-md">
                                <?php echo htmlspecialchars($project['desc']); ?>
                            </p>
                        </div>
                        <div class="flex items-center gap-3 shrink-0">
                            <a href="<?php echo htmlspecialchars($project['github']); ?>" class="text-zinc-300 hover:text-white transition-all duration-300 hover:scale-110 transform group/link p-2.5 rounded-lg hover:bg-zinc-900/50" title="View on GitHub" target="_blank" rel="noopener noreferrer">
                                <!-- GitHub Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/link:rotate-12 transition-transform duration-300">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </a>
                            <?php if ($project['deployed']): ?>
                                <a href="<?php echo htmlspecialchars($project['deployed']); ?>" class="text-zinc-300 hover:text-white transition-all duration-300 hover:scale-110 transform group/link p-2.5 rounded-lg hover:bg-zinc-900/50" title="View project" target="_blank" rel="noopener noreferrer">
                                    <!-- ExternalLink Icon -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/link:rotate-12 transition-transform duration-300">
                                        <path d="M15 3h6v6"></path>
                                        <path d="M10 14 21 3"></path>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    </svg>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Mobile: Description -->
                    <p class="text-sm text-zinc-300 leading-relaxed tracking-tight font-geist mb-3 sm:hidden">
                        <?php echo htmlspecialchars($project['desc']); ?>
                    </p>

                    <!-- Tech stack -->
                    <div class="flex gap-2 flex-wrap mb-3">
                        <?php foreach (array_slice($project['tech'], 0, 3) as $tech): ?>
                            <span class="text-xs px-2.5 py-1.5 bg-zinc-900/60 text-zinc-200 rounded-lg border border-zinc-800/40 font-medium tracking-tight font-geist-mono">
                                <?php echo htmlspecialchars($tech); ?>
                            </span>
                        <?php endforeach; ?>
                        <?php if (count($project['tech']) > 3): ?>
                            <span class="text-xs px-2.5 py-1.5 bg-zinc-900/30 text-zinc-400 rounded-lg border border-zinc-800/20 font-medium tracking-tight font-geist-mono sm:hidden">
                                +<?php echo count($project['tech']) - 3; ?>
                            </span>
                        <?php endif; ?>
                        <?php foreach (array_slice($project['tech'], 3) as $tech): ?>
                            <span class="hidden sm:inline-flex text-xs px-3 py-2 bg-zinc-900/60 text-zinc-200 rounded-lg border border-zinc-800/40 hover:border-zinc-700 hover:bg-zinc-800/60 transition-all duration-200 font-medium tracking-tight font-geist-mono">
                                <?php echo htmlspecialchars($tech); ?>
                            </span>
                        <?php endforeach; ?>
                    </div>

                    <!-- Status and impact - hidden on mobile -->
                    <div class="hidden sm:flex sm:items-center sm:justify-between">
                        <span class="text-xs text-zinc-300 bg-zinc-900/50 px-2.5 py-1.5 rounded-lg border border-zinc-800 font-medium tracking-tight font-geist-mono">
                            <?php echo htmlspecialchars($project['status']); ?>
                        </span>
                        <?php if (!empty($project['impact'])): ?>
                            <span class="text-xs text-zinc-300 font-medium tracking-tight font-geist">
                                <?php echo htmlspecialchars($project['impact']); ?>
                            </span>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>

            <!-- GitHub Activity -->
            <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-800/50">
                <div class="space-y-3 sm:space-y-4">
                    <h3 class="text-lg sm:text-xl font-medium text-zinc-50 tracking-tight font-geist flex items-center gap-2 sm:gap-3">
                        <!-- GitHub Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-300 sm:w-5 sm:h-5">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                        GitHub Activity
                    </h3>

                    <!-- GitHub Contribution Chart -->
                    <div class="bg-zinc-900/30 rounded-lg p-3 sm:p-4 border border-zinc-800/40 overflow-hidden">
                        <img
                            src="https://ghchart.rshah.org/409c43/<?php echo htmlspecialchars($github_stats['username']); ?>"
                            alt="GitHub Contribution Chart"
                            width="722"
                            height="112"
                            class="w-full h-auto rounded"
                            style="filter: brightness(0.9) contrast(1.1);"
                            loading="lazy"
                            decoding="async"
                        >
                    </div>

                    <a href="https://github.com/<?php echo htmlspecialchars($github_stats['username']); ?>" class="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors duration-200 font-medium tracking-tight font-geist" target="_blank" rel="noopener noreferrer">
                        <!-- GitHub Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-4 sm:h-4">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
