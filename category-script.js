// Category-specific translations and functionality
class CategoryPage {
    constructor() {
        this.category = document.body.dataset.page;
        this.categoryData = this.getCategoryData();
        this.init();
    }

    getCategoryData() {
        const categories = {
            grammar: {
                title: { en: "Master English Grammar", fa: "تسلط بر گرامر انگلیسی" },
                description: {
                    en: "Build a solid foundation in English grammar with our interactive lessons, real-time corrections, and comprehensive exercises designed for all levels.",
                    fa: "با درس‌های تعاملی، تصحیح بلادرنگ و تمرین‌های جامع ما، پایه‌ای محکم در گرامر انگلیسی بسازید که برای تمام سطوح طراحی شده است."
                },
                lessons: [
                    { id: 1, title_en: "Present Tenses", title_fa: "زمان‌های حال", desc_en: "Master simple present and present continuous", desc_fa: "تسلط بر زمان حال ساده و حال استمراری", difficulty: "beginner" },
                    { id: 2, title_en: "Past Tenses", title_fa: "زمان‌های گذشته", desc_en: "Learn past simple, continuous, and perfect", desc_fa: "یادگیری زمان گذشته ساده، استمراری و کامل", difficulty: "beginner" },
                    { id: 3, title_en: "Future Forms", title_fa: "اشکال آینده", desc_en: "Understand will, going to, and present continuous for future", desc_fa: "درک will، going to و حال استمراری برای آینده", difficulty: "intermediate" },
                    { id: 4, title_en: "Conditionals", title_fa: "شرطی‌ها", desc_en: "Master zero, first, second, and third conditionals", desc_fa: "تسلط بر شرطی‌های صفر، اول، دوم و سوم", difficulty: "intermediate" },
                    { id: 5, title_en: "Reported Speech", title_fa: "گزارش گفتار", desc_en: "Learn to report what others have said", desc_fa: "یادگیری گزارش آنچه دیگران گفته‌اند", difficulty: "advanced" },
                    { id: 6, title_en: "Modal Verbs", title_fa: "افعال مدال", desc_en: "Master can, could, may, might, must, should", desc_fa: "تسلط بر can، could، may، might، must، should", difficulty: "advanced" }
                ]
            },
            vocabulary: {
                title: { en: "Expand Your Vocabulary", fa: "گسترش واژگان خود" },
                description: {
                    en: "Learn 10+ new words daily with our smart vocabulary builder using spaced repetition, context learning, and memory techniques.",
                    fa: "هر روز ۱۰+ کلمه جدید با سازنده واژگان هوشمند ما با استفاده از تکرار با فاصله، یادگیری متنی و تکنیک‌های حافظه یاد بگیرید."
                },
                lessons: [
                    { id: 1, title_en: "Everyday Vocabulary", title_fa: "واژگان روزمره", desc_en: "Essential words for daily conversations", desc_fa: "واژگان ضروری برای مکالمات روزمره", difficulty: "beginner" },
                    { id: 2, title_en: "Business English", title_fa: "انگلیسی کسب‌وکار", desc_en: "Vocabulary for professional settings", desc_fa: "واژگان برای محیط‌های حرفه‌ای", difficulty: "intermediate" },
                    { id: 3, title_en: "Academic Words", title_fa: "واژگان آکادمیک", desc_en: "Essential vocabulary for academic success", desc_fa: "واژگان ضروری برای موفقیت آکادمیک", difficulty: "advanced" }
                ]
            }
            // Add other categories similarly
        };

        return categories[this.category] || categories.grammar;
    }

    init() {
        this.setupPageContent();
        this.setupEventListeners();
        this.setupLanguageUpdates();
    }

    setupPageContent() {
        // Set page title
        document.title = `${this.categoryData.title.en} - English by Neo`;

        // Initialize with English
        this.updateContent('en');
    }

    updateContent(lang) {
        const isPersian = lang === 'fa';
        
        // Update main content
        document.getElementById('category-title').textContent = this.categoryData.title[lang];
        document.getElementById('category-description').textContent = this.categoryData.description[lang];
        document.getElementById('start-learning-btn').textContent = isPersian ? "شروع یادگیری" : "Start Learning Now";
        
        // Update progress section
        document.getElementById('progress-title').textContent = isPersian ? "سفر شما" : "Your Journey";
        document.getElementById('progress-text').textContent = isPersian ? "۲۵% تکمیل شده" : "25% Complete";
        document.getElementById('lessons-completed-text').textContent = isPersian ? "درس‌های تکمیل شده" : "Lessons Completed";
        document.getElementById('total-lessons-text').textContent = isPersian ? "کل درس‌ها" : "Total Lessons";
        document.getElementById('accuracy-text').textContent = isPersian ? "میانگین دقت" : "Average Accuracy";
        
        // Update lessons section
        document.getElementById('lessons-title').textContent = isPersian ? "درس‌ها" : "Lessons";
        
        // Update tools section
        document.getElementById('tools-title').textContent = isPersian ? "ابزارهای یادگیری" : "Learning Tools";
        document.getElementById('quiz-tool-title').textContent = isPersian ? "کوییزهای تعاملی" : "Interactive Quizzes";
        document.getElementById('quiz-tool-desc').textContent = isPersian ? "دانش خود را با کوییزهای تطبیقی که با سطح شما تنظیم می‌شوند آزمایش کنید" : "Test your knowledge with adaptive quizzes that adjust to your level";
        document.getElementById('start-quiz-btn').textContent = isPersian ? "شرکت در کوییز" : "Take a Quiz";
        document.getElementById('progress-tool-title').textContent = isPersian ? "تحلیل پیشرفت" : "Progress Analytics";
        document.getElementById('progress-tool-desc').textContent = isPersian ? "پیشرفت خود را با گزارش‌های عملکرد دقیق پیگیری کنید" : "Track your improvement with detailed performance reports";
        document.getElementById('view-progress-btn').textContent = isPersian ? "مشاهده پیشرفت" : "View Progress";
        document.getElementById('video-tool-title').textContent = isPersian ? "درس‌های ویدیویی" : "Video Lessons";
        document.getElementById('video-tool-desc').textContent = isPersian ? "از مربیان متخصص با محتوای ویدیویی جذاب یاد بگیرید" : "Learn from expert instructors with engaging video content";
        document.getElementById('watch-videos-btn').textContent = isPersian ? "تماشای ویدیوها" : "Watch Videos";
        
        // Update lessons grid
        this.updateLessonsGrid(lang);
    }

    updateLessonsGrid(lang) {
        const lessonsGrid = document.querySelector('.lessons-grid');
        if (!lessonsGrid) return;

        lessonsGrid.innerHTML = this.categoryData.lessons.map(lesson => `
            <div class="lesson-card">
                <span class="lesson-number">${lang === 'fa' ? 'درس' : 'Lesson'} ${lesson.id}</span>
                <h3>${lang === 'fa' ? lesson.title_fa : lesson.title_en}</h3>
                <p>${lang === 'fa' ? lesson.desc_fa : lesson.desc_en}</p>
                <div class="lesson-meta">
                    <span class="difficulty ${lesson.difficulty}">
                        ${lang === 'fa' ? this.getPersianDifficulty(lesson.difficulty) : lesson.difficulty}
                    </span>
                    <span>${lang === 'fa' ? '۲۰ دقیقه' : '20 min'}</span>
                </div>
                <a href="lesson-${lesson.id}.html" class="start-lesson-btn">
                    ${lang === 'fa' ? 'شروع درس' : 'Start Lesson'}
                </a>
            </div>
        `).join('');
    }

    getPersianDifficulty(level) {
        const levels = {
            beginner: "مبتدی",
            intermediate: "متوسط",
            advanced: "پیشرفته"
        };
        return levels[level] || level;
    }

    setupEventListeners() {
        // Handle lesson card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.start-lesson-btn')) {
                this.trackLessonStart(e.target.closest('.lesson-card'));
            }
        });
    }

    setupLanguageUpdates() {
        document.addEventListener('languageChanged', (e) => {
            this.updateContent(e.detail.lang);
        });
    }

    trackLessonStart(card) {
        const lessonTitle = card.querySelector('h3').textContent;
        console.log(`Starting lesson: ${lessonTitle}`);
        // Here you would typically track this in analytics
    }
}

// Initialize category page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.categoryPage = new CategoryPage();
});