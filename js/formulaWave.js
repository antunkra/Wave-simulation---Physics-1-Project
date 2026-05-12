const func = new formulaFunction(waveEquation, window.numOfPoints, 1000);
const formulaGraph = new GraphAnimation(window, "testWave", func);
formulaGraph.animate();

// const canvas = document.getElementById("testWave");
// const ctx = canvas.getContext("2d");

// function init() {
//     //startTime = Date.now();
//     setupCanvas();
//     window.requestAnimationFrame(drawWave)
// }

// function setupCanvas() {
//     ctx.translate(0, canvas.height / 2);
//     ctx.scale(1, -1);
// }

function waveEquation(x, t) {
    return - window.amplitude * Math.sin(window.k*x - window.w*t);
}

// function clearCanvas() {
//     ctx.clearRect(0, -canvas.height/2, canvas.width, canvas.height);
// }

// function drawWaveEquation(numOfPoints) {
//     func = waveEquation;

//     let increment = canvas.width / numOfPoints;
//     let currTime = performance.now();
//     let t = (currTime - window.startTime) / 1000;
//     clearCanvas();

//     ctx.beginPath();
//     ctx.moveTo(0, func(0, t))
//     for (let i = 1; i < numOfPoints; i++) {
//         let x = i * increment;
//         ctx.lineTo(Math.floor(x), Math.floor(func(x, t)));
//     }
//     ctx.stroke();
// }

// function drawWave() {
//     if (window.paused) {
//         window.requestAnimationFrame(drawWave);
//         return;
//     }
//     drawWaveEquation(window.numOfPoints);
//     window.requestAnimationFrame(drawWave);
// }
