class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.setupEventListeners();
        this.initializeParticles();
        this.initializeTypingEffect();
        this.initializeAnimations();
        this.initializeProjectFilters();
        this.initializeContactForm();
        this.setActiveNavLink();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        // Check if user has already seen loading screen in this session
        // sessionStorage persists during navigation but clears on browser close
        const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
        
        if (hasSeenLoading === 'true') {
            // User is navigating between pages - hide immediately without any delay
            loadingScreen.style.display = 'none';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.style.opacity = '0';
        } else {
            // First visit or page refresh - show full animation
            loadingScreen.style.display = 'flex';
            loadingScreen.style.visibility = 'visible';
            loadingScreen.style.opacity = '1';
            
            this.startLoadingAnimation();
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    loadingScreen.style.visibility = 'hidden';
                    // Mark that user has seen the loading screen in this session
                    sessionStorage.setItem('hasSeenLoading', 'true');
                }, 500);
            }, 2000);
        }
    }

    startLoadingAnimation() {
        const loadingName = document.getElementById('loading-name');
        if (!loadingName) return;

        const names = [
            'Mokshil Shah',
            'Backend Developer',
            'Web Designer',
            'Mokshil Shah'
        ];

        let nameIndex = 0;
        
        const changeName = () => {
            if (nameIndex < names.length) {
                loadingName.style.opacity = '0';
                setTimeout(() => {
                    loadingName.textContent = names[nameIndex];
                    loadingName.style.opacity = '1';
                    nameIndex++;
                    if (nameIndex < names.length) {
                        setTimeout(changeName, 350);
                    }
                }, 150);
            }
        };

        setTimeout(changeName, 300);
    }

    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'about.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 1000
                        }
                    },
                    color: {
                        value: '#00d4ff'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d4ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    initializeTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Backend Developer',
            'Web Designer',
            'Problem Solver',
            'Code Enthusiast'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeText, typingSpeed);
        };

        typeText();
    }

    initializeAnimations() {
        this.animateCounters();
        this.setupIntersectionObserver();
        this.animatePageElements();
    }

    animatePageElements() {
        const elements = document.querySelectorAll('.service-card, .skill-item, .project-card, .timeline-item, .stat-item, .contact-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.4s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;
        
        const animateCounter = (counter) => {
            const target = counter.getAttribute('data-count');
            const isPlus = target.includes('+');
            const numericTarget = parseInt(target);
            const increment = numericTarget / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < numericTarget) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (isPlus ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };

        counters.forEach(counter => animateCounter(counter));
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        const elementsToObserve = document.querySelectorAll(
            '.service-card, .skill-item, .project-card, .timeline-item, .contact-card'
        );
        
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }

    initializeProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                btn.classList.add('active');
                
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 2000);
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 30) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        if (navEntry.type === 'reload') {
            sessionStorage.removeItem('hasSeenLoading');
        }
    }
    
    new Portfolio();
});
