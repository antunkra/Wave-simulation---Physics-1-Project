class SimulatedFunction extends Function {
    constructor(func, springConstant, numOfPoints, canvasWidth) {
        super(numOfPoints, canvasWidth);
        this._v = new Array(numOfPoints + 1).fill(0);
        this._a = new Array(numOfPoints + 1).fill(0);
        this._func = func;
        this._springConstant = springConstant;
        this._lastUpdateTime = 0;
        this._dx = canvasWidth / numOfPoints;
    }

    set springConstant(value) {
        this._springConstant = value;
    }

    update(t) {
        this._y[0] = this._func(0, t);
        const dt = t - this._lastUpdateTime;
        for (let i = 1; i < this._numOfPoints; i++) {
            this._a[i] = this._springConstant * (this._y[i+1] - 2*this._y[i] + this._y[i-1]) / this._dx;
        }
        for (let i = 1; i < this._numOfPoints; i++) {
            this._v[i] += this._a[i] * dt;
            this._y[i] += this._v[i] * dt;
        }
        if (!window.endFixed) {
            this._y[this._numOfPoints] = this._y[this._numOfPoints-1]; // fixed end
        } else {
            this._y[this._numOfPoints] = 0; // free end
        }
        this._lastUpdateTime = t;
    }

    reset() {
        for (let i = 0; i < this._numOfPoints + 1; i++) {
            this._y[i] = 0;
            this._v[i] = 0;
            this._a[i] = 0;
        }
    }
}