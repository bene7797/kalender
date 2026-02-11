import { Flocke } from "./Flocke.js";

export class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById("PartikelCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.snowflakes = []; 
       
        this.resize();
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


    //chatgpt funktion
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        
        // Den Kontext skalieren, damit deine alten Koordinaten (0-innerWidth) noch passen
        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";
    }
}