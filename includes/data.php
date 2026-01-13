<?php
/**
 * Portfolio Data
 * All static content for the portfolio site
 */

$experiences = [
    [
        'year' => '2021 – Present',
        'role' => 'Lead Web Developer',
        'company' => 'GetOnNet',
        'tech' => ['JavaScript', 'TypeScript', 'React', 'TailwindCSS', 'GrapesJS', 'WYSIWYG'],
        'description' => 'Guiding frontend strategy and delivery, building responsive experiences with focus on performance and clean, scalable code.',
    ],
    [
        'year' => '2019 – 2021',
        'role' => 'Frontend Developer',
        'company' => 'GetOnNet',
        'tech' => ['JavaScript', 'React', 'CSS', 'SCSS', 'WordPress', 'Laravel'],
        'description' => 'Developed responsive frontend experiences, page builders, and cross-browser compatible web applications.',
    ],
    [
        'year' => '2018 – 2019',
        'role' => 'Lead Developer',
        'company' => 'Optimized360',
        'tech' => ['JavaScript', 'React', 'Node.js', 'CSS', 'WordPress'],
        'description' => 'Led development team, built custom web solutions, and managed project delivery.',
    ],
    [
        'year' => '2016 – 2019',
        'role' => 'Freelance Frontend Developer',
        'company' => 'Self-Employed',
        'tech' => ['JavaScript', 'HTML', 'CSS', 'WordPress', 'PHP'],
        'description' => 'Built custom websites and web applications for various clients, honing frontend development skills.',
    ],
];

$projects = [
    [
        'name' => 'Page Builder System',
        'desc' => 'Custom WYSIWYG page builder using GrapesJS for dynamic website creation.',
        'tech' => ['JavaScript', 'GrapesJS', 'CSS', 'React'],
        'github' => 'https://github.com/walidmahade',
        'deployed' => null,
        'status' => 'Production',
        'impact' => 'Used by 100+ clients',
        'featured' => true,
    ],
    [
        'name' => 'Vue Mining App',
        'desc' => 'Interactive mining application built with Vue.js framework.',
        'tech' => ['Vue.js', 'JavaScript', 'CSS'],
        'github' => 'https://github.com/walidmahade',
        'deployed' => null,
        'status' => 'Completed',
        'impact' => null,
        'featured' => true,
    ],
    [
        'name' => 'Company Intranet',
        'desc' => 'Internal web application for team collaboration and resource management.',
        'tech' => ['React', 'Node.js', 'Laravel', 'MySQL'],
        'github' => 'https://github.com/walidmahade',
        'deployed' => null,
        'status' => 'Private',
        'impact' => null,
        'featured' => true,
    ],
    [
        'name' => 'Portfolio Website',
        'desc' => 'Personal portfolio site built with PHP and TailwindCSS.',
        'tech' => ['PHP', 'TailwindCSS', 'JavaScript'],
        'github' => 'https://github.com/walidmahade/mahade-dev',
        'deployed' => 'https://mahade.dev',
        'status' => 'Live',
        'impact' => null,
        'featured' => true,
    ],
    [
        'name' => 'WordPress Themes',
        'desc' => 'Custom WordPress themes and plugins for client projects.',
        'tech' => ['WordPress', 'PHP', 'JavaScript', 'CSS'],
        'github' => 'https://github.com/walidmahade',
        'deployed' => null,
        'status' => 'Completed',
        'impact' => '20+ projects',
        'featured' => false,
    ],
    [
        'name' => 'Three.js Experiments',
        'desc' => 'Interactive 3D web experiments and VR prototypes.',
        'tech' => ['Three.js', 'JavaScript', 'WebGL', 'VR'],
        'github' => 'https://github.com/walidmahade',
        'deployed' => null,
        'status' => 'Experimental',
        'impact' => null,
        'featured' => false,
    ],
];

$skills = [
    [
        'category' => 'Frontend',
        'items' => ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'SCSS', 'TailwindCSS'],
        'level' => 95,
    ],
    [
        'category' => 'Page Builders & Tools',
        'items' => ['GrapesJS', 'WYSIWYG Editors', 'DOM Manipulation', 'Responsive Design'],
        'level' => 90,
    ],
    [
        'category' => 'Backend',
        'items' => ['Node.js', 'Laravel', 'PHP', 'WordPress'],
        'level' => 75,
    ],
    [
        'category' => 'Emerging Tech',
        'items' => ['Three.js', 'VR', 'AI/ML'],
        'level' => 70,
    ],
    [
        'category' => 'Development Tools',
        'items' => ['VS Code', 'Git', 'Git Bash'],
        'level' => 95,
    ],
];

$github_stats = [
    'totalStars' => 65,
    'totalForks' => 20,
    'followers' => 50,
    'contributions' => 500,
    'username' => 'walidmahade',
    'stackoverflow_rep' => 9484,
    'stackoverflow_rank' => 'Top 1% in VS Code & Git Bash',
];

$uses = [
    [
        'header' => 'Gears',
        'items' => [
            ['name' => 'Acer Aspire 5s (Linux)', 'url' => 'https://www.flipkart.com/acer-aspire-5s-core-i5-8th-gen-8-gb-1-tb-hdd-windows-10-home-a515-52-laptop/p/itmfdvfhnbbxbqpt'],
            ['name' => 'Macbook Pro M4 PRO', 'url' => 'https://www.apple.com/in/shop/buy-mac/macbook-pro'],
            ['name' => 'Garmin Venu SQ 2', 'url' => 'https://www.amazon.in/Garmin-Venu-Sq-Shadow-Slate/dp/B0BD57PMSX'],
        ],
    ],
    [
        'header' => 'Desktop Apps',
        'items' => [
            ['name' => 'Visual Studio Code', 'url' => 'https://code.visualstudio.com/'],
            ['name' => 'Zed', 'url' => 'https://zed.dev/'],
            ['name' => 'Google Chrome', 'url' => 'https://www.google.com/chrome/'],
            ['name' => 'Firefox', 'url' => 'https://www.mozilla.org/en-US/firefox/developer/'],
            ['name' => 'Postman', 'url' => 'https://www.postman.com/'],
            ['name' => 'Figma', 'url' => 'https://www.figma.com/'],
            ['name' => 'Slack', 'url' => 'https://slack.com/intl/en-in'],
            ['name' => 'Spotify', 'url' => 'https://open.spotify.com'],
            ['name' => 'Proton VPN', 'url' => 'https://protonvpn.com/download'],
        ],
    ],
    [
        'header' => 'Mobile Apps',
        'items' => [
            ['name' => 'Cromite - Privacy enabled chrome', 'url' => 'https://github.com/uazo/cromite'],
            ['name' => 'Discord', 'url' => 'https://play.google.com/store/apps/details?id=com.discord'],
            ['name' => 'Reddit', 'url' => 'https://play.google.com/store/apps/details?id=com.reddit.frontpage'],
            ['name' => 'Adobe Scan', 'url' => 'https://play.google.com/store/apps/details?id=com.adobe.scan.android'],
            ['name' => 'Proton VPN', 'url' => 'https://protonvpn.com/download'],
            ['name' => 'Proton Mail', 'url' => 'https://proton.me/mail'],
            ['name' => 'Apple Music', 'url' => 'https://play.google.com/store/apps/details?id=com.apple.android.music'],
            ['name' => 'Sunoh Music', 'url' => 'https://sunoh.online/'],
            ['name' => 'Stremio', 'url' => 'https://www.stremio.com/'],
            ['name' => 'Strava', 'url' => 'https://play.google.com/store/apps/details?id=com.strava'],
        ],
    ],
    [
        'header' => 'Learning',
        'items' => [
            ['name' => 'Frontend Masters', 'url' => 'https://frontendmasters.com'],
        ],
    ],
    [
        'header' => 'Entertainment',
        'items' => [
            ['name' => 'Soundcore Q35', 'url' => 'https://www.flipkart.com/soundcore-anker-life-q35-targeted-active-noise-cancellation-enabled-bluetooth-headset/p/itm2edc39c53f8c9'],
            ['name' => 'Motorola Buds Plus', 'url' => 'https://www.flipkart.com/moto-buds-sound-bose-dual-dynamic-drivers-48db-anc-dolby-head-tracking-bluetooth/p/itm5ea1bc405eee3'],
            ['name' => 'Soundcore Liberty Air 2 Pro', 'url' => 'https://www.flipkart.com/soundcore-anker-liberty-air-2-pro-active-noise-cancellation-bluetooth-headset/p/itm998fdbaa17aa1'],
            ['name' => 'Soundcore Motion X600', 'url' => 'https://us.soundcore.com/products/motion-x600-a3130011'],
            ['name' => 'Soundcore Motion 300', 'url' => 'https://us.soundcore.com/products/motion-300-speaker-a3135011'],
            ['name' => 'Mi Smart Speaker', 'url' => 'https://www.flipkart.com/mi-smart-speaker-google-assistant/p/itmc7434534b8b84'],
            ['name' => 'KZ - ZEX', 'url' => 'https://www.headphonezone.in/products/kz-zex'],
            ['name' => 'KZ - Ling Long', 'url' => 'https://www.headphonezone.in/products/kz-ling-long'],
        ],
    ],
];

// Site configuration
$site_config = [
    'name' => 'Mahade Walid',
    'title' => 'Lead Web Developer',
    'email' => 'mahade.walid@gmail.com',
    'location' => 'Bangladesh',
    'site_url' => 'https://mahade.dev',
    'og_image' => 'https://mahade.dev/assets/images/mahade-headshot.webp',
    'twitter_handle' => '@mahadewalid',
    'ga_id' => 'G-00ZDLV4JQ0',
    'certifications' => ['PHP: Object-Oriented Programming', 'React.js: Building an Interface', 'Intro to Vue.js', 'Building RESTful APIs in Laravel'],
    'education' => 'Bachelor\'s in Physics, Anandamohan College',
];
