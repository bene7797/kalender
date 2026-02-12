import { Calender } from "./Calendar.js";
import { ParticleCanvas } from "./ParticleCanvas.js";
import { Images } from "./Images.js";

//INIT
let meinKalender = new Calender(new Date(1997,7-1,7));
const datum = document.getElementById("Datum");
const info = document.getElementById("Info");
const kalendar = document.getElementById("Kalender");
const historicInfo = document.getElementById("historical");
const nextMonthButton = document.getElementById("nextMonth");
const previousMonthButton = document.getElementById("previousMonth");
const myImages = new Images();
const meinBody = document.body;
const pc = new ParticleCanvas();
       
//Kalender füllen      
meinKalender.initTableEvents(kalendar);
meinKalender.getSeason();
datum.innerHTML = meinKalender.getDateString();
info.innerHTML = meinKalender.getDayInfoText();
kalendar.innerHTML = meinKalender.getCalendarHTML();
historicInfo.innerHTML = await meinKalender.anzeigen();

//Schneeanimation
pc.initSnow();
pc.animate();

//Events
window.addEventListener('resize', () => { pc.resize();});

previousMonthButton.addEventListener(`click`, () => {
  meinKalender.previousMonth();
});

nextMonthButton.addEventListener(`click`, () => {
  meinKalender.nextMonth();
});

window.addEventListener(`calendarUpdate`,async () => {
    console.log("Datum geändert");

    datum.innerHTML = meinKalender.getDateString();
    info.innerHTML = meinKalender.getDayInfoText();
    kalendar.innerHTML = meinKalender.getCalendarHTML();
    historicInfo.innerHTML = await meinKalender.anzeigen();
    console.log(meinKalender.winter);
    pc.renderParticles = meinKalender.winter;
    pc.clear();
    pc.animate();
    console.log(pc.renderParticles);
})
