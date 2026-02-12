import { isHoliday as checkHoliday, getHolidays } from 'https://cdn.skypack.dev/feiertagejs';
import { Images } from './Images.js';

export class Calender{

    constructor(date){
        this.date = date;
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.isHoliday = checkHoliday(date, 'ALL')? `ein` : `kein`;
        this.seasonImages = new Images();
        this.isWinter = false;
    }

    /**
 * @param {HTMLTableElement} kalenderTabelle
 */
    getSeason(){
        const meinBody = document.body;
        
        if(this.month >= 0 && this.month <= 2){
            
             meinBody.style.backgroundImage =`url('${this.seasonImages.winterImages[Math.floor(Math.random() * this.seasonImages.winterImages.length)]}')`;
             this.isWinter = true;
        }else{
            this.isWinter = false;
        } 
        if(this.month >= 3 && this.month <= 5){
            
             meinBody.style.backgroundImage =`url('${this.seasonImages.fruehlingImages[Math.floor(Math.random() * this.seasonImages.fruehlingImages.length)]}')`;
        }
        if(this.month >= 6 && this.month <= 8){
            
             meinBody.style.backgroundImage =`url('${this.seasonImages.sommerImages[Math.floor(Math.random() * this.seasonImages.sommerImages.length)]}')`;
        }
        if(this.month >= 9 && this.month <= 11){
            
             meinBody.style.backgroundImage =`url('${this.seasonImages.herbstImages[Math.floor(Math.random() * this.seasonImages.herbstImages.length)]}')`;
        }
    }

    initTableEvents(kalenderTabelle){
        kalenderTabelle.addEventListener(`click`, (event) => {
            const zelle = event.target;

            console.log("inti");

            if(zelle.tagName === `TD` && zelle.innerText.trim() !== ""){
                const today = parseInt(zelle.innerText);
                console.log(today);
                this.date = new Date(this.year,this.month,today);
                this.calculateDates();
                const event = new CustomEvent(`calendarUpdate`, {
                     detail: {date:this.date}
                });
                 window.dispatchEvent(event);
                
            }
        })
    }
    

    calculateDates(){
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        this.isHoliday = checkHoliday(this.date, 'ALL')? `ein` : `kein`;
        this.getSeason();
    }

    getDateString(){
        return ` ${this.day}.${this.month + 1}.${this.year}`;
    }

    getDayInfoText(){
        let monthString = this.date.toLocaleDateString("de-DE", { month: "long" });
        let weekDayString = this.date.toLocaleDateString("de-DE", { weekday: "long" });
        let dayOfYear = this.dayOfYear();
    

        let infoText = `Der ${this.day} ${monthString} ${this.year}
                     ist ein ${weekDayString} und zwar der ${this.day} ${weekDayString} des Jahres ${this.year}. Es handelt sich um den 
                     ${dayOfYear} Tag des Jahres, was bedeutet dass es noch ${365 - dayOfYear} Tage bis zum Jahresende sind.
                     Der Monat ${monthString} hat insgesamt ${new Date(this.year,this.month +1,0).getDate()} Tage. Heute ist ${this.isHoliday} gesetzlicher Feiertag.`;


        return infoText;
    }

    getCalendarHTML(){

        let kalenderhtml = `<tr> <th>Mo</th><th>Di</th><th>Mi</th><th>Do</th><th>Fr</th><th>Sa</th><th>So</th></tr>`;
        let firstDayIndex = (new Date(this.year,this.month,1).getDay() + 6)%7;
        let daysInMonth = new Date(this.year,this.month +1,0).getDate(); //Anzahl an Tage im aktuellen Monat
 
        for(let spalte = 0;spalte < 6;spalte++){
            kalenderhtml += `<tr>`
            for(let reihe = 0;reihe < 7;reihe++){
                let index = reihe + 7*spalte + 1 - firstDayIndex;
                let leer = " "
                if(index > 0 && index <= daysInMonth){
                    kalenderhtml += `<td class = "datum-klickbar">${index}</td>`
                }else{
                    kalenderhtml += `<td></td>`
                }
            }
            kalenderhtml += `</tr>`
        }
    
        return kalenderhtml;

    }

    dayOfYear() {
        const start = new Date(this.date.getFullYear(), 0, 1); // 1. Januar
        const diff = this.date - start;
        const einTag = 1000 * 60 * 60 * 24;

        return Math.floor(diff / einTag) + 1;
    }
    

    async ereignisseAlsListe() {

       try {
        const month = String(this.month).padStart(2, '0');
        const day = String(this.day).padStart(2, '0');
        const jsonUrl = `https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

        const res = await fetch(jsonUrl, {
            headers: { 'Api-User-Agent': 'MeinKalenderProjekt/2.0' }
        });

        if (!res.ok) throw new Error(`API Status: ${res.status}`);

        const data = await res.json();
        
      
        const list = data.events || data.selected || [];

        if (list.length === 0) return "Keine Ereignisse gefunden.";

        const items = list
            .slice(0, 5)
            .map(e => `<li><strong>${e.year}:</strong> ${e.text}</li>`)
            .join("");

        return `<ul style="text-align: left; list-style: none; padding: 0;">${items}</ul>`;

    } catch (error) {
        console.error("Fehler beim Laden:", error);
        //Dummy Daten falls Api nicht funktioniert
        return `<ul>
                        Wikipedia-API nicht verfügbar - unten stehen sind Dummy-Daten <br>
                    <br>
                    <li><strong>1809:</strong> Charles Darwin und Abraham Lincoln werden am selben Tag geboren.</li>
                    <li><strong>1912:</strong> Die RMS Titanic kollidiert auf ihrer Jungfernfahrt mit einem Eisberg.</li>
                    <li><strong>1922:</strong> Das Grab von Tutanchamun wird im Tal der Könige entdeckt.</li>
                    <li><strong>1969:</strong> Neil Armstrong betritt als erster Mensch die Mondoberfläche.</li>
                    <li><strong>1989:</strong> Die Berliner Mauer fällt und markiert das Ende des Kalten Krieges.</li>
                </ul>`;
    }
        
    }


    async anzeigen(){
        const html = await this.ereignisseAlsListe();
        return html;
    }


    nextMonth(){

        let year = this.year;
        let month = this.month;
        month++;
        
        if (this.month > 11){
            month = 0;
            year++;
        }

        this.date = new Date(year,month,this.day)
        this.calculateDates();

        const event = new CustomEvent(`calendarUpdate`, {
            detail: {date:this.date}
        });
        window.dispatchEvent(event);
    }


    previousMonth(){
        let year = this.year;
        let month = this.month;
        month--;
        
        if (this.month < 0){
            month = 12;
            year--;
        }

        this.date = new Date(year,month,this.day)
        this.calculateDates();

        const event = new CustomEvent(`calendarUpdate`, {
            detail: {date:this.date}
        });
        window.dispatchEvent(event);
    }


}


