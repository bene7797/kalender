export class Flocke {
    static maxSize = 8;
    static maxSpeed = 5;

    //Größe und Position werden random generiert beim Erstellen
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight; 
        this.size = Math.random() * Flocke.maxSize;
        this.speed = Math.random() * Flocke.maxSpeed;
    }

    //Positionstranformation mit Loop in Y-Achse
    update() {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
            this.y = -5;
            this.x = Math.random() * this.canvasWidth;
        }
    }

    //Schneeflocken zeichnen
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}