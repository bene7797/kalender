import { Flocke } from "./Flocke";

export class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById("PartikelCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.snowflakes = []; 
    }

    initSnow() {
        const numberOfSnowflakes = 150;
        for (let i = 0; i < numberOfSnowflakes; i++) {
       
            this.snowflakes.push(new Flocke(this.canvas.width, this.canvas.height));
        }
    }

    animate() {
       
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      
        this.snowflakes.forEach(flake => {
            flake.update();
            flake.draw(this.ctx);
        });

        
        requestAnimationFrame(() => this.animate());
    }
}