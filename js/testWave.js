var k = 2 * Math.PI / 300;
var w = 2 * Math.PI;
var amplitude = 200;

(function() {
    let startTime;
    
    const canvas = document.getElementById("testWave");
    const ctx = canvas.getContext("2d");

    function init() {
        startTime = Date.now();
        ctx.translate(0, canvas.height / 2);
        ctx.scale(1, -1);
        window.requestAnimationFrame(drawWave)
    }

    function waveEquation(x, t) {
        return amplitude * Math.cos(k*x - w*t);
    }

    function drawWaveEquation(numOfPoints) {
        func = waveEquation;

        let increment = canvas.width / numOfPoints;
        let currTime = Date.now();
        let t = (currTime - startTime) / 1000;
        ctx.clearRect(0, -canvas.height/2, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(0, func(0, t))
        for (let i = 1; i < numOfPoints; i++) {
            let x = i * increment;
            ctx.lineTo(Math.floor(x), Math.floor(func(x, t)));
        }
        ctx.stroke();
    }

    function drawWave() {
        drawWaveEquation(200);
        //console.log("draw");
        window.requestAnimationFrame(drawWave);
    }
    init();
})();