import { Flake } from "./Flocke.js";

export class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById("PartikelCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.snowflakes = [];
        this.renderParticles = false;
        this.resize();
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;

        document.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    initSnow() {
        const numberOfSnowflakes = 500;
        for (let i = 0; i < numberOfSnowflakes; i++) {
            this.snowflakes.push(new Flake(screen.width, screen.height));
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        if (!this.renderParticles) {
            this.stop();
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snowflakes.forEach(flake => {
            flake.update(this.mouseX, this.mouseY);
            flake.draw(this.ctx);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
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

    stopAnnim() {

        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        this.clear();
    }
}