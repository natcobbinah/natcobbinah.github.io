import { toggleHiddenDescription } from '../modules/dom_modules.js';

//icon buttons 
let seeMoreofBrailleBtn = document.querySelector('.brailleAppInfo');
let seeMoreofDrillBtn = document.querySelector('.drillingAppInfo');
let seeMoreofPayrollBtn = document.querySelector('.payrollAppInfo');
let seeMoreofYoutubeBtn = document.querySelector('.youtubeAppInfo');
let seeMoreofRestBtn = document.querySelector('.restAppInfo');
let seeMoreofWriterBtn = document.querySelector('.textWriterAppInfo');

//paragraph descriptions
let braille_description = document.getElementById('brailleDescription');
let drill_description = document.getElementById('drillDescription');
let payroll_description = document.getElementById('payrollDescription');
let youtube_description = document.getElementById('youtubeDescription');
let rest_description = document.getElementById('restDescription');
let textWriter_description = document.getElementById('textWriterDescription');

let allBtnsToBeClicked = [seeMoreofBrailleBtn, seeMoreofDrillBtn, seeMoreofPayrollBtn, seeMoreofYoutubeBtn,
    seeMoreofRestBtn, seeMoreofWriterBtn];

let allDescriptionsToDisplay = [braille_description, drill_description, payroll_description, youtube_description,
    rest_description, textWriter_description];

//note buttonFxntionality and its description in the subsequent array matches 
//for the loop fxtionality to work as exepcted
allBtnsToBeClicked.forEach((btnActivity, index) => {
    btnActivity.addEventListener('click', () => {
        toggleHiddenDescription(allDescriptionsToDisplay[index], allBtnsToBeClicked[index]);
    })
});
