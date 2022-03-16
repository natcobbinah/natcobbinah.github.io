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


seeMoreofBrailleBtn.addEventListener('click', () => {
    toggleHiddenDescription(braille_description,seeMoreofBrailleBtn)
});
seeMoreofDrillBtn.addEventListener('click', () => {
    toggleHiddenDescription(drill_description,seeMoreofDrillBtn)
});
seeMoreofPayrollBtn.addEventListener('click', () => {
    toggleHiddenDescription(payroll_description,seeMoreofPayrollBtn)
});
seeMoreofYoutubeBtn.addEventListener('click', () => {
    toggleHiddenDescription(youtube_description,seeMoreofYoutubeBtn)
});
seeMoreofRestBtn.addEventListener('click', () => {
    toggleHiddenDescription(rest_description,seeMoreofRestBtn)
});
seeMoreofWriterBtn.addEventListener('click', () => {
    toggleHiddenDescription(textWriter_description,seeMoreofWriterBtn)
});