<?php
/**
 * Contact Section / Footer
 * Contact CTA with email and GitHub links
 */
?>
<footer id="contact" class="max-w-3xl px-4 sm:px-6 py-12 sm:py-16 mx-auto border-t xl:max-w-5xl 2xl:max-w-6xl border-zinc-800/50">
    <div class="space-y-5 sm:space-y-6 text-center">
        <div class="space-y-2 sm:space-y-3">
            <h3 class="text-xl sm:text-2xl font-medium text-zinc-50 mb-3 sm:mb-4 tracking-tight font-geist">
                Let's Build Something Amazing
            </h3>
            <p class="text-zinc-300 text-sm sm:text-base mb-2 tracking-tight font-geist max-w-md mx-auto px-4 sm:px-0">
                I'm always excited to work on new challenges and innovative projects
            </p>
            <p class="text-xs sm:text-sm tracking-tight text-zinc-300">
                Available for freelance &bull; Open to full-time opportunities
            </p>
        </div>

        <!-- Contact Buttons -->
        <div class="flex flex-col justify-center gap-3 pt-3 sm:pt-4 sm:flex-row px-4 sm:px-0">
            <a href="mailto:<?php echo htmlspecialchars($site_config['email']); ?>" class="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 transition-all duration-300 hover:scale-105 transform px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium tracking-tight font-geist hover:shadow-lg hover:shadow-white/20 text-sm">
                <!-- Mail Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-4 sm:h-4">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Send me an email
            </a>
            <a href="https://github.com/<?php echo htmlspecialchars($github_stats['username']); ?>" class="inline-flex items-center justify-center gap-2 text-white hover:text-zinc-100 transition-all duration-300 hover:scale-105 transform border border-zinc-700 hover:border-zinc-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-zinc-900/50 font-medium tracking-tight font-geist hover:shadow-lg hover:shadow-black/20 text-sm" target="_blank" rel="noopener noreferrer">
                <!-- GitHub Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-4 sm:h-4">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                Check my GitHub
            </a>
        </div>

        <!-- Footer -->
        <?php include __DIR__ . '/../includes/footer.php'; ?>
    </div>
</footer>
