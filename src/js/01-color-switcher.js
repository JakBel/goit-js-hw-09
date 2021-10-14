'use strict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const qs = (selector) => document.querySelector(selector);

const startButton = qs("button[data-start]");
const stopButton = qs("button[data-stop]");
const body = qs("body");
let timerId;

startButton.addEventListener("click", () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        console.log(`Start interval ${Math.random()}`);
        startButton.disabled = true;
        stopButton.disabled = false;
    }, 1000);
});

stopButton.addEventListener("click", () => {
    clearInterval(timerId);
    console.log(`Stop interval ${timerId}`);
    startButton.disabled = false;
    stopButton.disabled = true;
});