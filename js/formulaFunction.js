class formulaFunction extends Function {
    constructor(func, numOfPoints, canvasWidth) {
        super(numOfPoints, canvasWidth);
        this._func = func;
    }

    update(t) {
        for (let i = 0; i < this._numOfPoints + 1; i++) {
            this._y[i] = this._func(this._x[i], t);
        }
    }
}