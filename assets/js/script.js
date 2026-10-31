// Tanhaji Game Website JavaScript

// Gallery data
const galleryData = [
    {
        id: 1,
        title: "Tanhaji: The Maratha Warrior",
        image: "assets/images/screenshot-08.webp"
    },
    {
        id: 2,
        title: "Tanhaji in Action",
        image: "assets/images/screenshot-06.webp"
    },
    {
        id: 3,
        title: "Shivaji Maharaj on Horseback",
        image: "assets/images/screenshot-07.webp"
    },
    {
        id: 4,
        title: "Mughal Soldiers",
        image: "assets/images/screenshot-03.webp"
    },
    {
        id: 5,
        title: "Epic Battle Scene",
        image: "assets/images/screenshot-02.webp"
    },
    {
        id: 6,
        title: "Victory Celebration",
        image: "assets/images/victory-banner.webp"
    }
];

// Maps data
const mapsData = [
    // {
    //     id: 1,
    //     title: "Fort Map",
    //     image: "assets/images/maps/fort_map.png",
    //     description: "Experience the strategic stronghold of Fort Kondhana where the epic battle between Tanhaji and the Mughal forces took place. Navigate through the fort's intricate pathways and defend against enemy attacks in this historically significant location.",
    //     reverse: false
    // },
    {
        id: 1,
        title: "Battle Map",
        image: "assets/images/maps/battle-map.webp",
        description: "Engage in intense combat scenarios across diverse terrains in this action-packed battlefield environment. Face waves of enemies and utilize strategic positioning to overcome challenging encounters.",
        reverse: true
    },
    {
        id: 2,
        title: "Riding Map",
        image: "assets/images/maps/riding-map.webp",
        description: "Master the art of horseback combat and traverse through challenging landscapes with your loyal steed. Experience the thrill of mounted battles and swift tactical movements across varied terrains.",
        reverse: false
    },
    {
        id: 3,
        title: "Training Map",
        image: "assets/images/maps/training-map.webp",
        description: "Hone your combat skills and learn new techniques in this specialized training environment. Practice with various weapons and master different fighting styles to become a formidable warrior.",
        reverse: true
    },
    {
        id: 4,
        title: "Training Ground",
        image: "assets/images/maps/training-ground.webp",
        description: "Perfect your combat strategies and test your abilities in this dedicated training arena. Challenge yourself with advanced scenarios and refine your tactical approach to emerge victorious.",
        reverse: false
    }
];

// News Video data
const newsVideoData = [
    {
        id: 1,
        title: "ABP MAZA Interview",
        date: "19th Feb 2021",
        description: "Featured on ABP MAZA discussing Tanhaji: The Maratha Warrior — India’s first Maratha history game.",
        embedUrl: "https://www.youtube.com/embed/cG9UFlbjwZU"
    },
    {
        id: 2,
        title: "ET Now Award Winner",
        date: "17th Sept 2021",
        description: "Won Best Gaming Startup of the Year 2021 by ET Now Leaders of Tomorrow.",
        embedUrl: "https://www.youtube.com/embed/gm5sM2iOL9Y"
    },
    {
        id: 3,
        title: "Maharashtra News Coverage",
        date: "26th Feb 2021",
        description: "Tanhaji Game highlighted in major Maharashtra newspapers for promoting Maratha culture.",
        embedUrl: "https://www.youtube.com/embed/JQGV7WBhvdw"
    },
    {
        id: 4,
        title: "Radio Mirchi Feature",
        date: "22nd March 2021",
        description: "Talked about the creative journey of Tanhaji Game on Radio Mirchi 98.3 FM.",
        embedUrl: "https://www.youtube.com/embed/PRpuY4Ldjrg"
    },
];

// Mobile Menu Drawer Handlers
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function openMobileDrawer() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
    }

    function closeMobileDrawer() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileDrawer();
            } else {
                openMobileDrawer();
            }
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function (event) {
            event.stopPropagation();
            closeMobileDrawer();
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function () {
            closeMobileDrawer();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileDrawer();
        }
    });

    // Close when resized to desktop breakpoint
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileDrawer();
        }
    });

    // Close mobile menu when clicking on any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileDrawer();
            updateActiveNavLink(this);
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        const scrollToTop = document.getElementById('scroll-to-top');
        if (scrollToTop) {
            if (window.scrollY > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        }

        // Update active nav link based on scroll position
        updateActiveNavLinkOnScroll();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu and change icon when navigating to a section on mobile
                if (window.innerWidth < 768 && mobileMenu && !mobileMenu.classList.contains('hidden') && menuToggle) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                }

                // Update active nav link with slight delay to allow scroll to settle
                setTimeout(() => {
                    updateActiveNavLink(this);
                }, 100);
            }
        });
    });

    // Load gallery data
    loadGalleryData();

    // Load blog data
    loadBlogData();

    // Load news video data
    loadNewsVideoData();

    // Load maps data
    loadMapsData();

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitContactForm();
        });
    }

    // Scroll to top button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize animations on scroll
    initScrollAnimations();

    // Add animation to sections when they come into view
    animateSectionsOnScroll();

    // Initialize Steam button
    initSteamButton();

    // Initialize video modal
    initVideoModal();

    // Initialize gallery modal
    initGalleryModal();

    // Initialize news video navigation
    initNewsVideoNavigation();

    // Initialize hero video autoplay/pause on scroll
    initHeroVideoObserver();

    // Set initial active nav link
    updateActiveNavLinkOnScroll();

});

// Load maps data
function loadMapsData() {
    let mapsContainer = document.querySelector('#maps .mt-16.flex.flex-col');
    // Fallback selector if the first one doesn't work
    if (!mapsContainer) {
        mapsContainer = document.querySelector('.mt-16.flex.flex-col');
    }
    if (!mapsContainer) return;

    // Add the header
    mapsContainer.innerHTML = `
        <div class="text-center mb-12 animate-up">
            <h3 class="text-2xl md:text-3xl font-bold mb-4">Explore All Maps</h3>
            <p class="text-gray-300 max-w-2xl mx-auto">
                Discover the various environments and battlefields you'll encounter in your journey
            </p>
        </div>
    `;

    // Generate map cards
    mapsData.forEach((map, index) => {
        const mapCard = document.createElement('div');
        mapCard.className = `map-card bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${index < mapsData.length - 1 ? 'mb-8' : ''} flex flex-col md:flex-row${map.reverse ? '-reverse' : ''}`;
        mapCard.setAttribute('onclick', `openMapModal('${map.image}', '${map.title}')`);

        mapCard.innerHTML = `
            <div class="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                <img loading="lazy" decoding="async" src="${map.image}" alt="${map.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
            </div>
            <div class="md:w-3/5 p-8 flex flex-col justify-center">
                <h4 class="text-2xl font-bold text-white mb-4">${map.title}</h4>
                <p class="text-gray-300 text-base mb-6">${map.description}</p>
                <button class="self-start text-white font-bold">
                    Explore Map
                </button>
            </div>
        `;

        mapsContainer.appendChild(mapCard);
    });
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Update active nav link based on scroll position
function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Video modal functionality
function initVideoModal() {
    const viewMapBtn = document.getElementById('view-map-btn');
    const mapVideo = document.getElementById('map-video');
    const mapImageContainer = document.getElementById('map-image-container');
    const mapVideoContainer = document.getElementById('map-video-container');

    if (viewMapBtn && mapVideo && mapImageContainer && mapVideoContainer) {
        // Open video
        viewMapBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Hide image container and show video container
            mapImageContainer.classList.add('hidden');
            mapVideoContainer.classList.remove('hidden');

            // Auto play video
            mapVideo.play();
        });

        // Handle video ended event to switch back to image
        mapVideo.addEventListener('ended', function () {
            mapVideoContainer.classList.add('hidden');
            mapImageContainer.classList.remove('hidden');
        });

        // Handle video play event to ensure it plays when user clicks play button
        mapVideo.addEventListener('play', function () {
            // Ensure video is visible when playing
            if (mapVideoContainer.classList.contains('hidden')) {
                mapImageContainer.classList.add('hidden');
                mapVideoContainer.classList.remove('hidden');
            }
        });

        // Handle video pause event to keep it visible
        mapVideo.addEventListener('pause', function () {
            // Keep video visible when paused
            mapVideoContainer.classList.remove('hidden');
            mapImageContainer.classList.add('hidden');
        });
    }
}

// Steam button functionality
function initSteamButton() {
    // Steam button is now a direct link, so no JavaScript handler needed
}

// Load gallery data
function loadGalleryData() {
    const galleryContainer = document.getElementById('gallery-container');

    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';

    // Duplicate gallery data to create seamless loop
    const duplicatedData = [...galleryData, ...galleryData, ...galleryData];

    duplicatedData.forEach(item => {
        const galleryItemWrapper = document.createElement('div');
        galleryItemWrapper.className = 'gallery-border flex-shrink-0';
        galleryItemWrapper.innerHTML = `
            <div class="gallery-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" draggable="false">
                <div class="gallery-label">${item.title}</div>
            </div>
        `;
        galleryContainer.appendChild(galleryItemWrapper);
    });

    // Add click event listeners to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            openGalleryModal(id);
        });
    });

    // Add hover events to gallery items to pause the carousel
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            // Dispatch a custom event to pause the carousel
            galleryContainer.dispatchEvent(new CustomEvent('carouselPause'));
        });

        item.addEventListener('mouseleave', function () {
            // Dispatch a custom event to resume the carousel
            galleryContainer.dispatchEvent(new CustomEvent('carouselResume'));
        });
    });

    // Start infinite scroll animation
    startInfiniteScroll();
}

// Start infinite scroll animation
function startInfiniteScroll() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    // Calculate the width of one set of gallery items
    const itemWidth = 300 + 24; // width + margin
    const totalWidth = galleryData.length * itemWidth;

    // Set initial position
    let position = 0;
    const speed = 1; // pixels per frame
    let isPaused = false; // Track hover state

    // Drag/Swipe variables
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let dragMoveX = 0;
    let animationId = null;

    // Handle Drag start
    const handleDragStart = (e) => {
        isDragging = true;
        isPaused = true;
        startX = (e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
        dragMoveX = position;
        galleryContainer.classList.add('carousel-paused');
        galleryContainer.style.cursor = 'grabbing';
    };

    // Handle Drag move
    const handleDragMove = (e) => {
        if (!isDragging) return;

        // Prevent page scroll when dragging the carousel
        if (e.type === 'touchmove') {
            e.preventDefault();
        }

        const currentX = (e.type === 'touchmove' ? e.touches[0].clientX : e.clientX);
        const diff = currentX - startX;
        position = dragMoveX + diff;

        // Loop logic for smooth dragging
        if (position > 0) {
            position = -totalWidth;
            dragMoveX = position - diff;
        } else if (Math.abs(position) >= totalWidth * 2) {
            position = -totalWidth;
            dragMoveX = position - diff;
        }

        galleryContainer.style.transform = `translateX(${position}px)`;
    };

    // Handle Drag end
    const handleDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        isPaused = false;
        galleryContainer.classList.remove('carousel-paused');
        galleryContainer.style.cursor = 'grab';
    };

    // Mouse Events
    galleryContainer.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // Touch Events
    galleryContainer.addEventListener('touchstart', handleDragStart, { passive: true });
    galleryContainer.addEventListener('touchmove', handleDragMove, { passive: false });
    galleryContainer.addEventListener('touchend', handleDragEnd);

    // Initial cursor
    galleryContainer.style.cursor = 'grab';

    // Pause animation on hover
    galleryContainer.addEventListener('mouseenter', () => {
        if (!isDragging) {
            isPaused = true;
            galleryContainer.classList.add('carousel-paused');
        }
    });

    galleryContainer.addEventListener('mouseleave', () => {
        if (!isDragging) {
            isPaused = false;
            galleryContainer.classList.remove('carousel-paused');
        }
    });

    // Listen for custom events from gallery items
    galleryContainer.addEventListener('carouselPause', () => {
        isPaused = true;
        galleryContainer.classList.add('carousel-paused');
    });

    galleryContainer.addEventListener('carouselResume', () => {
        if (!isDragging) {
            isPaused = false;
            galleryContainer.classList.remove('carousel-paused');
        }
    });

    function animate() {
        if (!isPaused && !isDragging) {
            position -= speed;

            // Reset position when it reaches the end of the first set
            if (Math.abs(position) >= totalWidth) {
                position = 0;
            }

            galleryContainer.style.transform = `translateX(${position}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}

// Global variable to track current gallery index
let currentGalleryIndex = 0;

// Gallery modal functionality
function initGalleryModal() {
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryModal = document.getElementById('close-gallery-modal');
    const prevBtn = document.getElementById('prev-gallery-item');
    const nextBtn = document.getElementById('next-gallery-item');
    const mobilePrevBtn = document.getElementById('mobile-prev-gallery-item');
    const mobileNextBtn = document.getElementById('mobile-next-gallery-item');

    if (closeGalleryModal) {
        closeGalleryModal.addEventListener('click', function () {
            galleryModal.classList.add('hidden');

            // Show navbar when gallery modal closes
            const header = document.getElementById('header');
            if (header) {
                header.style.display = '';
            }

            // Restore background scrolling
            document.body.style.overflow = '';
        });
    }

    // Previous item click
    const handlePrev = () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
        updateGalleryModalContent();
    };

    // Next item click
    const handleNext = () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
        updateGalleryModalContent();
    };

    if (prevBtn) prevBtn.addEventListener('click', handlePrev);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);

    // Swipe logic for modal
    let modalTouchStartX = 0;
    galleryModal.addEventListener('touchstart', (e) => {
        modalTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    galleryModal.addEventListener('touchend', (e) => {
        const modalTouchEndX = e.changedTouches[0].clientX;
        const diff = modalTouchEndX - modalTouchStartX;
        if (Math.abs(diff) > 50) { // Threshold for swipe
            if (diff > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        }
    }, { passive: true });

    // Close modal when clicking outside
    if (galleryModal) {
        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                galleryModal.classList.add('hidden');

                // Show navbar when gallery modal closes
                const header = document.getElementById('header');
                if (header) {
                    header.style.display = '';
                }

                // Restore background scrolling
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key and navigate with arrows
        document.addEventListener('keydown', function (e) {
            if (!galleryModal.classList.contains('hidden')) {
                if (e.key === 'Escape') {
                    galleryModal.classList.add('hidden');
                    const header = document.getElementById('header');
                    if (header) header.style.display = '';
                    document.body.style.overflow = '';
                } else if (e.key === 'ArrowLeft') {
                    handlePrev();
                } else if (e.key === 'ArrowRight') {
                    handleNext();
                }
            }
        });
    }
}

// Open gallery modal
function openGalleryModal(id) {
    const index = galleryData.findIndex(item => item.id == id);
    if (index === -1) return;

    currentGalleryIndex = index;
    const galleryModal = document.getElementById('gallery-modal');
    const header = document.getElementById('header');

    if (galleryModal) {
        updateGalleryModalContent();
        galleryModal.classList.remove('hidden');

        // Hide navbar when gallery modal opens
        if (header) {
            header.style.display = 'none';
        }

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
}

// Update gallery modal content based on currentGalleryIndex
function updateGalleryModalContent() {
    const item = galleryData[currentGalleryIndex];
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');

    if (modalImage && modalTitle && item) {
        // Add a smooth fade-out fade-in effect
        modalImage.style.opacity = '0.5';
        setTimeout(() => {
            modalImage.src = item.image;
            modalImage.alt = item.title;
            modalImage.setAttribute('draggable', 'false');
            modalTitle.textContent = item.title;
            modalImage.style.opacity = '1';
        }, 150);
    }
}

// Load news video data
function loadNewsVideoData() {
    const videoContainer = document.getElementById('news-video-container');

    if (!videoContainer) return;

    videoContainer.innerHTML = '';

    newsVideoData.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'news-video-item bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 flex-shrink-0';
        videoItem.innerHTML = `
            <div class="news-video-embed">
                <iframe loading="lazy" src="${video.embedUrl}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-48"></iframe>
            </div>
            <div class="p-6">
                <div class="flex items-center text-gray-400 mb-3">
                    <i class="far fa-calendar mr-2"></i>
                    <span>${video.date}</span>
                </div>
                <h3 class="text-xl font-bold mb-3">${video.title}</h3>
                <p class="text-gray-300 mb-4">
                    ${video.description}
                </p>
            </div>
        `;
        videoContainer.appendChild(videoItem);
    });
}

// Initialize news video navigation
function initNewsVideoNavigation() {
    const prevButton = document.getElementById('news-video-prev');
    const nextButton = document.getElementById('news-video-next');
    const videoContainer = document.getElementById('news-video-container');

    if (!prevButton || !nextButton || !videoContainer) return;

    // Previous button click handler
    prevButton.addEventListener('click', function () {
        videoContainer.scrollBy({
            left: -374, // width + margin of one video item
            behavior: 'smooth'
        });
    });

    // Next button click handler
    nextButton.addEventListener('click', function () {
        videoContainer.scrollBy({
            left: 374, // width + margin of one video item
            behavior: 'smooth'
        });
    });
}

// blog data
const blogData = [
    {
        id: 1,
        slug: "indian-gaming-2022-23",
        title: "INDIAN GAMING in 2022-23",
        excerpt: "India is a place where people spend thousands of rupees every month to watch movies with friends and family. But what about gaming in India? Both movies and games are for entertainment, but games are more interactive and engaging. Once considered a hobby, gaming is now becoming a billion-dollar market where developers and gamers can earn more than traditional employees. Esports have grown globally, with players from all over the world participating in international tournaments.",
        fullContent: `<div class="blog-content">
    <h3>The Gaming Industry in India</h3>
    <p>India's gaming industry encompasses three main types:</p>
    <ul>
        <li>PC Gaming</li>
        <li>Mobile Gaming</li>
        <li>Online Gaming</li>
    </ul>

    <h3>PC Gaming</h3>
    <p>When it comes to graphics and performance, PCs are the best. They are customizable and can be integrated with high-end graphics cards, powerful processors, and large system memory. PC Gaming in India is rapidly growing due to this customizability.</p>

    <h3>Mobile Gaming</h3>
    <p>Mobile gaming represents the future of the industry. Smartphone makers like Snapdragon, Apple, Samsung, Huawei, and MediaTek release powerful processors every year, enhancing mobile gaming performance. With millions of downloads on platforms like Google Play Store and Apple App Store, mobile gaming is booming in India. Startups are emerging, investments are lower, and accessibility is driving its growth.</p>

    <h3>Online Gaming</h3>
    <p>Online gaming involves playing video games over the internet, allowing people to find and play with friends globally. It can be enjoyed on PCs, consoles, or mobile devices, and has become a major form of entertainment and social interaction.</p>

    <h3>Types of Video Games</h3>
    
    <h3>Action Games</h3>
    <p>Games centered around physical challenges that test hand-eye coordination and reflexes. Examples include Donkey Kong and modern shooters.</p>
    <p>Subgenres: Platformer, Shooter, Fighting, Stealth, Survival</p>
    
    <h3>Adventure Games</h3>
    <p>Focus on storytelling, exploration, and puzzle solving. Players interact with the environment and characters to progress through the story.</p>
    
    <h3>Role-Playing Games (RPG)</h3>
    <p>Players assume the role of a character in a narrative-driven setting. Actions and character progression follow structured rules.</p>
    <p>Types: Action RPG, MMORPG, Tactical RPG, Sandbox RPG</p>
    
    <h3>Simulation Games</h3>
    <p>Games that emulate real or fictional situations such as running a business, building cities, or driving vehicles.</p>
    
    <h3>Strategy Games</h3>
    <p>Games requiring players to use strategic planning and tactical thinking. Inspired by traditional board games, often turn-based or real-time.</p>
    
    <h3>Sports Games</h3>
    <p>Simulate real-world sports like football, cricket, basketball, or golf. These games allow players to compete against AI or real opponents.</p>
    <p>Subgenres: Racing, Team Sports, Competitive, Sports-based Fighting</p>
    
    <h3>Puzzle Games</h3>
    <p>Require problem-solving skills, logic, or quick matching to progress. Popular on mobile due to simplicity and accessibility.</p>
    <p>Subgenres: Logic Game, Trivia Game</p>

    <h3>Gaming Preferences in India</h3>
    <p>In India, mobile games are more popular than PC games mainly due to affordability and accessibility. Developers are now adapting PC and console titles for mobile audiences.</p>
    
    <h3>Popular Games in India</h3>
    <ul>
        <li>PlayerUnknown's Battlegrounds (PUBG)</li>
        <li>Call of Duty: Mobile</li>
        <li>Clash of Clans</li>
        <li>Clash Royale</li>
        <li>8 Ball Pool</li>
        <li>Ludo King</li>
        <li>Teen Patti</li>
        <li>Indian Rummy</li>
        <li>Carrom King</li>
    </ul>
    
    <h3>Less Known Games</h3>
    <ul>
        <li>Assassin's Creed</li>
        <li>Far Cry</li>
        <li>Fallout</li>
        <li>Age of Empires</li>
        <li>The Witcher</li>
        <li>Tomb Raider</li>
    </ul>

    <h3>Indian RPG Adventure Game: Tanhaji – The Lion Maratha Warrior</h3>
    <p><strong>Publisher:</strong> AbracaDabra Software Solutions Pvt. Ltd.</p>
    <p>Following the lockdown, Indian gamers developed a strong interest in war-themed mobile games like PUBG and Call of Duty. After the government's ban on several foreign titles, AbracaDabra Software Solutions launched India's first fully developed 3D RPG, 'Tanhaji – The Lion Maratha Warrior', inspired by Maratha war history.</p>
    
    <h3>Story</h3>
    <p>Based on the life of Tanhaji Malusare, a brave warrior under Chhatrapati Shivaji Maharaj, who recaptured the Kondhana Fort from the Mughals in the 17th century.</p>
    
    <h3>Features</h3>
    <ul>
        <li>Developed by an Indian startup under the Atmanirbhar Bharat initiative</li>
        <li>12 game levels featuring historical characters like Siddhi Hilal and Udaybhan</li>
        <li>Regional music and immersive 3D visuals</li>
        <li>Promotes patriotism, courage, and dedication among youth</li>
        <li>Available for free on Google Play Store</li>
    </ul>

    <h3>Conclusion</h3>
    <p>Mobile gaming dominates the Indian market due to accessibility and affordability. However, with increasing local development and government support, India is emerging as a strong player in global gaming. Games like Tanhaji mark the beginning of India's journey toward self-reliance and innovation in gaming.</p>
</div>`,
        date: "June 15, 2023",
        author: "Game Insider",
        image: "assets/images/blog-indian-gaming.webp"
    }
];

// Load blog data
function loadBlogData() {
    const blogContainer = document.getElementById('blog-container');

    if (!blogContainer) return;

    blogContainer.innerHTML = '';

    blogData.forEach(blog => {
        // Check if this is the full blog post with the long content
        const hasFullContent = blog.fullContent && blog.fullContent.length > blog.excerpt.length;

        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card bg-gray-900 rounded-lg overflow-hidden shadow-xl';
        blogCard.innerHTML = `
            <div class="image-container">
                <img loading="lazy" decoding="async" src="${blog.image}" alt="${blog.title}" class="w-full h-full object-contain">
            </div>
            <div class="p-6">
                <div class="flex items-center text-gray-400 mb-3">
                    <i class="far fa-calendar mr-2"></i>
                    <span>${blog.date}</span>
                    <i class="far fa-user ml-4 mr-2"></i>
                    <span>${blog.author}</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">${blog.slug ? `<a href="blog/${blog.slug}/" class="hover:text-orange-400 transition duration-300">${blog.title}</a>` : blog.title}</h3>
                <p class="text-gray-300 mb-4">${blog.excerpt}</p>
                ${hasFullContent ?
                `<a href="#" class="read-more-link text-orange-500 hover:text-orange-400 font-bold flex items-center" data-blog-id="${blog.id}">
                        Read More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                    <div class="blog-full-content hidden mt-4 text-gray-300" id="blog-content-${blog.id}">
                        ${blog.fullContent}
                    </div>`
                :
                `<a href="#" class="text-orange-500 hover:text-orange-400 font-bold flex items-center">
                        Read More <i class="fas fa-arrow-right ml-2"></i>
                    </a>`
            }
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });

    // Add event listeners for read more links
    document.querySelectorAll('.read-more-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const blogId = this.getAttribute('data-blog-id');
            const fullContent = document.getElementById(`blog-content-${blogId}`);

            if (fullContent) {
                fullContent.classList.toggle('hidden');
                this.innerHTML = fullContent.classList.contains('hidden') ?
                    `Read More <i class="fas fa-arrow-right ml-2"></i>` :
                    `Read Less <i class="fas fa-arrow-up ml-2"></i>`;
            }
        });
    });
}

// Contact form submission
function submitContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (!form || !formMessage) return;

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;

    const cfg = window.TANHAJI_CONFIG || {};
    const restoreButton = () => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    };

    if (cfg.formEndpoint) {
        // Real submission to the configured form service (Formspree, Web3Forms, own API...)
        fetch(cfg.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
            .then(response => {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                showFormMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
                form.reset();
                if (window.trackEvent) window.trackEvent('contact_form_submit');
            })
            .catch(() => {
                showFormMessage('Sorry, we could not send your message. Please email us at support@abraca-dabra.com.', 'error');
            })
            .finally(restoreButton);
    } else {
        // No form service configured yet: open the visitor's email app instead of faking success
        const subject = encodeURIComponent('Message from ' + name + ' via the Tanhaji website');
        const body = encodeURIComponent(message + '\n\n' + name + ' (' + email + ')');
        window.location.href = 'mailto:support@abraca-dabra.com?subject=' + subject + '&body=' + body;
        showFormMessage('Your email app should open with your message ready to send. If it does not, write to support@abraca-dabra.com.', 'success');
        restoreButton();
    }
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');

    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = type === 'success' ? 'success-message' : 'error-message';
    formMessage.classList.remove('hidden');

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add animation classes to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on element type
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animate-fadeIn');
                } else if (entry.target.classList.contains('animate-up')) {
                    entry.target.classList.add('animate-fadeInUp');
                } else if (entry.target.classList.contains('animate-left')) {
                    entry.target.classList.add('animate-fadeInLeft');
                } else if (entry.target.classList.contains('animate-right')) {
                    entry.target.classList.add('animate-fadeInRight');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll, .animate-up, .animate-left, .animate-right').forEach(el => {
        observer.observe(el);
    });
}

// Animate sections when they come into view
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add animation classes to elements on page load
window.addEventListener('load', function () {
    // Add staggered animations to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation to blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation to news video items
    const videoItems = document.querySelectorAll('.news-video-item');
    videoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Section animation on scroll
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Map modal functionality
function openMapModal(imageSrc, title) {
    const modal = document.getElementById('map-modal');
    const modalImage = document.getElementById('modal-map-image');
    const modalTitle = document.getElementById('modal-map-title');
    const header = document.getElementById('header');

    if (modal && modalImage && modalTitle) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modal.classList.remove('hidden');

        // Hide navbar when map modal opens
        if (header) {
            header.style.display = 'none';
        }

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
}

function closeMapModal() {
    const modal = document.getElementById('map-modal');
    const header = document.getElementById('header');

    if (modal) {
        modal.classList.add('hidden');

        // Show navbar when map modal closes
        if (header) {
            header.style.display = '';
        }

        // Restore background scrolling
        document.body.style.overflow = '';
    }
}

// Initialize map modal event listeners
document.addEventListener('DOMContentLoaded', function () {
    const closeMapModalBtn = document.getElementById('close-map-modal');
    const mapModal = document.getElementById('map-modal');

    if (closeMapModalBtn) {
        closeMapModalBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closeMapModal();
        });
    }

    if (mapModal) {
        mapModal.addEventListener('click', function (e) {
            if (e.target === mapModal) {
                closeMapModal();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !mapModal.classList.contains('hidden')) {
                closeMapModal();
            }
        });
    }
});
// Hero video observer to play/pause when in view
function initHeroVideoObserver() {
    const heroVideo = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('hero-play-pause');
    const videoLoader = document.getElementById('video-loader');

    if (!heroVideo) return;

    // Load a light video only when it is appropriate (not on Data Saver / reduced motion)
    const conn = navigator.connection || {};
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function ensureHeroSrc() {
        if (heroVideo.getAttribute('src')) return;
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        heroVideo.src = isDesktop ? heroVideo.dataset.srcDesktop : heroVideo.dataset.srcMobile;
        heroVideo.load();
    }
    if (conn.saveData || reduceMotion) {
        heroVideo.pause();
        heroVideo.dataset.manualPause = "true";
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play text-xl ml-1"></i>';
    } else {
        ensureHeroSrc();
    }

    // Handle video loading
    heroVideo.addEventListener('loadeddata', () => {
        if (videoLoader) {
            videoLoader.style.opacity = '0';
            setTimeout(() => {
                videoLoader.classList.add('hidden');
                heroVideo.classList.remove('opacity-0');
                heroVideo.classList.add('opacity-100');
            }, 500);
        }
    });

    // Fallback if video is already loaded or cached
    if (heroVideo.readyState >= 3) {
        if (videoLoader) {
            videoLoader.classList.add('hidden');
            heroVideo.classList.remove('opacity-0');
            heroVideo.classList.add('opacity-100');
        }
    }

    // Play/Pause toggle logic
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            ensureHeroSrc();
            if (heroVideo.paused) {
                heroVideo.muted = false; // Unmute on interaction to enable sound
                heroVideo.play().catch(err => console.error("Playback failed:", err));
                playPauseBtn.innerHTML = '<i class="fas fa-pause text-xl"></i>';
                heroVideo.dataset.manualPause = "false";
            } else {
                heroVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play text-xl ml-1"></i>';
                heroVideo.dataset.manualPause = "true";
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (heroVideo.dataset.manualPause !== "true") {
                    heroVideo.play().catch(e => console.error("Auto-play was prevented:", e));
                }
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroVideo);
}


// Keep aria-expanded in sync with the mobile menu state (accessibility)
(function () {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    const sync = () => toggle.setAttribute('aria-expanded', String(menu.classList.contains('active')));
    sync();
    new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });
})();
