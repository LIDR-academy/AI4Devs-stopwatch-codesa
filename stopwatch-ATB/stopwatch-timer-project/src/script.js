let stopwatchInterval;
let countdownInterval;
let stopwatchTime = 0; // in seconds
let countdownTime = 0; // in seconds

// Start the stopwatch
function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 1000);
    }
}

// Stop the stopwatch
function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

// Reset the stopwatch
function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

// Update the stopwatch display
function updateStopwatchDisplay() {
    const display = document.getElementById('stopwatch-display');
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start the countdown timer
function startCountdown() {
    const hours = parseInt(document.getElementById('countdown-hours').value, 10) || 0;
    const minutes = parseInt(document.getElementById('countdown-minutes').value, 10) || 0;
    const seconds = parseInt(document.getElementById('countdown-seconds').value, 10) || 0;
    countdownTime = (hours * 3600) + (minutes * 60) + seconds;

    if (!countdownInterval && countdownTime > 0) {
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                updateCountdownDisplay();
            } else {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }, 1000);
    }
}

// Stop the countdown timer
function stopCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}

// Reset the countdown timer
function resetCountdown() {
    stopCountdown();
    countdownTime = 0;
    updateCountdownDisplay();
    resetCountdownInputs();
}

// Update the countdown display
function updateCountdownDisplay() {
    const display = document.getElementById('countdown-display');
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Reset the countdown inputs
function resetCountdownInputs() {
    document.getElementById('countdown-hours').value = '';
    document.getElementById('countdown-minutes').value = '';
    document.getElementById('countdown-seconds').value = '';
}

// Event listeners for buttons
document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
document.getElementById('stop-stopwatch').addEventListener('click', stopStopwatch);
document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);

document.getElementById('start-countdown').addEventListener('click', startCountdown);
document.getElementById('stop-countdown').addEventListener('click', stopCountdown);
document.getElementById('reset-countdown').addEventListener('click', resetCountdown);