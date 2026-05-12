window.startTime = performance.now();
window.numOfPoints = 200;
window.k = 2 * Math.PI / 300;
window.w = 2 * Math.PI;
window.amplitude = 200;
window.frequency = 1;
window.waveLength = 300;
const dx = 1000 / window.numOfPoints;
let velocity = window.w / window.k;
window.springConstant = Math.pow(velocity, 2) / dx;
window.endFixed = true;

const amplitudeSlider = document.getElementById("amplitudeSlider");
const frequencySlider = document.getElementById("frequencySlider");
const wavelengthSlider = document.getElementById("wavelengthSlider")

const amplitudeLabel = document.getElementById("amplitudeValueLabel");
const frequencyLabel = document.getElementById("frequencyValueLabel");
const wavelengthLabel = document.getElementById("wavelengthValueLabel");

const stopButton = document.getElementById("stopButton");
const endSwapButton = document.getElementById("endSwapButton");

function updateSpringConstant() {
    velocity = window.w / window.k;
    window.springConstant = Math.pow(velocity, 2) / dx;
}

stopButton.onclick = function() {
    if (stopButton.innerHTML === "Stop") {
        stopButton.innerHTML = "Restart";
        window.paused = true;
        testWaveGraph.paused = true;
    }
    else {
        stopButton.innerHTML = "Stop";
        window.paused = false;
        testWaveGraph.paused = false;
        testWaveGraph.reset();
        window.startTime = performance.now();
    }
}
endSwapButton.onclick = function() {
    window.endFixed = !window.endFixed;
    endSwapButton.innerHTML = window.endFixed ? "Free end" : "Fixed end";
}
amplitudeSlider.oninput = function() {
    amplitudeLabel.innerHTML = this.value + " px";
    window.amplitude = this.value;
}
frequencySlider.oninput = function() {
    frequencyLabel.innerHTML = this.value + " mHz";
    window.frequency = this.value / 1000;
    window.w = 2 * Math.PI * this.value / 1000;
    updateSpringConstant();
}
wavelengthSlider.oninput = function() {
    wavelengthLabel.innerHTML = this.value + " px";
    window.waveLength = this.value;
    window.k = 2 * Math.PI / this.value;
    updateSpringConstant();
}