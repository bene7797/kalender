import { isHoliday, getHolidays } from 'https://cdn.skypack.dev/feiertagejs';
import { Images } from './Images.js';

export class Calender{

    constructor(date){
        this.date = date;
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.feiertag = isHoliday(date, 'ALL')? `ein` : `kein`;
        this.images = new Images();
        this.winter = false;
    }


    /**
 * @param {HTMLTableElement} kalenderTabelle
 */

    getSeason(){
        const meinBody = document.body;
        
        
       
        if(this.month >= 0 && this.month <= 2){
            
             meinBody.style.backgroundImage =`url('${this.images.winterImages[Math.floor(Math.random() * this.images.winterImages.length)]}')`;
             this.winter = true;
        }else{
            this.winter = false;
        } 
        if(this.month >= 3 && this.month <= 5){
            
             meinBody.style.backgroundImage =`url('${this.images.fruehlingImages[Math.floor(Math.random() * this.images.fruehlingImages.length)]}')`;
        }
        if(this.month >= 6 && this.month <= 8){
            
             meinBody.style.backgroundImage =`url('${this.images.sommerImages[Math.floor(Math.random() * this.images.sommerImages.length)]}')`;
        }
        if(this.month >= 9 && this.month <= 11){
            
             meinBody.style.backgroundImage =`url('${this.images.herbstImages[Math.floor(Math.random() * this.images.herbstImages.length)]}')`;
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
        this.feiertag = isHoliday(this.date, 'ALL')? `ein` : `kein`;
        this.getSeason();
    }

    getDateString(){
        return `Kalenderblatt vom ${this.day}.${this.month + 1}.${this.year}`;
    }

    getDayInfoText(){
        let monthString = this.date.toLocaleDateString("de-DE", { month: "long" });
        let weekDayString = this.date.toLocaleDateString("de-DE", { weekday: "long" });
        let dayOfYear = this.dayOfYear();
    

        let infoText = `Der ${this.day} ${monthString} ${this.year}
                     ist ein ${weekDayString} und zwar der ${this.day} ${weekDayString} des Jahres ${this.year}. Es handelt sich um den 
                     ${dayOfYear} Tag des Jahres, was bedeutet dass es noch ${365 - dayOfYear} Tage bis zum Jahresende sind.
                     Der Monat ${monthString} hat insgesamt ${new Date(this.year,this.month +1,0).getDate()} Tage. Heute ist ${this.feiertag} gesetzlicher Feiertag.`;


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

        
    

        const jsonUrl = `https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/${this.month}/${this.day}`;
  
        const res = await fetch(jsonUrl, {
        headers: {
            'Api-User-Agent': 'MeinKalenderProjekt/1.0 (dein-email@beispiel.de)'
        }
        });


        if (!res.ok) throw new Error("API Fehler");
        const data = await res.json();

        const items = data.events
            .slice(0, 5)
            .map(e => `<li><strong>${e.year}:</strong> ${e.text}</li>`)
            .join("");

        return `<ul>${items}</ul>`;
        
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


