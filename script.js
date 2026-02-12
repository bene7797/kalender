import { Calender } from "./Calendar.js";
import { ParticleCanvas } from "./ParticleCanvas.js";

//INIT
let myCalendar = new Calender(new Date(1997,1-1,1));
const date = document.getElementById("Datum");
const dayInfo = document.getElementById("Info");
const calendar = document.getElementById("Kalender");
const historicalDayInfo = document.getElementById("historical");
const nextMonthButton = document.getElementById("nextMonth");
const previousMonthButton = document.getElementById("previousMonth");
const pc = new ParticleCanvas();
       
//Kalender füllen      
myCalendar.initTableEvents(calendar);
myCalendar.getSeason();
date.innerHTML = myCalendar.getDateString();
dayInfo.innerHTML = myCalendar.getDayInfoText();
calendar.innerHTML = myCalendar.getCalendarHTML();
historicalDayInfo.innerHTML = await myCalendar.anzeigen();

//Schneeanimation
pc.initSnow();
pc.renderParticles = myCalendar.isWinter;
pc.animate();

//Events
window.addEventListener('resize', () => { pc.resize();});

previousMonthButton.addEventListener(`click`, () => {
  myCalendar.previousMonth();
});

nextMonthButton.addEventListener(`click`, () => {
  myCalendar.nextMonth();
});

window.addEventListener(`calendarUpdate`,async () => {
    console.log("Datum geändert");

    date.innerHTML = myCalendar.getDateString();
    dayInfo.innerHTML = myCalendar.getDayInfoText();
    calendar.innerHTML = myCalendar.getCalendarHTML();
    historicalDayInfo.innerHTML = await myCalendar.anzeigen();
    console.log(myCalendar.isWinter);
    pc.renderParticles = myCalendar.isWinter;
    pc.clear();
    pc.animate();
    console.log(pc.renderParticles);
})
