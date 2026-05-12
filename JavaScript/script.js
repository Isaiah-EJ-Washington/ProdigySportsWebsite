
document.addEventListener('DOMContentLoaded', function () {

    // ===== FLIP CARDS =====
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });

    // ===== HORIZONTAL SCROLL FUNCTIONALITY =====
    const scrollContainer = document.querySelector('.athletes-grid');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');

    if (scrollContainer && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });

        const updateArrows = () => {
            const isAtStart = scrollContainer.scrollLeft <= 10;
            const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

            leftArrow.style.opacity = isAtStart ? '0.4' : '1';
            leftArrow.style.cursor = isAtStart ? 'default' : 'pointer';
            rightArrow.style.opacity = isAtEnd ? '0.4' : '1';
            rightArrow.style.cursor = isAtEnd ? 'default' : 'pointer';
        };

        scrollContainer.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        updateArrows();
    }

    // ===== ACCORDION (WHEN HES ON THE MIC YOU DONT GO NEXT) (Process Page) =====
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                accordionItems.forEach(other => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

    // ===== COUNT UP ANIMATION FOR STATS =====
    function initCountUp() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const rawText = el.innerText;
                    const targetValue = el.getAttribute('data-target');

                    if (targetValue && !el.hasAttribute('data-counted')) {
                        el.setAttribute('data-counted', 'true');
                        const targetNum = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
                        const prefix = rawText.match(/^\$/) ? '$' : '';
                        let suffix = '';
                        if (rawText.includes('M+')) suffix = 'M+';
                        else if (rawText.includes('+')) suffix = '+';
                        else if (rawText.includes('M')) suffix = 'M';

                        let current = 0;
                        const duration = 2000;
                        const stepTime = 20;
                        const steps = duration / stepTime;
                        const increment = targetNum / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNum) {
                                el.innerText = prefix + targetNum + suffix;
                                clearInterval(timer);
                            } else {
                                el.innerText = prefix + Math.floor(current) + suffix;
                            }
                        }, stepTime);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    }
    initCountUp();

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE  =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        // Remove any existing inline onclick handlers
        menuToggle.removeAttribute('onclick');

        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            console.log('Menu toggled - active:', navMenu.classList.contains('active')); 
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log('Menu elements not found - check your HTML');
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.service-section, .team-card, .accordion-item, .stat');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    console.log('Prodigy Sports Group - Site loaded successfully');
});
