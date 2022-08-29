const {seoObject} = require('./seoscript');
import css from  '../css/styles.css';
import {toggleHiddenDescription} from './showHideTextScript';

//icon buttons 
let seeMoreofBrailleBtn = document.querySelector('.brailleAppInfo');
let seeMoreofDrillBtn = document.querySelector('.drillingAppInfo');
let seeMoreofMorseCodeBtn = document.querySelector('.morseCodeAppInfo');
let seeMoreofYoutubeBtn = document.querySelector('.youtubeAppInfo');
let seeMoreofRestBtn = document.querySelector('.restAppInfo');
let seeMoreofWriterBtn = document.querySelector('.textWriterAppInfo');
let seeMoreofHackerNewsBtn = document.querySelector('.hackerNewsAppInfo');
let seeMoreofYelpBusineesAppBtn = document.querySelector('.YelpBusinessAppInfo');
let seeMoreofJsonToDartClassAppBtn = document.querySelector('.jsonToDartDemoAppInfo');

//paragraph descriptions
let braille_description = document.getElementById('brailleDescription');
let drill_description = document.getElementById('drillDescription');
let morseCode_description = document.getElementById('morseCodeDescription');
let youtube_description = document.getElementById('youtubeDescription');
let rest_description = document.getElementById('restDescription');
let textWriter_description = document.getElementById('textWriterDescription');
let hackerNews_description = document.getElementById('hackerNewsAppDescription');
let yelpBusiness_description = document.getElementById('yelpBusinessAppDescription');
let jsonToDartClass_description = document.getElementById('jsonToDartDemoAppDescription');

const demoAppsMap = new Map();
demoAppsMap.set(seeMoreofBrailleBtn, braille_description)
    .set(seeMoreofDrillBtn, drill_description)
    .set(seeMoreofMorseCodeBtn, morseCode_description)
    .set(seeMoreofYoutubeBtn, youtube_description)
    .set(seeMoreofRestBtn, rest_description)
    .set(seeMoreofWriterBtn, textWriter_description)
    .set(seeMoreofHackerNewsBtn, hackerNews_description)
    .set(seeMoreofYelpBusineesAppBtn, yelpBusiness_description)
    .set(seeMoreofJsonToDartClassAppBtn, jsonToDartClass_description);
    
demoAppsMap.forEach((description, descriptionButtonPress) => {
    descriptionButtonPress.addEventListener('click', () => {
        toggleHiddenDescription(description, descriptionButtonPress)
    })
})

//Load images in html ContentPages using
//promises to reduce  high BlockingTime 
//when loading images together with pageContent
const loadPageImages = new Map();
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
})
