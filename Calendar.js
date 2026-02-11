import { isHoliday, getHolidays } from 'https://cdn.skypack.dev/feiertagejs';

export class Calender{

    constructor(date){
        this.date = date;
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.feiertag = isHoliday(date, 'ALL')? `ein` : `kein`;
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
                    kalenderhtml += `<td>${index}</td>`
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
  
        const res = await fetch(
            `https://api.wikimedia.org/feed/v1/wikipedia/de/onthisday/events/${this.month}/${this.day}`
        );
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


   


}


