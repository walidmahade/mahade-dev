<?php
/**
 * Header/Navigation Component
 * Sticky navigation with desktop and mobile support
 */

$current_page = $current_page ?? 'home';
?>
<div class="sticky top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-4 sm:px-6 sm:pt-8">
    <header class="w-full max-w-3xl xl:max-w-5xl 2xl:max-w-6xl">
        <div class="px-4 py-3 mx-auto transition-all duration-300 border rounded-full shadow-2xl bg-black/20 backdrop-blur-2xl border-white/10 sm:px-6 shadow-black/40 hover:shadow-black/60 w-fit hover:bg-black/30 hover:border-white/20">
            <!-- Desktop Navigation -->
            <div class="items-center hidden gap-8 md:flex">
                <div class="flex items-center gap-3">
                    <a href="/" class="text-sm font-medium text-white/90 font-jetbrains italic tracking-tight drop-shadow-sm hover:text-white transition-colors">
                        mahade.dev
                    </a>
                </div>
                <nav class="flex items-center gap-6 text-sm">
                    <a href="/#about" class="nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent" data-section="about">
                        About
                    </a>
                    <a href="/#experience" class="nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent" data-section="experience">
                        Experience
                    </a>
                    <a href="/#projects" class="nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent" data-section="projects">
                        Projects
                    </a>
                    <a href="/uses" class="<?php echo $current_page === 'uses' ? 'text-white bg-white/15 border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10 border-transparent'; ?> transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border">
                        Uses
                    </a>
                    <a href="/#contact" class="nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent" data-section="contact">
                        Contact
                    </a>
                </nav>
            </div>

            <!-- Mobile Navigation -->
            <div class="flex items-center justify-between md:hidden">
                <a href="/" class="text-sm font-medium text-white/90 font-jetbrains italic tracking-tight drop-shadow-sm">
                    mahade.dev
                </a>
                <button type="button" id="mobile-menu-button" class="p-2 transition-colors text-white/70 hover:text-white" aria-label="Toggle menu">
                    <!-- Menu Icon -->
                    <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                    <!-- Close Icon (hidden by default) -->
                    <svg id="close-icon" class="hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="hidden md:hidden mt-2 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/40 mx-auto w-fit min-w-[200px]">
            <nav class="flex flex-col gap-3">
                <a href="/#about" class="mobile-nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent text-center">
                    About
                </a>
                <a href="/#experience" class="mobile-nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent text-center">
                    Experience
                </a>
                <a href="/#projects" class="mobile-nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent text-center">
                    Projects
                </a>
                <a href="/uses.php" class="<?php echo $current_page === 'uses' ? 'text-white bg-white/15 border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10 border-transparent'; ?> transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-center">
                    Uses
                </a>
                <a href="/#contact" class="mobile-nav-link transition-all duration-200 px-3 py-1.5 rounded-full font-medium tracking-tight backdrop-blur-sm border text-white/70 hover:text-white hover:bg-white/10 border-transparent text-center">
                    Contact
                </a>
            </nav>
        </div>
    </header>
</div>

<script>
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

    // Active section highlighting (only on homepage)
    if (window.location.pathname === '/' || window.location.pathname === '/index.php') {
        const sections = ['about', 'experience', 'projects', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveSection() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            let activeSection = 'about';

            // If near bottom, show contact
            if (scrollY + windowHeight >= documentHeight - 100) {
                activeSection = 'contact';
            } else {
                // Check sections from bottom to top
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = document.getElementById(sections[i]);
                    if (section && scrollY >= section.offsetTop - 200) {
                        activeSection = sections[i];
                        break;
                    }
                }
            }

            // Update nav link styles
            navLinks.forEach(function(link) {
                const section = link.getAttribute('data-section');
                if (section === activeSection) {
                    link.classList.remove('text-white/70', 'border-transparent');
                    link.classList.add('text-white', 'bg-white/15', 'border-white/20');
                } else {
                    link.classList.remove('text-white', 'bg-white/15', 'border-white/20');
                    link.classList.add('text-white/70', 'border-transparent');
                }
            });
        }

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
    }
});
</script>
