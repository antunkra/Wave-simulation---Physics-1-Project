(function() {
    const canvas = document.getElementById("forcedWave");
    const ctx = canvas.getContext("2d");

    let y = [], v = [], a = [];
    let numOfPoints = 300;
    let amplitude = 125; 
    let w = window.w;
    let k = 1;
    let startTime = Date.now();
    let lastTime = 0;

    function init() {
        ctx.translate(0, canvas.height / 2);
        ctx.scale(1, -1);
        for (let i = 0; i < numOfPoints + 1; i++) {
            y.push(0); v.push(0); a.push(0);
        }
        window.requestAnimationFrame(draw);
    }

    function updateY(deltaTime) {
        let t = performance.now() / 1000;
        y[0] = amplitude * Math.sin(w * t);
        
        for (let i = 1; i < numOfPoints; i++) {
            a[i] = (y[i+1] - 2*y[i] + y[i-1]) * k * 1000;
        }
        for (let i = 1; i < numOfPoints; i++) {
            v[i] += a[i] * deltaTime;
            y[i] += v[i] * deltaTime;
        }
        //console.log(y[0]);
        y[numOfPoints] = y[numOfPoints-1]; // fixed end
    }

    function draw(timestamp) {
        let dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        //console.log(dt, timestamp);
        dt = Math.min(dt, 0.1);
        updateY(dt);
        let increment = canvas.width / numOfPoints;
        ctx.clearRect(0, -canvas.height/2, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, y[0]);
        for (let i = 1; i <= numOfPoints; i++) {
            ctx.lineTo(i * increment, y[i]);
        }
        ctx.stroke();
        window.requestAnimationFrame(draw);
    }

    init();
})();