import { launchSec } from "./launch.js";

const body = document.querySelector('body');

const header = document.querySelector('header h1');

const main = document.querySelector('main');

const countDownContainer = document.querySelector('.countdown');

const dayCont = document.querySelector('[data-cont="days"] span');

const hourCont = document.querySelector('[data-cont="hours"] span');

const minuteCont = document.querySelector('[data-cont="mins"] span');

const secCont = document.querySelector('[data-cont="secs"] span');

let dayVal, hourVal, minuteVal, secVal;

let timerID = setTimeout(function decrease() {
    dayVal = +dayCont.textContent;
    hourVal = +hourCont.textContent;
    minuteVal = +minuteCont.textContent;
    secVal = +secCont.textContent;
    
    secVal -= 1;

    if (secVal == 0 && minuteVal != 0) {
        secVal = 59;
        // secVal = 4;
        minuteVal -= 1;
        let div = createFlipDiv();
        minuteCont.previousElementSibling.append(div);
        removeFlipDiv(div);
    }

    if (minuteVal == 0 && hourVal != 0) {
        minuteVal = 59;
        // minuteVal = 4;
        hourVal -= 1;
        let div = createFlipDiv();
        hourCont.previousElementSibling.append(div);
        removeFlipDiv(div);
    }

    if (hourVal == 0 && dayVal != 0) {
        hourVal = 59;
        // hourVal = 2;
        dayVal -= 1;
        let div = createFlipDiv();
        dayCont.previousElementSibling.append(div);
        removeFlipDiv(div);
    }

    if (secVal < 10) {
        secVal = check(secVal);
    }

    if (minuteVal < 10) {
        minuteVal = check(minuteVal);
    }

    if (hourVal < 10) {
        hourVal = check(hourVal);
    }

    if (dayVal < 10) {
        dayVal = check(dayVal);
    }

    
    


    secCont.textContent = secVal;
    minuteCont.textContent = minuteVal;
    hourCont.textContent = hourVal;
    dayCont.textContent = dayVal;
    timerID = setTimeout(decrease, 1000);

    if (secVal == 0 && minuteVal == 0 && hourVal == 0 && dayVal == 0) {
        clearTimeout(timerID);
        secCont.previousElementSibling.querySelector('.flip').remove();

        let launch = launchSec();
        launch.style.opacity = 1;
        body.prepend(launch);

    }
}, 0);

function check(time) {
    if (time < 10) {
        time = `0${time}`;
    }
    return time;
}

function createFlipDiv() {
    let div = document.createElement('div');
    div.classList.add('face', 'flip');
    return div;
}

function removeFlipDiv(div) {
    setTimeout(() => {
        div.remove();
    }, 1000);
}
