// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ===== DARK MODE =====
    const themeToggle = document.getElementById('theme-icon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    window.toggleTheme = function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (themeToggle) {
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    };

    // ===== LANGUAGE SWITCH =====
    let currentLang = localStorage.getItem('language') || 'en';

    window.setLanguage = function (lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);

        // Update buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === lang) {
                btn.classList.add('active');
            }
        });

        // Update all elements with data attributes
        document.querySelectorAll('[data-en][data-nl]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // Check if it's an input with placeholder
                if (el.hasAttribute(`data-${lang}-placeholder`)) {
                    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
                } else {
                    el.textContent = text;
                }
            }
        });
    };

    // Initialize language
    setLanguage(currentLang);

    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            this.style.transform = mobileMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
        });
    }

    // ===== TYPING EFFECT =====
    const typingElement = document.getElementById('typing');

    if (typingElement) {
        const texts = ["Software Developer", "Front-end Developer", "Problem Solver", "Continuous Learner"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-hidden').forEach((el) => {
        observer.observe(el);
    });

    // ===== PROJECT DETAILS POPUP =====
    const projectDetails = {
        "Project 1": {
            features: "Add, edit, delete tasks; mark as complete; localStorage persistence; responsive design.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 2": {
            features: "Play against computer; score tracking; game history; animated transitions.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 3": {
            features: "Multiple choice questions; real-time feedback; final score calculation; timer option.",
            difficulty: "Beginner–Intermediate",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 4": {
            features: "Card matching logic; move counter; timer; difficulty levels; restart functionality.",
            difficulty: "Intermediate",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 5": {
            features: "Random word selection; hint system; lives tracking; visual hangman drawing.",
            difficulty: "Intermediate",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 6": {
            features: "Automatic holiday detection; countdown calculation; timezone support; multiple events.",
            difficulty: "Intermediate",
            technologies: "HTML, CSS, JavaScript, Date API"
        },
        "Project 7": {
            features: "Random number generation; dice animation; roll history; multiple dice support.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 8": {
            features: "Random color generation; hex/rgb conversion; copy to clipboard; color history.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 9": {
            features: "BMI calculation; weight category display; metric/imperial support; health tips.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 10": {
            features: "Celsius/Fahrenheit/Kelvin conversion; real-time calculation; temperature facts.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 11": {
            features: "Real-time updates; 12/24 hour format; timezone display; alarm functionality.",
            difficulty: "Beginner",
            technologies: "HTML, CSS, JavaScript"
        },
        "Project 12": {
            features: "Customizable length; character type selection; strength indicator; copy functionality.",
            difficulty: "Intermediate",
            technologies: "HTML, CSS, JavaScript"
        }
    };

    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const closePopupBtn = document.getElementById('closePopup');

    document.querySelectorAll('.details-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const projectName = this.getAttribute('data-project');
            const details = projectDetails[projectName];

            if (details && popupTitle && popupContent && popup) {
                popupTitle.textContent = projectName;
                popupContent.innerHTML = `
          <p><strong>${currentLang === 'nl' ? 'Functies' : 'Features'}:</strong> ${details.features}</p>
          <p><strong>${currentLang === 'nl' ? 'Niveau' : 'Difficulty'}:</strong> ${details.difficulty}</p>
          <p><strong>${currentLang === 'nl' ? 'Technologieën' : 'Technologies'}:</strong> ${details.technologies}</p>
        `;
                popup.classList.remove('hidden');
            }
        });
    });

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function () {
            popup.classList.add('hidden');
        });
    }

    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                popup.classList.add('hidden');
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== FORM SUBMIT ANIMATION =====
    const contactForm = document.querySelector('form.contact');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                btn.innerHTML = currentLang === 'nl' ? 'Versturen...' : 'Sending...';
                btn.style.opacity = '0.7';
            }
        });
    }

});