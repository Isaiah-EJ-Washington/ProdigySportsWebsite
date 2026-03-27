

console.log('Script loaded successfully');

// ============================================
// MAIN INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM ready - initializing all components');

    initFlipCards();
    initScrollEffects();
    initSmoothScroll();
    initMobileMenu();
    initContactForm();
    initHorizontalStaffScroll();
    initAthleteScroll();
});

window.addEventListener('load', function () {
    console.log('Page fully loaded');
});

// ============================================
// 1. FLIP CARDS FUNCTIONALITY
// ============================================
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    console.log('Found flip cards:', flipCards.length);

    if (flipCards.length === 0) return;

    flipCards.forEach((card, index) => {
        card.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('flipped');
        });
    });
}

// ============================================
// 2. SCROLL EFFECT FOR HEADER
// ============================================
function initScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

// ============================================
// 3. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

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
}

// ============================================
// 4. MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });
}

// ============================================
// 5. CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.classList.add('loading');
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
        }

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (contactForm) contactForm.style.display = 'none';
                if (formSuccess) formSuccess.style.display = 'block';
                console.log('Form sent successfully');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('There was a problem sending your message. Please try again.');
            console.error('Form error:', error);

            if (submitBtn) {
                submitBtn.classList.remove('loading');
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
            }
        }
    });
}

// ============================================
// 6. HORIZONTAL STAFF SCROLL
// ============================================
function initHorizontalStaffScroll() {
    const scrollContainers = document.querySelectorAll('.staff-scroll-container');

    scrollContainers.forEach(container => {
        const scrollGrid = container.querySelector('.staff-scroll-grid');
        const leftArrow = container.querySelector('.scroll-arrow.left');
        const rightArrow = container.querySelector('.scroll-arrow.right');

        if (!scrollGrid) return;

        if (leftArrow) {
            leftArrow.addEventListener('click', function () {
                scrollGrid.scrollBy({ left: -280, behavior: 'smooth' });
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', function () {
                scrollGrid.scrollBy({ left: 280, behavior: 'smooth' });
            });
        }

        function updateArrowVisibility() {
            if (!leftArrow || !rightArrow) return;

            const isAtStart = scrollGrid.scrollLeft <= 10;
            const isAtEnd = scrollGrid.scrollLeft + scrollGrid.clientWidth >= scrollGrid.scrollWidth - 10;

            leftArrow.style.opacity = isAtStart ? '0.4' : '1';
            leftArrow.style.pointerEvents = isAtStart ? 'none' : 'auto';
            rightArrow.style.opacity = isAtEnd ? '0.4' : '1';
            rightArrow.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        scrollGrid.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);
        setTimeout(updateArrowVisibility, 100);
    });
}

// ============================================
// 7. ATHLETE HORIZONTAL SCROLL
// ============================================
function initAthleteScroll() {
    const scrollContainer = document.querySelector('.athlete-grid-scroll');
    const leftArrow = document.querySelector('.athletes-scroll-container .scroll-arrow.left');
    const rightArrow = document.querySelector('.athletes-scroll-container .scroll-arrow.right');

    if (!scrollContainer) return;

    if (leftArrow) {
        leftArrow.addEventListener('click', function () {
            scrollContainer.scrollBy({ left: -280, behavior: 'smooth' });
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function () {
            scrollContainer.scrollBy({ left: 280, behavior: 'smooth' });
        });
    }

    function updateArrowVisibility() {
        if (!leftArrow || !rightArrow) return;

        const isAtStart = scrollContainer.scrollLeft <= 10;
        const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

        leftArrow.style.opacity = isAtStart ? '0.4' : '1';
        leftArrow.style.pointerEvents = isAtStart ? 'none' : 'auto';
        rightArrow.style.opacity = isAtEnd ? '0.4' : '1';
        rightArrow.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }

    scrollContainer.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    setTimeout(updateArrowVisibility, 100);
}