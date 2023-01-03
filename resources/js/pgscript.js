const { seoObject } = require('./seoscript');
import css from '../css/styles.css';
import { toggleHiddenDescription } from './showHideTextScript';
//import i18next from 'i18next';
//import HttpApi from "i18next-http-backend";
//import LanguageDetector from "i18next-browser-languagedetector";

//icon buttons 
let seeMoreofBrailleBtn = document.querySelector('.brailleAppInfo');
let seeMoreofDrillBtn = document.querySelector('.drillingAppInfo');
//let seeMoreofMorseCodeBtn = document.querySelector('.morseCodeAppInfo');
let seeMoreofYoutubeBtn = document.querySelector('.youtubeAppInfo');
let seeMoreofRestBtn = document.querySelector('.restAppInfo');
//let seeMoreofWriterBtn = document.querySelector('.textWriterAppInfo');
let seeMoreofHackerNewsBtn = document.querySelector('.hackerNewsAppInfo');
let seeMoreofYelpBusineesAppBtn = document.querySelector('.YelpBusinessAppInfo');
//let seeMoreofJsonToDartClassAppBtn = document.querySelector('.jsonToDartDemoAppInfo');

//paragraph descriptions
let braille_description = document.querySelector('.project-six #brailleDescription ');
let drill_description = document.querySelector('.project-five #drillDescription');
//let morseCode_description = document.getElementById('morseCodeDescription');
let youtube_description = document.querySelector('.project-four #youtubeDescription');
let rest_description = document.querySelector('.project-three #restDescription');
//let textWriter_description = document.getElementById('textWriterDescription');
let hackerNews_description = document.querySelector('.project-one #hackerNewsAppDescription');
let yelpBusiness_description = document.querySelector('.project-two #yelpBusinessAppDescription');
//let jsonToDartClass_description = document.getElementById('jsonToDartDemoAppDescription');

//hamburger menu in mobile view
let mobileMenu = document.querySelector("header nav ul li .icon ");
let mobileMenuElementsToDisplay = document.querySelector("header nav ul li");

const demoAppsMap = new Map();
demoAppsMap.set(seeMoreofBrailleBtn, braille_description)
    .set(seeMoreofDrillBtn, drill_description)
    .set(seeMoreofYoutubeBtn, youtube_description)
    .set(seeMoreofRestBtn, rest_description)
    .set(seeMoreofHackerNewsBtn, hackerNews_description)
    .set(seeMoreofYelpBusineesAppBtn, yelpBusiness_description)

demoAppsMap.forEach((description, descriptionButtonPress) => {
    descriptionButtonPress.addEventListener('click', () => {
        toggleHiddenDescription(description, descriptionButtonPress)
    })
})

mobileMenu.addEventListener('click', () => {
    if (mobileMenuElementsToDisplay.style.display === "block") {
        mobileMenuElementsToDisplay.style.display = "none";
      } else {
        mobileMenuElementsToDisplay.style.display = "block";
      }
})

//observers for animation on page scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        const skillSetLangImage = entry.target.querySelector('.languages');
        const skillSetFrameworkImage = entry.target.querySelector('.frameworks');
        const skillSetDbImage = entry.target.querySelector('.databases');

        if(entry.isIntersecting){
            skillSetLangImage.classList.add('skillStackListImages');
            skillSetFrameworkImage.classList.add('skillStackListImages');
            skillSetDbImage.classList.add('skillStackListImages');
            return;
        }

        skillSetLangImage.classList.remove('skillStackListImages');
        skillSetFrameworkImage.classList.remove('skillStackListImages');
        skillSetDbImage.classList.remove('skillStackListImages');
    })
})

observer.observe(document.querySelector('.stackData'));

//page translation (not working efficiently for now, will get back to it later)
/* async function initI18next() {
    await i18next
        .use(HttpApi)
        .use(LanguageDetector)
        .init({
            debug: true,
            supportedLngs: ["en", "fr"],
            fallbackLng: "en",
            nonExplicitSupportedLngs: true,
            backend: {
                loadPath: "../js/lang/{{lng}}.json",
            }
        });
}

function translatePageElements() {
    const translatePageElements = document.querySelectorAll(
        "[data-i18n-key]",
    );

    translatePageElements.forEach((el) => {
        const key = el.getAttribute("data-i18n-key");
        el.innerHTML = i18next.t(key);
    })
}

//select language option
function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector(
      "[data-i18n-switcher]",
    );
    switcher.value = initialValue;
    switcher.onchange = (e) => {
      i18next
        .changeLanguage(e.target.value)
        .then(translatePageElements);
    };
  }
  

(async function () {
    await initI18next();
    translatePageElements();
    bindLocaleSwitcher(i18next.resolvedLanguage);
})();
 */
//Load images in html ContentPages using
//promises to reduce  high BlockingTime
//when loading images together with pageContent
/* const loadPageImages = new Map();
loadPageImages.set("my-picframe", "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGF2YXRhcnN8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=60 700w")
    .set("project-one", "https://media.istockphoto.com/photos/close-up-of-male-hand-reading-braille-text-picture-id983873912?b=1&amp;k=20&amp;m=983873912&amp;s=170667a&amp;w=0&amp;h=VrIBNxgW0RyNqEKaf06mMR552TJrlt8uoaooz6UTEjs=")
    .set("project-two", "https://images.unsplash.com/photo-1629540946404-ebe133e99f49?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZHJpbGxpbmd8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w")
    .set("project-three", "https://images.unsplash.com/photo-1570286424717-86d8a0082d0c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9yc2UlMjBjb2RlfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w")
    .set("project-four", "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8eW91dHViZSUyMHR1dG9yaWFsc3xlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w")
    .set("project-five", "https://images.unsplash.com/photo-1615309662472-4ca77a77a189?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w")
    .set("project-six", "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlJTIwd29yZCUyMHNvZnR3YXJlfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w")
    .set("project-seven", "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmV3cyUyMGZlZWR8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60 900w")
    .set("project-eight", "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=60 600w")
    .set("project-nine", "https://images.unsplash.com/photo-1610986602538-431d65df4385?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8anNvbnxlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60 500w");

const retrieveUnsplashImages = (imageUrl) =>
    fetch(imageUrl).then(response => response.blob());

loadPageImages.forEach((value, key) => {
    let insertImage = document.querySelector(`.${key} img`);
    retrieveUnsplashImages(value)
        .then((response) => {
           insertImage.src  = URL.createObjectURL(response);
        })
        .catch(error => {
            console.log(error)
        })     
}) */
