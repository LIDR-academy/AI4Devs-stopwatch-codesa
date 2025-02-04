let countdownTime = 0; // Tiempo en segundos
let countdownInterval;

// Función para agregar dígitos al tiempo
function addDigit(digit) {
    countdownTime = countdownTime * 10 + digit;
    updateDisplay();
}

// Función para actualizar la visualización del tiempo
function updateDisplay() {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;
    document.getElementById('countdownDisplay').textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Función para iniciar el conteo regresivo
function startCountdown() {
    if (countdownTime > 0) {
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                updateCountdownDisplay();
            } else {
                clearInterval(countdownInterval);
                document.getElementById('countdownTimer').style.backgroundColor = 'red';
                new Audio('assets/beep.mp3').play(); // Sonido de finalización
            }
        }, 1000);
    }
}

// Función para actualizar la visualización del conteo regresivo
function updateCountdownDisplay() {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;
    document.getElementById('countdownTimer').textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Función para reiniciar el contador
function resetCountdown() {
    clearInterval(countdownInterval);
    countdownTime = 0;
    updateDisplay();
    document.getElementById('countdownTimer').style.backgroundColor = '';
    document.getElementById('initialPanel').style.display = 'block';
    document.getElementById('countdownPanel').style.display = 'none';
}

// Eventos
document.getElementById('setBtn').addEventListener('click', () => {
    if (countdownTime > 0) {
        document.getElementById('initialPanel').style.display = 'none';
        document.getElementById('countdownPanel').style.display = 'block';
        updateCountdownDisplay();
    }
});

document.getElementById('clearBtn').addEventListener('click', () => {
    countdownTime = 0;
    updateDisplay();
});

document.getElementById('startBtn').addEventListener('click', startCountdown);
document.getElementById('resetBtn').addEventListener('click', resetCountdown);