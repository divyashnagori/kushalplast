// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Hero Carousel Logic
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
    // Remove active class from current
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Increment or loop
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

slideInterval = setInterval(nextSlide, intervalTime);

// Click on Dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        slideInterval = setInterval(nextSlide, intervalTime);
    });
});

// Theme Switcher Logic Removed (Carbon Monochrome is Final)
// Code cleaned up.

// Page Transition Logic (Optimized)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Link Prefetching on Hover (Speed)
    const prefetchLink = (url) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    };

    const prefetchedUrls = new Set();

    // 2. Smooth Transition Click Handling
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        const isInternal = href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank';

        // Prefetch on hover
        if (isInternal) {
            link.addEventListener('mouseover', () => {
                if (!prefetchedUrls.has(href)) {
                    prefetchLink(href);
                    prefetchedUrls.add(href);
                }
            });
        }

        // Smooth Exit
        link.addEventListener('click', (e) => {
            if (isInternal) {
                e.preventDefault();
                document.body.classList.add('page-exit');

                setTimeout(() => {
                    window.location.href = href;
                }, 150); // Reduced to 150ms for snappier feel
            }
        });
    });
});


// Scroll Animation Observer (Existing)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .product-card, .contact-card, .about-text, .about-image').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// About Us Carousel Logic
const aboutCarousel = document.querySelector('.about-carousel');
if (aboutCarousel) {
    const aboutSlides = aboutCarousel.querySelectorAll('.about-slide');
    let aboutCurrentSlide = 0;
    const aboutIntervalTime = 3000; // Not too slow, 3 seconds
    let aboutSlideInterval;

    const nextAboutSlide = () => {
        aboutSlides[aboutCurrentSlide].classList.remove('active');
        aboutCurrentSlide = (aboutCurrentSlide + 1) % aboutSlides.length;
        aboutSlides[aboutCurrentSlide].classList.add('active');
    };

    // Auto Play
    const startAboutSlide = () => {
        aboutSlideInterval = setInterval(nextAboutSlide, aboutIntervalTime);
    };

    const stopAboutSlide = () => {
        clearInterval(aboutSlideInterval);
    };

    startAboutSlide();

    // Pause on Hover
    aboutCarousel.addEventListener('mouseenter', stopAboutSlide);
    aboutCarousel.addEventListener('mouseleave', startAboutSlide);
}

// Technology Page Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
}
