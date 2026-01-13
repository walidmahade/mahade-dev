<?php
/**
 * Experience Section
 * Work history with cards
 */
?>
<section id="experience" class="px-4 sm:px-6 py-12 sm:py-16 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto border-t border-zinc-800/50">
    <div class="space-y-6 sm:space-y-8">
        <div class="flex items-center gap-3 sm:gap-4">
            <!-- Briefcase Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-300 sm:w-5 sm:h-5">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
            </svg>
            <h2 class="text-lg sm:text-xl font-medium text-zinc-50 tracking-tight font-geist">
                Experience
            </h2>
        </div>

        <div class="space-y-4 sm:space-y-6">
            <?php foreach ($experiences as $index => $experience): ?>
                <div class="group hover:bg-zinc-950/50 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 border border-transparent hover:border-zinc-800/50 space-y-3 sm:space-y-4" style="animation-delay: <?php echo $index * 0.1; ?>s;">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                        <div class="space-y-1">
                            <h3 class="font-semibold text-white group-hover:text-zinc-50 text-sm sm:text-base tracking-tight font-geist">
                                <?php echo htmlspecialchars($experience['role']); ?>
                            </h3>
                            <p class="text-zinc-300 group-hover:text-zinc-200 font-medium tracking-tight text-xs sm:text-sm">
                                <?php echo htmlspecialchars($experience['company']); ?>
                            </p>
                        </div>
                        <span class="text-xs sm:text-sm text-zinc-300 shrink-0 font-geist-mono font-medium tracking-wider bg-zinc-900/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-zinc-800 self-start">
                            <?php echo htmlspecialchars($experience['year']); ?>
                        </span>
                    </div>

                    <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed tracking-tight font-geist max-w-lg">
                        <?php echo htmlspecialchars($experience['description']); ?>
                    </p>

                    <div class="flex gap-1.5 sm:gap-2 flex-wrap">
                        <?php foreach ($experience['tech'] as $tech): ?>
                            <span class="text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-zinc-900/80 text-zinc-200 rounded-lg border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all duration-200 font-medium tracking-tight font-geist-mono">
                                <?php echo htmlspecialchars($tech); ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
