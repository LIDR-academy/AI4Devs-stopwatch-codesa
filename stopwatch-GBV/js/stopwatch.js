let startTime;
let elapsedTime = 0;
let timerInterval;

function displayTime() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = elapsedTime % 1000;

    document.getElementById('stopwatch').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('milliseconds').textContent = String(milliseconds).padStart(3, '0');
}

function startStop() {
    if (document.getElementById('startStopBtn').textContent === 'Start') {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            displayTime();
        }, 10);
        document.getElementById('startStopBtn').textContent = 'Stop';
    } else if (document.getElementById('startStopBtn').textContent === 'Stop') {
        clearInterval(timerInterval);
        document.getElementById('startStopBtn').textContent = 'Continue';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            displayTime();
        }, 10);
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
}

function clearTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime();
    document.getElementById('startStopBtn').textContent = 'Start';
}

document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('clearBtn').addEventListener('click', clearTimer);