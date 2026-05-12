class GraphAnimation {
    constructor(wind, canvasId, func) {
        this._canvas = document.getElementById(canvasId);
        this._ctx = this._canvas.getContext("2d");
        this.setupCanvas();
        this._func = func;
        this._paused = false;
        this._window = wind;
        this._startTime = performance.now();
    }
    
    setupCanvas() {
        this._ctx.translate(0, this._canvas.height / 2);
        this._ctx.scale(1, -1);
    }

    clearCanvas() {
        this._ctx.clearRect(0, -this._canvas.height/2, this._canvas.width, this._canvas.height);
    }

    drawFrame(t) {
        this._func.update(t);
        
        this.clearCanvas();
        this._ctx.beginPath();
        this._ctx.moveTo(Math.floor(this._func.x[0]), Math.floor(this._func.y[0]));
        for (let i = 1; i < this._func.numOfPoints; i++) {
            this._ctx.lineTo(Math.floor(this._func.x[i]), Math.floor(this._func.y[i]));
        }
        this._ctx.stroke();
    }

    animate() {
        if (this._paused) {
            this._window.requestAnimationFrame(this.animate.bind(this));
            return;
        }

        let t = (performance.now() - this._startTime) / 1000;
        this.drawFrame(t);
        
        this._window.requestAnimationFrame(this.animate.bind(this));
    }

    reset() {
        this._startTime = performance.now();
    }

    set paused(value) {
        this._paused = value;
    }
}