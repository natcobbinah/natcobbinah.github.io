import { toggleHiddenDescription } from '../modules/dom_modules.js';

//icon buttons 
let seeMoreofBrailleBtn = document.querySelector('.brailleAppInfo');
let seeMoreofDrillBtn = document.querySelector('.drillingAppInfo');
let seeMoreofMorseCodeBtn = document.querySelector('.morseCodeAppInfo');
let seeMoreofYoutubeBtn = document.querySelector('.youtubeAppInfo');
let seeMoreofRestBtn = document.querySelector('.restAppInfo');
let seeMoreofWriterBtn = document.querySelector('.textWriterAppInfo');

//paragraph descriptions
let braille_description = document.getElementById('brailleDescription');
let drill_description = document.getElementById('drillDescription');
let morseCode_description = document.getElementById('morseCodeDescription');
let youtube_description = document.getElementById('youtubeDescription');
let rest_description = document.getElementById('restDescription');
let textWriter_description = document.getElementById('textWriterDescription');

let allBtnsToBeClicked = [seeMoreofBrailleBtn, seeMoreofDrillBtn, seeMoreofMorseCodeBtn, seeMoreofYoutubeBtn,
    seeMoreofRestBtn, seeMoreofWriterBtn];

let allDescriptionsToDisplay = [braille_description, drill_description, morseCode_description, youtube_description,
    rest_description, textWriter_description];

//note buttonFxntionality and its description in the subsequent array matches 
//for the loop fxtionality to work as exepcted
allBtnsToBeClicked.forEach((btnActivity, index) => {
    btnActivity.addEventListener('click', () => {
        toggleHiddenDescription(allDescriptionsToDisplay[index], allBtnsToBeClicked[index]);
    })
});
