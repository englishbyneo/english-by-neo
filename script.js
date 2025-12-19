// Language Management System
class LanguageManager {
    constructor() {
        this.translations = {
            en: {},
            fa: {}
        };
        this.currentLang = 'en';
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupLanguageSwitcher();
        this.applyLanguage(this.currentLang);
    }

    async loadTranslations() {
        try {
            // Load category-specific translations if available
            const pageType = document.body.dataset.page || 'home';
            const response = await fetch(`translations/${pageType}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.log('Using default translations');
            this.loadDefaultTranslations();
        }
    }

    loadDefaultTranslations() {
        this.translations = {
            en: {
                logoText: "English by <span>Neo</span>",
                nav: {
                    home: "Home",
                    grammar: "Grammar",
                    vocabulary: "Vocabulary",
                    pronunciation: "Pronunciation",
                    voiceCheck: "Voice Check",
                    placementTests: "Placement Tests",
                    ielts: "IELTS",
                    toefl: "TOEFL",
                    conversation: "Conversation"
                },
                footer: {
                    description: "Your journey to English fluency starts here. Join our community of successful learners today!",
                    quickLinks: "Quick Links",
                    categories: "Categories",
                    contact: "Contact Us",
                    copyright: "© 2023 English by Neo. All rights reserved."
                }
            },
            fa: {
                logoText: "انگلیسی با <span>نئو</span>",
                nav: {
                    home: "خانه",
                    grammar: "گرامر",
                    vocabulary: "واژگان",
                    pronunciation: "تلفظ",
                    voiceCheck: "بررسی صدا",
                    placementTests: "آزمون تعیین سطح",
                    ielts: "آیلتس",
                    toefl: "تافل",
                    conversation: "مکالمه"
                },
                footer: {
                    description: "سفر شما به تسلط انگلیسی از اینجا شروع می‌شود. امروز به جامعه زبان آموزان موفق ما بپیوندید!",
                    quickLinks: "لینک‌های سریع",
                    categories: "دسته‌بندی‌ها",
                    contact: "تماس با ما",
                    copyright: "© ۲۰۲۳ انگلیسی با نئو. کلیه حقوق محفوظ است."
                }
            }
        };
    }

    setupLanguageSwitcher() {
        const switcher = document.querySelector('.language-switcher');
        if (!switcher) return;

        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
                English
            </button>
            <button class="lang-btn ${this.currentLang === 'fa' ? 'active' : ''}" data-lang="fa">
                فارسی
            </button>
        `;

        switcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const lang = e.target.dataset.lang;
                this.applyLanguage(lang);
            }
        });
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Apply translations to elements
        this.updatePageContent();
    }

    updatePageContent() {
        const langData = this.translations[this.currentLang];
        
        // Update logo text
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            logoText.innerHTML = langData.logoText;
        }

        // Update navigation
        this.updateNavigation(langData.nav);

        // Update footer
        this.updateFooter(langData.footer);

        // Update page-specific content
        this.updatePageSpecificContent();
    }

    updateNavigation(navData) {
        if (!navData) return;

        document.querySelectorAll('.nav-link').forEach(link => {
            const page = link.dataset.page;
            if (page && navData[page]) {
                link.textContent = navData[page];
            }
        });
    }

    updateFooter(footerData) {
        if (!footerData) return;

        // Update footer sections
        const elements = {
            '.footer-description': footerData.description,
            '.footer-links-title': footerData.quickLinks,
            '.footer-categories-title': footerData.categories,
            '.footer-contact-title': footerData.contact,
            '.copyright-text': footerData.copyright
        };

        Object.entries(elements).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element) element.textContent = text;
        });
    }

    updatePageSpecificContent() {
        // This will be overridden by page-specific scripts
        const updateEvent = new CustomEvent('languageChanged', {
            detail: { lang: this.currentLang }
        });
        document.dispatchEvent(updateEvent);
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress || '0';
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language manager
    window.languageManager = new LanguageManager();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Animate progress bars
    animateProgressBars();
    
    // Add hover effects to cards
    document.querySelectorAll('.lesson-card, .tool-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});