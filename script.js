// Google Analytics Event Tracking Helper
function trackEvent(eventName, category, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
}

// Tab Navigation System
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabName) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab links
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked tab link
    const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Track tab navigation
    trackEvent('tab_navigation', 'Navigation', tabName);

    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click event to tab links
tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = link.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Track theme toggle
    trackEvent('theme_toggle', 'User Preferences', newTheme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Enhanced Scroll Animations with Multiple Effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Fade In Observer
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Slide From Left Observer
const slideLeftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Slide From Right Observer
const slideRightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Scale Up Observer
const scaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Legacy observer for backward compatibility
const observer = fadeInObserver;

// Observe elements for enhanced scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate timeline items with alternating slide effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            slideLeftObserver.observe(item);
        } else {
            item.style.transform = 'translateX(50px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            slideRightObserver.observe(item);
        }
    });

    // Animate project cards with stagger
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // Animate writing/article cards with slide from bottom
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
        fadeInObserver.observe(card);
    });

    // Animate certificate cards with scale effect
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        scaleObserver.observe(card);
    });

    // Animate course cards with stagger
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        fadeInObserver.observe(card);
    });

    // Animate section titles with slide from top
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-30px)';
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        fadeInObserver.observe(title);
    });

    // Animate about content
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateY(40px)';
        aboutText.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
        fadeInObserver.observe(aboutText);
    }

    // Animate highlight items with alternating directions
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-40px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
            slideLeftObserver.observe(item);
        } else {
            item.style.transform = 'translateX(40px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
            slideRightObserver.observe(item);
        }
    });

    // Animate contact content
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        contactContent.style.opacity = '0';
        contactContent.style.transform = 'translateY(40px)';
        contactContent.style.transition = 'opacity 1s ease, transform 1s ease';
        fadeInObserver.observe(contactContent);
    }

    // Animate skills sections with stagger from left
    const skillsSections = document.querySelectorAll('.skills-section');
    skillsSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-30px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        slideLeftObserver.observe(section);
    });

    // Animate stat boxes with scale effect
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.8)';
        box.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        scaleObserver.observe(box);
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Track back to top click
    trackEvent('back_to_top', 'Navigation', 'Back to Top Button');
});

// Animated Statistics Counter
function animateCounter(element, target, duration = 2000, suffix = '+') {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Observer for statistics counter
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');

            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '+';
                animateCounter(stat, target, 2000, suffix);
            });
        }
    });
}, {
    threshold: 0.5
});

// Observe stats section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Detect mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// Parallax Scrolling Effect for Hero Section (disabled on mobile)
let ticking = false;

function updateParallax() {
    if (isMobile) return; // Skip parallax on mobile

    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < hero.offsetHeight) {
        // Parallax effect - move background slower than scroll
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;

        // Fade out hero content as user scrolls
        const opacity = 1 - (scrolled / hero.offsetHeight) * 1.5;
        hero.style.opacity = Math.max(opacity, 0);
    }

    ticking = false;
}

if (!isMobile) {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Smooth Scroll Progress Indicator
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Create or update progress bar
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }

    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Add hover tilt effect to cards (disabled on mobile)
document.addEventListener('DOMContentLoaded', () => {
    if (isMobile) return; // Skip 3D tilt on mobile

    const cards = document.querySelectorAll('.project-card, .course-card, .certificate-card, .article-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Analytics Event Tracking for User Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track Hero CTA button clicks
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.querySelectorAll('a').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnText = btn.textContent.trim();
                const href = btn.getAttribute('href');

                if (href.includes('.pdf')) {
                    trackEvent('download', 'CTA', 'Resume Download - Hero');
                } else if (href.includes('portfolio-pdf')) {
                    trackEvent('click', 'CTA', 'Portfolio PDF - Hero');
                } else if (href.includes('linkedin')) {
                    trackEvent('click', 'CTA', 'LinkedIn - Hero');
                } else if (href.includes('#contact')) {
                    trackEvent('click', 'CTA', 'Contact - Hero');
                }
            });
        });
    }

    // Track all PDF downloads
    document.querySelectorAll('a[href$=".pdf"], a[download]').forEach(link => {
        link.addEventListener('click', (e) => {
            const fileName = link.getAttribute('href') || 'Unknown PDF';
            const linkText = link.textContent.trim() || fileName;
            trackEvent('download', 'PDF', linkText);
        });
    });

    // Track external links (LinkedIn, social media, etc.)
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            const linkText = link.textContent.trim();

            if (url.includes('linkedin.com')) {
                trackEvent('click', 'External Link', 'LinkedIn - ' + linkText);
            } else if (url.includes('portfolio-pdf')) {
                trackEvent('click', 'External Link', 'Portfolio PDF - ' + linkText);
            } else {
                trackEvent('click', 'External Link', linkText || url);
            }
        });
    });

    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '');
            trackEvent('click', 'Contact', 'Email - ' + email);
        });
    });

    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const phone = link.getAttribute('href').replace('tel:', '');
            trackEvent('click', 'Contact', 'Phone - ' + phone);
        });
    });

    // Track hamburger menu clicks
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.contains('active');
            trackEvent('click', 'Navigation', 'Mobile Menu ' + (isActive ? 'Close' : 'Open'));
        });
    }

    // Track certificate card clicks
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const certTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Unknown Certificate';
            trackEvent('click', 'Certificate', certTitle);
        });
    });

    // Track article/writing card clicks
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const articleTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Unknown Article';
            trackEvent('click', 'Content', articleTitle);
        });
    });

    // Track course card views (optional - for hover or scroll into view)
    const courseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('tracked')) {
                entry.target.classList.add('tracked');
                const courseTitle = entry.target.querySelector('h3') ? entry.target.querySelector('h3').textContent.trim() : 'Unknown Course';
                trackEvent('view', 'Course', courseTitle);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.course-card').forEach(card => {
        courseObserver.observe(card);
    });
});
