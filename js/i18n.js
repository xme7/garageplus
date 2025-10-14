class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.setupLanguageSwitcher();
        this.translatePage();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`/translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang} translations`);
            }
            this.translations = await response.json();
            this.currentLang = lang;
        } catch (error) {
            console.error('Error loading translations:', error);
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    }

    setupLanguageSwitcher() {
        const langSwitcher = document.getElementById('langSwitcher');
        const currentLangElement = document.getElementById('currentLang');

        if (currentLangElement) {
            currentLangElement.textContent = this.currentLang.toUpperCase();
        }

        if (langSwitcher) {
            langSwitcher.addEventListener('click', async () => {
                const newLang = this.currentLang === 'en' ? 'ru' : 'en';
                await this.switchLanguage(newLang);
            });
        }
    }

    async switchLanguage(lang) {
        await this.loadTranslations(lang);
        localStorage.setItem('language', lang);

        const currentLangElement = document.getElementById('currentLang');
        if (currentLangElement) {
            currentLangElement.textContent = lang.toUpperCase();
        }

        this.translatePage();

        document.documentElement.lang = lang;
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getNestedTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations;

        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }

        return translation;
    }

    t(key) {
        return this.getNestedTranslation(key) || key;
    }
}

window.i18n = new I18n();