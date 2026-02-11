import { Calender } from "./Calendar.js";

const meinKalender = new Calender(new Date(2026,3,10));

document.getElementById("Datum").innerHTML = meinKalender.getDateString();
document.getElementById("Info").innerHTML = meinKalender.getDayInfoText();
document.getElementById("Kalender").innerHTML = meinKalender.getCalendarHTML();
document.getElementById("historical").innerHTML = await meinKalender.anzeigen();





