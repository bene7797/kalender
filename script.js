import { Calender } from "./Calendar.js";
import { ParticleCanvas } from "./ParticleCanvas.js";


let meinKalender = new Calender(new Date(2026,3,10));

const datum = document.getElementById("Datum");
const info = document.getElementById("Info");
const kalendar = document.getElementById("Kalender");
const historicInfo = document.getElementById("historical");
const nextMonthButton = document.getElementById("nextMonth");
const previousMonthButton = document.getElementById("previousMonth");

const pc = new ParticleCanvas();
pc.initSnow();
pc.animate();
/*
let meinCanvas = new ParticleCanvas();
meinCanvas.initSnow();
meinCanvas.draw();
meinKalender.initTableEvents(kalendar);
*/


previousMonthButton.addEventListener(`click`, () => {
  meinKalender.previousMonth();
});

nextMonthButton.addEventListener(`click`, () => {
  meinKalender.nextMonth();
});

datum.innerHTML = meinKalender.getDateString();
info.innerHTML = meinKalender.getDayInfoText();
kalendar.innerHTML = meinKalender.getCalendarHTML();
historicInfo.innerHTML = await meinKalender.anzeigen();

//meinCanvas.draw();



window.addEventListener(`calendarUpdate`,async () => {
    console.log("Datum geändert");

    datum.innerHTML = meinKalender.getDateString();
    info.innerHTML = meinKalender.getDayInfoText();
    kalendar.innerHTML = meinKalender.getCalendarHTML();
    historicInfo.innerHTML = await meinKalender.anzeigen();
})
