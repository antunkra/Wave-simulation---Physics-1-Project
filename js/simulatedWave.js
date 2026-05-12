const canvas = document.getElementById("forcedWave");
const ctx = canvas.getContext("2d");

const simulatedFunction = new SimulatedFunction((x, t) => window.amplitude * Math.sin(window.w * t), window.springConstant, window.numOfPoints, canvas.width);
const simulationGraph = new GraphAnimation(window, "forcedWave", simulatedFunction);
simulationGraph.animate();