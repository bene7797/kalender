import { Calender } from "./Calendar.js";
import { ParticleCanvas } from "./ParticleCanvas.js";

//INIT
let myCalendar = new Calender(new Date());
const date = document.getElementById("Datum");
const dayInfo = document.getElementById("Info");
const calendar = document.getElementById("tableContainer");
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
window.addEventListener('resize', () => { pc.resize(); });

previousMonthButton.addEventListener(`click`, () => {
  myCalendar.previousMonth();
});

nextMonthButton.addEventListener(`click`, () => {
  myCalendar.nextMonth();
});

window.addEventListener(`calendarUpdate`, async () => {
  console.log("Datum geändert");

  pc.stopAnnim();

  date.innerHTML = myCalendar.getDateString();
  dayInfo.innerHTML = myCalendar.getDayInfoText();
  calendar.innerHTML = myCalendar.getCalendarHTML();
  historicalDayInfo.innerHTML = await myCalendar.anzeigen();
  console.log(myCalendar.isWinter);
  pc.renderParticles = myCalendar.isWinter;
  if (pc.renderParticles) {
    pc.animate();
  }
  console.log(pc.renderParticles);
})
