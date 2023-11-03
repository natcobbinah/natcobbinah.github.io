const { seoObject } = require('./seoscript');
import '../css/styles.css';
import { toggleHiddenDescription } from './showHideTextScript';
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
//console.log({ i18next })
import translationEn from '../lang/en.json';
import translationFr from '../lang/fr.json';
import sendForm_DataToMail from '../../httpEndpoints/sendEmailApi';
import Toastify from 'toastify-js';


//hamburger menu in mobile view
let mobileMenuIcon = document.querySelector(".container a.icon");
let mobileMenuElementsToDisplay = document.querySelector("header nav ul");

mobileMenuIcon.addEventListener('click', () => {
    if (mobileMenuElementsToDisplay.style.display === "block" ) {
        mobileMenuElementsToDisplay.style.display = "none";
    } else {
        mobileMenuElementsToDisplay.style.display = "block";
    }
})

//form submission code stub
const form = document.forms['getInTouch'];
form.addEventListener('submit', submitFormData, false);

function submitFormData(event) {
    event.preventDefault();

    let formData = new FormData(form);

    sendForm_DataToMail([...formData]).then((result) => {
        if (result.data.error) {
            Toastify({
                text: result.data.error,
                duration: 5000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #b00015, #fd001e)",
                }
            }).showToast();
            serverResponseMsg.innerHTML = data.error;
        } else {
            if (result.data.message) {
                Toastify({
                    text: result.data.message,
                    duration: 5000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }
        }
    })
}


//localization code-stub
const resources = {
    en: {
        translation: translationEn
    },
    fr: {
        translation: translationFr
    }
}

const initI18next = async () => {
    await i18next
        .use(HttpApi)
        .use(LanguageDetector)
        .init({
            lng: "en",
            debug: true,
            resources,
            supportedLngs: ["en", "fr"],
            fallbackLng: "en",
            nonExplicitSupportedLngs: true
        });
}

const translatePageElements = () => {
    const translatableElements = document.querySelectorAll(
        "[data-i18n-key]"
    );

    translatableElements.forEach((el) => {
        const key = el.getAttribute("data-i18n-key");
        const interpolations = el.getAttribute("data-i18n-opt");
        const parsedInterpolations = interpolations ? JSON.parse(interpolations) : {};
        el.innerHTML = i18next.t(key, parsedInterpolations);
    })
}

const bindLocaleSwitcher = (initialValue) => {
    const switcher = document.querySelector(
        "[data-i18n-switcher]"
    );

    switcher.value = initialValue;

    switcher.onchange = (e) => {
        i18next.changeLanguage(e.target.value)
            .then(translatePageElements);
    }
}

(async function () {
    await initI18next();
    translatePageElements();
    bindLocaleSwitcher(i18next.resolvedLanguage);
})();
