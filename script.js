// Navigation burger menu for mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
});

// Animate stats when in viewport
const stats = document.querySelectorAll('.stat-item');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

stats.forEach(stat => {
    stat.style.opacity = 0;
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.5s ease-in-out';
    observer.observe(stat);
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let isTransitioning = false;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!isTransitioning) goToSlide(index);
        });
        dots.appendChild(dot);
    });

    const allDots = document.querySelectorAll('.dot');

    function goToSlide(n) {
        if (n === currentSlide) return;
        isTransitioning = true;

        slides[currentSlide].classList.remove('active');
        allDots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        allDots[currentSlide].classList.add('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (!isTransitioning) goToSlide(currentSlide + 1);
    }

    setInterval(nextSlide, 5000);

});

// Admin page access
let keySequence = '';
const targetSequence = 'nss';
const resetDelay = 1000; // Reset after 1 second

document.addEventListener('keydown', function(event) {
    // Only process if not typing in an input or textarea
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        // Add the pressed key to the sequence
        keySequence += event.key.toLowerCase();
        
        // Check if the sequence matches
        if (keySequence.includes(targetSequence)) {
            window.location.href = 'admin.html';
            keySequence = '';
        }
        
        // Reset the sequence after a delay
        setTimeout(() => {
            keySequence = '';
        }, resetDelay);
    }
});