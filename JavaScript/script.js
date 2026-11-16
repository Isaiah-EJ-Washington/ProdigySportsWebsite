document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. FLIP CARDS 
    // ============================================
    function initFlipCards() {
        document.querySelectorAll('.flip-card').forEach(card => {
            card.removeEventListener('click', card._flipHandler);
            const handler = function (e) {
                if (e.target.closest('a, button')) return;
                this.classList.toggle('flipped');
            };
            card._flipHandler = handler;
            card.addEventListener('click', handler);
        });
    }

    // ============================================
    // 2. CAROUSEL - SMOOTHER & FASTER
    // ============================================
    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (!track) return;

        // Card Data
        const athletes = [
            {
                name: "Isaac Terrell",
                info: "Iowa State | Defensive End",
                img: "images/IsaacTerell.jpg",
                details: [
                    { label: "Height", value: "6'2\"" },
                    { label: "Weight", value: "247 lbs" },
                    { label: "School", value: "Iowa State" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "10 tackles, 4 sacks, 1 FF, 4 TFL" }
                ]
            },
            {
                name: "Brandon Booker",
                info: "SMU | Linebacker",
                img: "images/athlete2.jpg",
                details: [
                    { label: "Height", value: "6'1\"" },
                    { label: "Weight", value: "225 lbs" },
                    { label: "School", value: "SMU" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "19 tackles, 2.5 sacks, 1 int" }
                ]
            },
            {
                name: "Bryson Lamb",
                info: "Iowa State | Defensive Tackle",
                img: "images/BrysonLamb.jpg",
                details: [
                    { label: "Height", value: "6'2\"" },
                    { label: "Weight", value: "301 lbs" },
                    { label: "School", value: "Iowa State" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "5 tackles, 1 sack, 10 hurries, 1 TFL" }
                ]
            },
            {
                name: "Montana Wheeler",
                info: "Kansas State | Guard",
                img: "images/MontanaW.jpg",
                details: [
                    { label: "Height", value: "5'10\"" },
                    { label: "Weight", value: "170 lbs" },
                    { label: "School", value: "Kansas St" },
                    { label: "Class", value: "Sophomore" },
                    { label: "Stats", value: "6 PTs, 1.7 ASTs, 1.3 REB" }
                ]
            },
            {
                name: "Eric Fiedler",
                info: "Colorado St | Forward",
                img: "images/EricFielder2.jpg",
                details: [
                    { label: "Height", value: "6'8\"" },
                    { label: "Weight", value: "210 lbs" },
                    { label: "School", value: "Colorado State" },
                    { label: "Class", value: "Freshman" },
                    { label: "Stats", value: "N/A" }
                ]
            },
            {
                name: "Daylen Russell",
                info: "Louisville | Defensive Tackle",
                img: "images/athlete6.jpg",
                details: [
                    { label: "Height", value: "6'3\"" },
                    { label: "Weight", value: "300 lbs" },
                    { label: "School", value: "Louisville" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "12 tackles, 4 TFL" }
                ]
            },
            {
                name: "JT Rock",
                info: "Kansas State | Center",
                img: "images/JTRock.jpg",
                details: [
                    { label: "Height", value: "7'1\"" },
                    { label: "Weight", value: "260 lbs" },
                    { label: "School", value: "Kansas State" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "6.2 PTs, 3.5 REBs" }
                ]
            },
            {
                name: "Nate Marshall",
                info: "Michigan | Defensive End",
                img: "images/NateMarshall.jpg",
                details: [
                    { label: "Height", value: "6'3\"" },
                    { label: "Weight", value: "248 lbs" },
                    { label: "School", value: "Michigan" },
                    { label: "Class", value: "Sophomore" },
                    { label: "Stats", value: "11 tackles, 2 sacks, 1 TFL" }
                ]
            },
            {
                name: "Jaydon Young",
                info: "North Carolina | Guard",
                img: "images/JaydonYoung.jpg",
                details: [
                    { label: "Height", value: "6'4\"" },
                    { label: "Weight", value: "200 lbs" },
                    { label: "School", value: "North Carolina" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "6 pts, 1.3 REB, 1 AST" }
                ]
            },
            {
                name: "Miles Coleman",
                info: "Oklahoma St | Wide Reciever",
                img: "images/MilesColeman.jpg",
                details: [
                    { label: "Height", value: "5'6\"" },
                    { label: "Weight", value: "158 lbs" },
                    { label: "School", value: "Oklahoma St" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "36 REC, 486 YDs, 3 TD" }
                ]
            },
            {
                name: "Mike James",
                info: "South Florida | Guard",
                img: "images/MikeJames.jpg",
                details: [
                    { label: "Height", value: "6'5\"" },
                    { label: "Weight", value: "205 lbs" },
                    { label: "School", value: "South Florida" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "10.3 PTs, 7.8 REB, 1.8 AST" }
                ]
            },
            {
                name: "Gavin Moul",
                info: "Delaware | Linebacker",
                img: "images/GavinMoul.png",
                details: [
                    { label: "Height", value: "6'0\"" },
                    { label: "Weight", value: "227 lbs" },
                    { label: "School", value: "Delaware" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "72 tackles, 1 sack, 1 FF, 5 TFLs" }
                ]
            },
            {
                name: "Chacho Womack",
                info: "Petersburg High School | Guard",
                img: "images/ChachoWomack.jpg",
                details: [
                    { label: "Height", value: "6'5\"" },
                    { label: "Weight", value: "180 lbs" },
                    { label: "School", value: "Petersburg HS" },
                    { label: "Class", value: "Sophomore" },
                    { label: "Stats", value: "N/A" }
                ]
            },
            {
                name: "Sam Milligan",
                info: "Bucknell | Wide Reciever",
                img: "images/SamMilligan.jpg",
                details: [
                    { label: "Height", value: "6'3\"" },
                    { label: "Weight", value: "220 lbs" },
                    { label: "School", value: "Bucknell" },
                    { label: "Class", value: "Senior" },
                    { label: "Stats", value: "65 REC, 769 YDs, 6 TD" }
                ]
            },
            {
                name: "Elijah Nickerson",
                info: "Lake Nona High School | Quarterback",
                img: "images/ElijahNickerson.png",
                details: [
                    { label: "Height", value: "6'5\"" },
                    { label: "Weight", value: "186 lbs" },
                    { label: "School", value: "Lake Nona HS" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "N/A" }
                ]
            }
        ];

        // Build Cards (SINGLE definition)
        function buildCard(athlete) {
            return `
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <div class="card-image-wrapper">
                                <img src="${athlete.img}" alt="${athlete.name}">
                                <div class="card-image-overlay"></div>
                            </div>
                            <div class="card-content">
                                <h3>${athlete.name}</h3>
                                <p>${athlete.info}</p>
                                <span class="flip-hint">Click to view stats →</span>
                            </div>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-content">
                                <h3>${athlete.name}</h3>
                                <div class="athlete-details">
                                    ${athlete.details.map(d => `
                                        <div class="detail-row">
                                            <span class="detail-label">${d.label}</span>
                                            <span class="detail-value">${d.value}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <span class="flip-back-hint">Click to flip back</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Build the carousel with 2 sets for seamless loop
        const cardsHTML = athletes.map(a => buildCard(a)).join('');
        track.innerHTML = cardsHTML + cardsHTML;

        // Initialize flip cards after they are created
        initFlipCards();

        // --- Carousel State ---
        let currentIndex = 0;
        let autoPlayInterval = null;
        let isPaused = false;
        let isTransitioning = false;
        const totalCards = athletes.length;
        const cardWidth = 300;
        const transitionDuration = 400;
        const autoPlayDelay = 2800;

        // --- Move to a specific index ---
        function goTo(index, animate = true) {
            if (isTransitioning) return;
            isTransitioning = true;

            const offset = -(index * cardWidth);
            track.style.transition = animate
                ? `transform ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                : 'none';
            track.style.transform = `translateX(${offset}px)`;

            setTimeout(() => {
                isTransitioning = false;
            }, transitionDuration + 50);

            if (index >= totalCards) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0px)';
                    currentIndex = 0;
                    void track.offsetHeight;
                }, transitionDuration + 100);
            }
        }

        // --- Next/Previous ---
        function next() {
            if (isTransitioning) return;
            currentIndex++;
            if (currentIndex > totalCards) {
                currentIndex = 1;
                goTo(currentIndex);
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0px)';
                    currentIndex = 0;
                    void track.offsetHeight;
                }, 100);
            } else {
                goTo(currentIndex);
            }
        }

        function prev() {
            if (isTransitioning) return;
            if (currentIndex <= 0) {
                currentIndex = totalCards - 1;
                goTo(currentIndex);
            } else {
                currentIndex--;
                goTo(currentIndex);
            }
        }

        // --- Auto-Play ---
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                if (!isPaused) {
                    next();
                }
            }, autoPlayDelay);
        }

        function togglePause() {
            isPaused = !isPaused;
            if (pauseBtn) {
                if (isPaused) {
                    pauseBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>`;
                    pauseBtn.setAttribute('aria-label', 'Resume');
                } else {
                    pauseBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>`;
                    pauseBtn.setAttribute('aria-label', 'Pause');
                }
            }
        }

        // --- Event Listeners ---
        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);
        if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
            if (e.key === ' ') { e.preventDefault(); togglePause(); }
        });

        // --- Resize handling ---
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                goTo(currentIndex, false);
            }, 300);
        });

        // --- Init ---
        goTo(0, false);
        startAutoPlay();
    }

    // ============================================
    // 3. HORIZONTAL SCROLL (if using old grid)
    // ============================================
    function initHorizontalScroll() {
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
    }

    // ============================================
    // 4. ACCORDION (Process Page)
    // ============================================
    function initAccordion() {
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
    }

    // ============================================
    // 5. COUNT UP ANIMATION FOR STATS
    // ============================================
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

    // ============================================
    // 6. HEADER SCROLL EFFECT
    // ============================================
    function initHeaderScroll() {
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
    }

    // ============================================
    // 7. MOBILE MENU TOGGLE
    // ============================================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.removeAttribute('onclick');

            menuToggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                this.classList.toggle('active');

                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            document.addEventListener('click', function (e) {
                if (navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) &&
                    !menuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // ============================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function initSmoothScroll() {
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
    }

    // ============================================
    // 9. SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
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
    }

    // ============================================
    // 10. VIDEO MODAL
    // ============================================
    function initVideoModal() {
        const videoModal = document.getElementById('video-modal');
        const modalVideo = document.getElementById('modal-video');
        const modalOverlay = videoModal ? videoModal.querySelector('.video-modal-overlay') : null;
        const modalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null;
        const videoTriggers = document.querySelectorAll('.video-trigger');

        if (!videoModal || !modalVideo) return;

        function openVideoModal(videoSrc) {
            modalVideo.src = videoSrc;
            modalVideo.load();
            videoModal.classList.add('active');
            document.body.classList.add('modal-open');
            modalVideo.play().catch(err => console.log('Autoplay prevented:', err));
        }

        function closeVideoModal() {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.removeAttribute('src');
            modalVideo.load();
            videoModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }

        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const videoSrc = this.getAttribute('data-video');
                if (videoSrc) {
                    openVideoModal(videoSrc);
                }
            });
        });

        if (modalOverlay) modalOverlay.addEventListener('click', closeVideoModal);
        if (modalClose) modalClose.addEventListener('click', closeVideoModal);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }

    // ============================================
    // 11. INIT ALL
    // ============================================
    initFlipCards();
    initCarousel();
    initHorizontalScroll();
    initAccordion();
    initCountUp();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initVideoModal(); // Cleaned up into one function

    console.log('Prodigy Sports Group - Site loaded successfully');
});
