export class Flake {
    static MAX_SIZE = 8;
    static MAX_SPEED = 5;

    //Größe und Position werden random generiert beim Erstellen
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.posX = Math.random() * canvasWidth;
        this.posY = Math.random() * canvasHeight; 
        this.size = Math.random() * Flake.MAX_SIZE;
        this.speed = Math.random() * Flake.MAX_SPEED;

        document.addEventListener("mousemove", (event) => {
            this.cursorPosX = event.clientX;
            this.cursorPosY = event.clientY;
        });
    }

    //Positionstranformation mit Loop in Y-Achse
    update() {
        this.posY += this.speed;
        if (this.posY > this.canvasHeight) {
            this.posY = -5;
            this.posX = Math.random() * this.canvasWidth;
        }

        //Maus verfolgen
        this.posX += (this.posX - this.cursorPosX)/200;
    }

    //Schneeflocken zeichnen
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}