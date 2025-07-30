// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.dish-card, .about-text, .about-image, .fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Staggered animation for dish cards
function animateDishCards() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 200);
        }
    });
}

// Testimonial functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialBtns = document.querySelectorAll('.testimonial-btn');

function showTestimonial(index) {
    // Remove active class from all testimonials and buttons
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected testimonial and button
    testimonials[index].classList.add('active');
    testimonialBtns[index].classList.add('active');
    
    currentTestimonial = index;
}

// Auto-rotate testimonials
function autoRotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Start auto-rotation
let testimonialInterval = setInterval(autoRotateTestimonials, 5000);

// Pause auto-rotation when user interacts
testimonialBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        showTestimonial(index);
        // Restart auto-rotation after 10 seconds
        setTimeout(() => {
            testimonialInterval = setInterval(autoRotateTestimonials, 5000);
        }, 10000);
    });
});

// Newsletter form handling
function handleNewsletter(event) {
    event.preventDefault();
    const input = event.target.querySelector('.newsletter-input');
    const email = input.value;
    
    if (email) {
        // Simulate API call
        const button = event.target.querySelector('.newsletter-button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            input.value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1000);
    }
}

// Parallax effect for hero section
function parallaxEffect() {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    
    if (heroImage) {
        heroImage.style.transform = `scale(1.1) translateY(${parallax}px)`;
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll effects
function handleScroll() {
    animateOnScroll();
    animateDishCards();
    parallaxEffect();
}

// Throttle scroll events for better performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
        animateDishCards();
    }, 500);
    
    // Add loading animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add subtle hover effects to dish cards
document.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.style.transform.includes('translateY')) {
            this.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
    });
}

// Intersection Observer for better animation performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.dish-card, .about-text, .about-image').forEach(element => {
    observer.observe(element);
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize any final animations
    setTimeout(() => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 100);
        });
    }, 200);
});