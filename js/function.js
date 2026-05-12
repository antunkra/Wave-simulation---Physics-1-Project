class Function {
    constructor(numOfPoints, canvasWidth) {
        if (new.target === Function) {
            throw new Error("Cannot instantiate abstract class 'Function' directly.");
        }
        this._numOfPoints = numOfPoints;
        this._canvasWidth = canvasWidth;
        this._y = new Array(numOfPoints + 1).fill(0);
        this._x = new Array(numOfPoints + 1).fill(0).map((_, i) => i * (canvasWidth / numOfPoints));
    }

    get numOfPoints() {
        return this._numOfPoints;
    }

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    update(t) {
        throw new Error("Method 'update(t)' must be implemented.");
    }

    reset() {
        for (let i = 0; i < this._numOfPoints + 1; i++) {
            this._y[i] = 0;
        }
    }
} 