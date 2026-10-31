// Steam Landing Page JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopButton = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const prevSlideButton = document.getElementById('prev-slide');
    const nextSlideButton = document.getElementById('next-slide');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            // Update active nav link
            updateActiveNavLink(this);
        });
    });
    
    // Back to Top Button Functionality
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLinkOnScroll();
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update active nav link
    function updateActiveNavLink(activeLink) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Update active nav link based on scroll position
    function updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('.steam-section');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Hero slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        if (totalSlides === 0) return;
        
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
        }
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Auto slide change - only if more than one slide
    if (totalSlides > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Dot click functionality
    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
        });
    }
    
    // Previous slide button functionality
    if (prevSlideButton && totalSlides > 1) {
        prevSlideButton.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });
    }
    
    // Next slide button functionality
    if (nextSlideButton && totalSlides > 1) {
        nextSlideButton.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });
    }
    
    // Section animations
    const sections = document.querySelectorAll('.steam-section, .animate-up');
    
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link with slight delay to allow scroll to settle
                setTimeout(() => {
                    updateActiveNavLink(this);
                }, 100);
            }
        });
    });
    
    // Set initial active nav link
    updateActiveNavLinkOnScroll();
    
    // Gallery Modal Functionality
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryModal = document.getElementById('close-gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const prevBtn = document.getElementById('prev-gallery-item');
    const nextBtn = document.getElementById('next-gallery-item');
    
    let currentGalleryIndex = 0;
    const galleryData = [];

    // Collect data and add click listeners
    if (screenshotItems.length > 0) {
        screenshotItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const title = item.querySelector('.screenshot-label h3');
            
            if (img && title) {
                galleryData.push({
                    src: img.src,
                    title: title.textContent
                });
                
                // Make the item look clickable
                item.style.cursor = 'pointer';
                
                item.addEventListener('click', () => {
                    openGalleryModal(index);
                });
            }
        });
    }

    function openGalleryModal(index) {
        currentGalleryIndex = index;
        updateModalContent();
        
        if (galleryModal) {
            galleryModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Hide navbar when gallery modal opens
            const header = document.querySelector('header');
            if (header) {
                header.style.display = 'none';
            }
        }
    }

    function updateModalContent() {
        if (galleryData.length > 0 && modalImage && modalTitle) {
            const data = galleryData[currentGalleryIndex];
            
            // Add a smooth fade-out fade-in effect
            modalImage.style.opacity = '0.5';
            setTimeout(() => {
                modalImage.src = data.src;
                modalImage.alt = data.title;
                modalTitle.textContent = data.title;
                modalImage.style.opacity = '1';
            }, 150);
        }
    }

    const handlePrev = () => {
        if (galleryData.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
        updateModalContent();
    };

    const handleNext = () => {
        if (galleryData.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
        updateModalContent();
    };

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handlePrev();
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleNext();
    });

    if (closeGalleryModal) {
        closeGalleryModal.addEventListener('click', () => {
            if (galleryModal) {
                galleryModal.classList.add('hidden');
                document.body.style.overflow = '';
                
                // Show navbar when gallery modal closes
                const header = document.querySelector('header');
                if (header) {
                    header.style.display = '';
                }
            }
        });
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            // Close if clicked outside the image or buttons
            if (e.target === galleryModal) {
                galleryModal.classList.add('hidden');
                document.body.style.overflow = '';
                
                const header = document.querySelector('header');
                if (header) {
                    header.style.display = '';
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!galleryModal.classList.contains('hidden')) {
                if (e.key === 'Escape') {
                    galleryModal.classList.add('hidden');
                    document.body.style.overflow = '';
                    
                    const header = document.querySelector('header');
                    if (header) {
                        header.style.display = '';
                    }
                } else if (e.key === 'ArrowLeft') {
                    handlePrev();
                } else if (e.key === 'ArrowRight') {
                    handleNext();
                }
            }
        });
        
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
                    handlePrev(); // Swipe right -> prev
                } else {
                    handleNext(); // Swipe left -> next
                }
            }
        }, { passive: true });
    }
});