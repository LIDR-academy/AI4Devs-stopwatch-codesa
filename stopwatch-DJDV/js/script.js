let timer;
let time = 0; // Tiempo en segundos
let running = false;

// Selección de elementos del DOM
const display = document.querySelector("#chronometer h2");
const timeInput = document.querySelector("#timeInput");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const clearBtn = document.getElementById("clearBtn");

// Actualización del cronómetro en pantalla
function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Lógica para iniciar el cronómetro
startBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        const inputTime = parseInt(timeInput.value);
        time = inputTime > 0 ? inputTime : 0;
        updateDisplay();
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(timer);
                running = false;
            }
        }, 1000);
    }
});

// Lógica para pausar el cronómetro
pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
});

// Lógica para limpiar el cronómetro
clearBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    time = 0;
    updateDisplay();
});

// Inicializa el display
updateDisplay();
