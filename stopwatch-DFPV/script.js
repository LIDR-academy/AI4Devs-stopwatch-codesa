let timer;
let running = false;
let time = 0;
let startTime = 0;
let countdown = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");
const normalMode = document.getElementById("normalMode");
const countdownMode = document.getElementById("countdownMode");
const timeInputs = document.querySelector(".time-inputs");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");

// Cambia entre Modo Normal y Cuenta Regresiva
document.querySelectorAll("input[name='mode']").forEach(mode => {
    mode.addEventListener("change", () => {
        countdown = countdownMode.checked;
        timeInputs.style.display = countdown ? "block" : "none";
        clearTimer();
    });
});

startBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(timer);
        startBtn.textContent = "Start";
    } else {
        if (countdown) {
            let h = parseInt(hoursInput.value) || 0;
            let m = parseInt(minutesInput.value) || 0;
            let s = parseInt(secondsInput.value) || 0;
            startTime = (h * 3600 + m * 60 + s) * 1000;
            time = startTime;
        } else {
            startTime = Date.now() - time;
        }
        startTimer();
        startBtn.textContent = "Pause";
    }
    running = !running;
});

clearBtn.addEventListener("click", clearTimer);

function startTimer() {
    timer = setInterval(() => {
        if (countdown) {
            time -= 10;
            if (time <= 0) {
                clearTimer();
                return;
            }
        } else {
            time = Date.now() - startTime;
        }
        updateDisplay();
    }, 10);
}

function updateDisplay() {
    let ms = time % 1000;
    let sec = Math.floor(time / 1000) % 60;
    let min = Math.floor(time / (1000 * 60)) % 60;
    let hr = Math.floor(time / (1000 * 60 * 60));

    display.textContent = `${formatTime(hr)}:${formatTime(min)}:${formatTime(sec)}:${formatMilliseconds(ms)}`;
}

function clearTimer() {
    clearInterval(timer);
    running = false;
    time = 0;
    display.textContent = "00:00:00:000";
    startBtn.textContent = "Start";
}

function formatTime(value) {
    return value.toString().padStart(2, "0");
}

function formatMilliseconds(value) {
    return value.toString().padStart(3, "0");
}
