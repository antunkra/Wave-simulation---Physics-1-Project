const amplitudeSlider = document.getElementById("amplitudeSlider");
const frequencySlider = document.getElementById("frequencySlider");
const wavelengthSlider = document.getElementById("wavelengthSlider")

const amplitudeLabel = document.getElementById("amplitudeValueLabel");
const frequencyLabel = document.getElementById("frequencyValueLabel");
const wavelengthLabel = document.getElementById("wavelengthValueLabel");

amplitudeSlider.oninput = function() {
    amplitudeLabel.innerHTML = this.value + " m";
    window.amplitude = this.value;
}
frequencySlider.oninput = function() {
    frequencyLabel.innerHTML = this.value + " mHz";
    window.w = 2 * Math.PI * this.value / 1000;
}
wavelengthSlider.oninput = function() {
    wavelengthLabel.innerHTML = this.value + " m";
    window.k = 2 * Math.PI / this.value;
}