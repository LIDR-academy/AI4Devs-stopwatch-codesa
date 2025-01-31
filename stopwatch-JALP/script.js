let startTime;
let updatedTime;
let difference = 0;
let timerRunning = false;
let interval;
let countdownMode = false;
let countdownTarget = 8 * 1000; // Default 8 seconds for countdown

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("countdown").addEventListener("click", startCountdown);

function updateDisplay(time) {
    let minutes = Math.floor(time / (60 * 1000));
    let seconds = Math.floor((time % (60 * 1000)) / 1000);
    let milliseconds = Math.floor((time % 1000));

    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
    millisecondsDisplay.textContent = String(milliseconds).padStart(3, "0");
}

function startTimer() {
    if (!timerRunning) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(() => {
            updatedTime = new Date().getTime() - startTime;
            difference = updatedTime;
            updateDisplay(difference);
        }, 10);
        timerRunning = true;
    }
}

function pauseTimer() {
    if (timerRunning) {
        clearInterval(interval);
        timerRunning = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    timerRunning = false;
    difference = 0;
    updateDisplay(0);
}

function startCountdown() {
    resetTimer();
    difference = countdownTarget;
    updateDisplay(difference);

    startTime = new Date().getTime();
    interval = setInterval(() => {
        updatedTime = countdownTarget - (new Date().getTime() - startTime);
        if (updatedTime <= 0) {
            clearInterval(interval);
            updateDisplay(0);
            alert("Countdown finished!");
        } else {
            updateDisplay(updatedTime);
        }
    }, 10);
    timerRunning = true;
}
