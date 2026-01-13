<?php
/**
 * Hero Section
 * Profile introduction with photo, bio, and skills
 */
?>
<section id="about" class="px-4 sm:px-6 pt-8 sm:pt-16 pb-8 sm:pb-10 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
    <div class="space-y-6 sm:space-y-8">
        <!-- Professional Photo & Intro Section -->
        <div class="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div class="flex-1 space-y-4 sm:space-y-6 order-2 sm:order-1">
                <div class="space-y-2 sm:space-y-3">
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-[1.1] font-jetbrains">
                        <?php echo htmlspecialchars($site_config['name']); ?>
                    </h1>
                    <p class="text-base sm:text-lg lg:text-xl text-zinc-300 font-light tracking-tight">
                        <?php echo htmlspecialchars($site_config['title']); ?>
                    </p>
                </div>

                <p class="text-base text-zinc-300 leading-relaxed max-w-xl font-geist tracking-tight">
                    Hey <span class="inline-block">&#128075;</span> I'm a results-driven lead web developer currently guiding frontend strategy and delivery at&nbsp;
                    <span class="text-zinc-200 font-medium">GetOnNet</span> since 2021.
                    I specialize in crafting engaging, responsive frontend experiences with a focus on performance, cross-browser compatibility, and clean, scalable code.
                    <br><br>
                    My technical lens spans JavaScript, TypeScript, React, and modern CSS (SCSS/Tailwind), with practical exposure to VR, Three.js, and backend work in Node.js, Laravel, and WordPress. I hold certifications in PHP, Vue.js, and React.js. With a physics degree, I bring strong analytical rigor to problem solving and am exploring AI and machine learning to further elevate web experiences.
                    <span class="flex items-center gap-2 mt-3 text-sm text-zinc-300">
                        <!-- MapPin Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-300">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <?php echo htmlspecialchars($site_config['location']); ?>
                    </span>
                </p>
            </div>

            <!-- Professional Photo -->
            <div class="flex-shrink-0 order-1 sm:order-2">
                <div class="relative group">
                    <div class="w-32 h-64 sm:w-40 sm:h-40 rounded-lg overflow-hidden shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-black/30 transition-all duration-300">
                        <img
                            src="/assets/images/mahade-headshot.webp"
                            alt="<?php echo htmlspecialchars($site_config['name']); ?> - Lead Web Developer"
                            width="260"
                            height="260"
                            class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3">
            <a href="#contact" class="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg font-medium hover:bg-zinc-100 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-white/20 tracking-tight font-geist text-sm">
                Let's Work Together
            </a>
            <a href="#projects" class="inline-flex items-center gap-2 border border-zinc-700 text-white px-5 py-2.5 rounded-lg font-medium hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300 tracking-tight font-geist text-sm">
                View My Work
            </a>
        </div>

        <!-- Quick Skills Preview -->
        <div class="border-t border-zinc-800/50 pt-6">
            <p class="text-sm text-zinc-300 tracking-tight font-geist mb-3">
                Specialized in
            </p>
            <div class="flex flex-wrap gap-2">
                <?php foreach ($skills as $skillGroup): ?>
                    <?php foreach ($skillGroup['items'] as $skill): ?>
                        <span class="text-xs px-3 py-1.5 bg-zinc-900/60 text-zinc-300 rounded-lg border border-zinc-800/40 font-medium tracking-tight font-geist-mono">
                            <?php echo htmlspecialchars($skill); ?>
                        </span>
                    <?php endforeach; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
