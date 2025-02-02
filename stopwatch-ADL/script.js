let stopwatchInterval;
let countdownInterval;
let stopwatchRunning = false;
let countdownRunning = false;
let milliseconds = 0;
let countdownTime = 0;
let inputBuffer = '';

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    
    // Reset states when switching screens
    clearInterval(stopwatchInterval);
    clearInterval(countdownInterval);
    stopwatchRunning = false;
    countdownRunning = false;
    resetDisplay();
}

// Time Formatting
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const remainingMs = ms % 1000;

    return {
        main: `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`,
        ms: padNumber(remainingMs, 3)
    };
}

function padNumber(num, length = 2) {
    return num.toString().padStart(length, '0');
}

// Stopwatch Functions
function toggleStopwatch() {
    const button = document.getElementById('stopwatch-start');
    
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        button.textContent = 'Pause';
        button.style.backgroundColor = '#ff0000';
        
        stopwatchInterval = setInterval(() => {
            milliseconds += 10;
            updateDisplay('stopwatch');
        }, 10);
    } else {
        stopwatchRunning = false;
        button.textContent = 'Start';
        button.style.backgroundColor = '#00ff00';
        clearInterval(stopwatchInterval);
    }
}

function clearStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    milliseconds = 0;
    updateDisplay('stopwatch');
    
    const button = document.getElementById('stopwatch-start');
    button.textContent = 'Start';
    button.style.backgroundColor = '#00ff00';
}

// Countdown Functions
function handleNumpadInput(num) {
    if (inputBuffer.length < 6) {
        inputBuffer += num;
        updateCountdownDisplay();
    }
}

function setCountdown() {
    if (inputBuffer) {
        const hours = parseInt(inputBuffer.slice(0, 2)) || 0;
        const minutes = parseInt(inputBuffer.slice(2, 4)) || 0;
        const seconds = parseInt(inputBuffer.slice(4, 6)) || 0;
        
        countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        updateDisplay('countdown');
        inputBuffer = '';
        
        startCountdown();
    }
}

function startCountdown() {
    if (countdownTime > 0 && !countdownRunning) {
        countdownRunning = true;
        countdownInterval = setInterval(() => {
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                countdownRunning = false;
                alert('Countdown finished!');
                return;
            }
            countdownTime -= 10;
            updateDisplay('countdown');
        }, 10);
    }
}

function clearCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTime = 0;
    inputBuffer = '';
    updateDisplay('countdown');
}

// Display Updates
function updateDisplay(type) {
    const time = formatTime(type === 'stopwatch' ? milliseconds : countdownTime);
    document.getElementById(type).textContent = time.main;
    document.getElementById(type).nextElementSibling.textContent = time.ms;
}

function resetDisplay() {
    milliseconds = 0;
    countdownTime = 0;
    inputBuffer = '';
    updateDisplay('stopwatch');
    updateDisplay('countdown');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('stopwatch-start').addEventListener('click', toggleStopwatch);
    document.getElementById('stopwatch-clear').addEventListener('click', clearStopwatch);
    
    document.querySelectorAll('.num-btn').forEach(button => {
        if (button.classList.contains('set-btn')) {
            button.addEventListener('click', setCountdown);
        } else if (button.classList.contains('clear-btn')) {
            button.addEventListener('click', clearCountdown);
        } else {
            button.addEventListener('click', () => handleNumpadInput(button.textContent));
        }
    });
});

function updateCountdownDisplay() {
    let display = inputBuffer.padStart(6, '0');
    const formatted = `${display.slice(0, 2)}:${display.slice(2, 4)}:${display.slice(4, 6)}`;
    document.getElementById('countdown').textContent = formatted;
    document.getElementById('countdown').nextElementSibling.textContent = '000';
}