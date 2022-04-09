import { toggleHiddenDescription } from '../modules/dom_modules.js';

//icon buttons 
let seeMoreofBrailleBtn = document.querySelector('.brailleAppInfo');
let seeMoreofDrillBtn = document.querySelector('.drillingAppInfo');
let seeMoreofMorseCodeBtn = document.querySelector('.morseCodeAppInfo');
let seeMoreofYoutubeBtn = document.querySelector('.youtubeAppInfo');
let seeMoreofRestBtn = document.querySelector('.restAppInfo');
let seeMoreofWriterBtn = document.querySelector('.textWriterAppInfo');
let seeMoreofHackerNewsBtn = document.querySelector('.hackerNewsAppInfo');
let seeMoreofYelpBusineesAppBtn = document.querySelector('.YelpBusinessAppInfo');

//paragraph descriptions
let braille_description = document.getElementById('brailleDescription');
let drill_description = document.getElementById('drillDescription');
let morseCode_description = document.getElementById('morseCodeDescription');
let youtube_description = document.getElementById('youtubeDescription');
let rest_description = document.getElementById('restDescription');
let textWriter_description = document.getElementById('textWriterDescription');
let hackerNews_description = document.getElementById('hackerNewsAppDescription');
let yelpBusiness_description = document.getElementById('yelpBusinessAppDescription');

let allBtnsToBeClicked = [seeMoreofBrailleBtn, seeMoreofDrillBtn, seeMoreofMorseCodeBtn, seeMoreofYoutubeBtn,
    seeMoreofRestBtn, seeMoreofWriterBtn, seeMoreofHackerNewsBtn, seeMoreofYelpBusineesAppBtn];

let allDescriptionsToDisplay = [braille_description, drill_description, morseCode_description, youtube_description,
    rest_description, textWriter_description, hackerNews_description, yelpBusiness_description];

//note buttonFxntionality and its description in the subsequent array matches 
//for the loop fxtionality to work as exepcted
allBtnsToBeClicked.forEach((btnActivity, index) => {
    btnActivity.addEventListener('click', () => {
        toggleHiddenDescription(allDescriptionsToDisplay[index], allBtnsToBeClicked[index]);
    })
});
