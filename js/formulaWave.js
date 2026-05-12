const func = new formulaFunction(waveEquation, window.numOfPoints, 1000);
const formulaGraph = new GraphAnimation(window, "testWave", func);
formulaGraph.animate();

function waveEquation(x, t) {
    return - window.amplitude * Math.sin(window.k*x - window.w*t);
}