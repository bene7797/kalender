import { Flocke } from "./Flocke.js";

export class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById("PartikelCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.snowflakes = []; 
        this.leaves = [];
        this.renderParticles = false;
        this.resize(); 
    }

    initSnow() {
        const numberOfSnowflakes = 500;
        for (let i = 0; i < numberOfSnowflakes; i++) {
            this.snowflakes.push(new Flocke(screen.width, screen.height));
        }
    }

    clear(){
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
       if(this.renderParticles){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.snowflakes.forEach(flake => {
                flake.update();
                flake.draw(this.ctx);
            });

            requestAnimationFrame(() => this.animate());
        }  
    }

    resize() {
        const dpr = window.devicePixelRatio || 1; //Fallback auf 1 wenn devicePixelRatio nicht exisitiert
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        
        // skalieren - damit nicht unscharf -> 1 css pixel = 2*2 Hardwarepixel
        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";
    }
}