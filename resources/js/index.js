const { seoObject } = require('./seoscript');
import '../css/styles.css';
import '../../index.html';
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from '../lang/en.json';
import translationFr from '../lang/fr.json';
import sendForm_DataToMail from '../../httpEndpoints/sendEmailApi';
import Toastify from 'toastify-js';

void seoObject;

const resources = {
    en: { translation: translationEn },
    fr: { translation: translationFr }
};

const TOAST_ERROR_BG = "linear-gradient(to right, #b00015, #fd001e)";
const TOAST_SUCCESS_BG = "linear-gradient(to right, #00b09b, #96c93d)";

const showToast = (text, background, duration = 5000) => {
    Toastify({
        text,
        duration,
        gravity: "top",
        position: "right",
        style: { background }
    }).showToast();
};

const parseInterpolations = (raw) => {
    if (!raw) return {};

    try {
        return JSON.parse(raw);
    } catch {
        return {};
    }
};

const translatePageElements = () => {
    const elements = document.querySelectorAll("[data-i18n-key]");

    for (const el of elements) {
        const key = el.getAttribute("data-i18n-key");
        if (!key) continue;

        const options = parseInterpolations(el.getAttribute("data-i18n-opt"));
        el.textContent = i18next.t(key, options);
    }
};

const initI18next = async () => {
    await i18next
        .use(LanguageDetector)
        .init({
            lng: "en",
            debug: false,
            resources,
            supportedLngs: ["en", "fr"],
            fallbackLng: "en",
            nonExplicitSupportedLngs: true,
            interpolation: { escapeValue: true }
        });
};

const bindLocaleSwitcher = () => {
    const switcher = document.querySelector("[data-i18n-switcher]");
    if (!switcher) return;

    switcher.value = i18next.resolvedLanguage || i18next.language || "en";

    switcher.addEventListener("change", async (event) => {
        const nextLang = event?.target?.value;
        if (!nextLang) return;
        await i18next.changeLanguage(nextLang);
        translatePageElements();
    });
};

const initMobileMenu = () => {
    const menuTrigger = document.querySelector(".container a.icon");
    const navList = document.querySelector("header nav ul");

    if (!menuTrigger || !navList) return;

    const toggleMenu = () => {
        const isOpen = navList.style.display === "flex";
        navList.style.display = isOpen ? "none" : "flex";
    };

    menuTrigger.addEventListener("click", toggleMenu);

    menuTrigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        }
    });
};

const initContactForm = () => {
    const form = document.forms['getInTouch'];
    if (!form) return;

    const submitControl = form.querySelector('input[type="submit"]');
    let isSubmitting = false;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        if (submitControl) submitControl.disabled = true;

        try {
            const payload = [...new FormData(form)];
            const result = await sendForm_DataToMail(payload);
            const { error, message } = result?.data || {};

            if (error) showToast(error, TOAST_ERROR_BG, 6000);
            if (message) showToast(message, TOAST_SUCCESS_BG, 5000);
        } catch (error) {
            if (error?.response?.status === 429) {
                showToast(error?.response?.data?.error || "You have reached the email limit. Try again later.", TOAST_ERROR_BG, 6000);
            } else {
                showToast("An unexpected error occurred. Please try again.", TOAST_ERROR_BG, 6000);
            }
        } finally {
            isSubmitting = false;
            if (submitControl) submitControl.disabled = false;
        }
    }, { passive: false });
};

const initApp = async () => {
    initMobileMenu();
    initContactForm();
    await initI18next();
    translatePageElements();
    bindLocaleSwitcher();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        void initApp();
    }, { once: true });
} else {
    void initApp();
}
