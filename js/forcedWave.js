(function() {
    const canvas = document.getElementById("forcedWave");
    const ctx = canvas.getContext("2d");

    let y = [], oldY = [], v = [], a = [];
    let lastTime = 0;
    let justReset = false;

    function init() {
        ctx.translate(0, canvas.height / 2);
        ctx.scale(1, -1);
        for (let i = 0; i < window.numOfPoints + 1; i++) {
            y.push(0); oldY.push(0); v.push(0); a.push(0);
        }
        window.requestAnimationFrame(draw);
    }

    function resetWave() {
        for (let i = 0; i < window.numOfPoints + 1; i++) {
            y[i] = 0; oldY[i] = 0; v[i] = 0; a[i] = 0;
        }
    }
    
    function clearCanvas() {
        ctx.clearRect(0, -canvas.height/2, canvas.width, canvas.height);
    }

    function updateY(deltaTime) {
        let t = (performance.now() - window.startTime) / 1000;
        y[0] = window.amplitude * Math.sin(window.w * t);

        const dx = canvas.width / window.numOfPoints;
        let tempY = [...y];
    
        for (let i = 1; i < window.numOfPoints; i++) {
            a[i] = window.springConstant * (y[i+1] - 2*y[i] + y[i-1]) / dx;
        }
        // for (let i = 1; i < window.numOfPoints; i++) {
        //     y[i] = 2 * y[i] - oldY[i] + a[i] * deltaTime ** 2;
        // }
        // oldY = tempY;
        for (let i = 1; i < window.numOfPoints; i++) {
            v[i] += a[i] * deltaTime;
            y[i] += v[i] * deltaTime;
        }
        if (!window.endFixed) {
            y[window.numOfPoints] = y[window.numOfPoints-1]; // fixed end
        } else {
            y[window.numOfPoints] = 0; // free end
        }
    }

    function draw(timestamp) {
        if (window.paused) {
            justReset = true;
            window.requestAnimationFrame(draw);
            return;
        }
        if (justReset) {
            resetWave();
            justReset = false;
        }
        let dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        dt = Math.min(dt, 0.1);
        updateY(dt);
        let increment = canvas.width / window.numOfPoints;
        clearCanvas();
        ctx.beginPath();
        ctx.moveTo(0, y[0]);
        for (let i = 1; i <= window.numOfPoints; i++) {
            ctx.lineTo(i * increment, y[i]);
        }
        ctx.stroke();
        window.requestAnimationFrame(draw);
    }

    init();
})();