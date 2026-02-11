export class Flocke {
    static maxSize = 3;
    static maxSpeed = 1;

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        
       
        this.size = Math.random() * Flocke.maxSize;
        this.speed = Math.random() * Flocke.maxSpeed;
    }

    update() {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
            this.y = -5;
            this.x = Math.random() * this.canvasWidth;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}