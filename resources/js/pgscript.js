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

const showMoreInfo_braille = () => {
    if (braille_description.style.display === 'block') {
        braille_description.style.display = 'none';
        seeMoreofBrailleBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    } else {
        braille_description.style.display = 'block';
        seeMoreofBrailleBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    }
}

const showMoreInfo_drill = () => {
    if(drill_description.style.display === 'block'){
        drill_description.style.display = 'none';
        seeMoreofDrillBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    }else{
        drill_description.style.display = 'block';
        seeMoreofDrillBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    }
}

const showMoreInfo_payroll = () => {
    if(payroll_description.style.display === 'block'){
        payroll_description.style.display = 'none';
        seeMoreofPayrollBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    }else{
        payroll_description.style.display = 'block';
        seeMoreofPayrollBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    }
}

const showMoreInfo_youtube = () => {
    if(youtube_description.style.display === 'block'){
        youtube_description.style.display = 'none';
        seeMoreofYoutubeBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    }else{
        youtube_description.style.display = 'block';
        seeMoreofYoutubeBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    }
}

const showMoreInfo_rest = () => {
    if(rest_description.style.display === 'block'){
        rest_description.style.display = 'none';
        seeMoreofRestBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    }else{
        rest_description.style.display = 'block';
        seeMoreofRestBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    }
}

const showMoreInfo_textWriter = () => {
    if(textWriter_description.style.display === 'block'){
        textWriter_description.style.display = 'none';
        seeMoreofWriterBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    }else{
        textWriter_description.style.display = 'block';
        seeMoreofWriterBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    }
}


seeMoreofBrailleBtn.addEventListener('click', showMoreInfo_braille);
seeMoreofDrillBtn.addEventListener('click', showMoreInfo_drill);
seeMoreofPayrollBtn.addEventListener('click', showMoreInfo_payroll);
seeMoreofYoutubeBtn.addEventListener('click', showMoreInfo_youtube);
seeMoreofRestBtn.addEventListener('click', showMoreInfo_rest);
seeMoreofWriterBtn.addEventListener('click', showMoreInfo_textWriter);