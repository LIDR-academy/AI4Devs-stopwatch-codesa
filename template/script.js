// Variables para el cronómetro
let stopwatchInterval;
let stopwatchSeconds = 0;
let stopwatchMilliseconds = 0;
let stopwatchRunning = false;

const startStopwatchButton = document.getElementById('startStopwatch');
const resetStopwatchButton = document.getElementById('resetStopwatch');
const timerDisplay = document.getElementById('timer');

// Función para iniciar el cronómetro
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        startStopwatchButton.textContent = 'Detener Cronómetro';
        stopwatchInterval = setInterval(function () {
            stopwatchMilliseconds++;
            if (stopwatchMilliseconds >= 100) {
                stopwatchMilliseconds = 0;
                stopwatchSeconds++;
            }

            let minutes = Math.floor(stopwatchSeconds / 60);
            let seconds = stopwatchSeconds % 60;
            timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(stopwatchMilliseconds)}`;
        }, 10); // 10 ms para mostrar milisegundos
    } else {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        startStopwatchButton.textContent = 'Iniciar Cronómetro';
    }
}

// Función para reiniciar el cronómetro
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    stopwatchMilliseconds = 0;
    stopwatchRunning = false;
    startStopwatchButton.textContent = 'Iniciar Cronómetro';
    timerDisplay.textContent = '00:00:00';
}

// Función para formatear los minutos y segundos
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Función para formatear los milisegundos
function formatMilliseconds(ms) {
    return ms < 10 ? '0' + ms : ms;
}

// Event listeners para los botones del cronómetro
startStopwatchButton.addEventListener('click', startStopwatch);
resetStopwatchButton.addEventListener('click', resetStopwatch);

// Variables para la cuenta atrás
let countdownInterval;
let countdownTime = 30; // 30 segundos de cuenta atrás
let countdownMilliseconds = 0;
let countdownRunning = false;

const startCountdownButton = document.getElementById('startCountdown');
const resetCountdownButton = document.getElementById('resetCountdown');
const countdownTimerDisplay = document.getElementById('countdownTimer');

// Función para iniciar la cuenta atrás
function startCountdown() {
    if (!countdownRunning) {
        countdownRunning = true;
        startCountdownButton.textContent = 'Pausar Cuenta Atrás';
        countdownInterval = setInterval(function () {
            if (countdownMilliseconds > 0) {
                countdownMilliseconds--;
            } else if (countdownTime > 0) {
                countdownMilliseconds = 99;
                countdownTime--;
            }

            let minutes = Math.floor(countdownTime / 60);
            let seconds = countdownTime % 60;
            countdownTimerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(countdownMilliseconds)}`;

            if (countdownTime === 0 && countdownMilliseconds === 0) {
                clearInterval(countdownInterval);
                countdownRunning = false;
                startCountdownButton.textContent = 'Iniciar Cuenta Atrás';
            }
        }, 10); // 10 ms para mostrar milisegundos
    } else {
        clearInterval(countdownInterval);
        countdownRunning = false;
        startCountdownButton.textContent = 'Iniciar Cuenta Atrás';
    }
}

// Función para reiniciar la cuenta atrás
function resetCountdown() {
    clearInterval(countdownInterval);
    countdownTime = 30; // Reestablecer a 30 segundos
    countdownMilliseconds = 0;
    countdownRunning = false;
    startCountdownButton.textContent = 'Iniciar Cuenta Atrás';
    countdownTimerDisplay.textContent = '00:30:00';
}

// Event listeners para los botones de la cuenta atrás
startCountdownButton.addEventListener('click', startCountdown);
resetCountdownButton.addEventListener('click', resetCountdown);
