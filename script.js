import { isHoliday, getHolidays } from 'https://cdn.skypack.dev/feiertagejs';

let date = new Date(2026,3,10)
let today = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
const feiertag = isHoliday(date, 'ALL')? `ein` : `kein`;



function showDate(){
    document.getElementById("Datum").innerHTML = `Kalenderblatt vom ${today}.${month + 1}.${year}`;
}


function dayText(){
    let monthString = date.toLocaleDateString("de-DE", { month: "long" });
    let weekDayString = date.toLocaleDateString("de-DE", { weekday: "long" });
    let dayOfYear = tagDesJahres(date);
    

    let infoText = `Der ${today} ${monthString} ${year}
                     ist ein ${weekDayString} und zwar der ${today} ${weekDayString} des Jahres ${year}. Es handelt sich um den 
                     ${dayOfYear} Tag des Jahres, was bedeutet dass es noch ${365 - dayOfYear} Tage bis zum Jahresende sind.
                     Der Monat ${monthString} hat insgesamt ${new Date(year,month +1,0).getDate()} Tage. Heute ist ${feiertag} gesetzlicher Feiertag.`;

    document.getElementById("Info").innerHTML = infoText;
}

function fillCalender(){

    let kalenderhtml = `<tr> <th>Mo</th><th>Di</th><th>Mi</th><th>Do</th><th>Fr</th><th>Sa</th><th>So</th></tr>`;
      
    let firstDayIndex = (new Date(year,month,1).getDay() + 6)%7;
    let daysInMonth = new Date(year,month +1,0).getDate(); //Anzahl an Tage im aktuellen Monat
 
    for(let spalte = 0;spalte < 6;spalte++){
        kalenderhtml += `<tr>`
        for(let reihe = 0;reihe < 7;reihe++){
            let index = reihe + 7*spalte + 1 - firstDayIndex;
            let leer = " "
            if(index > 0 && index <= daysInMonth){
                kalenderhtml += `<td>${index}</td>`
            }else{
                kalenderhtml += `<td></td>`
            }
        }
        kalenderhtml += `</tr>`
    }
    
    document.getElementById("Kalender").innerHTML = kalenderhtml;
}

function tagDesJahres(datum) {
  const start = new Date(datum.getFullYear(), 0, 1); // 1. Januar
  const diff = datum - start;
  const einTag = 1000 * 60 * 60 * 24;

  return Math.floor(diff / einTag) + 1;
}

async function ereignisseAlsListe() {
  
  const res = await fetch(
    `https://api.wikimedia.org/feed/v1/wikipedia/de/onthisday/events/${month}/${today}`
  );
  const data = await res.json();

  const items = data.events
    .slice(0, 5)
    .map(e => `<li><strong>${e.year}:</strong> ${e.text}</li>`)
    .join("");

  return `<ul>${items}</ul>`;
}

async function anzeigen() {
  const html = await ereignisseAlsListe(new Date());
  document.getElementById("historical").innerHTML = html;
}

showDate();
dayText();
fillCalender();
anzeigen();
feierAnzeigen();


