document.addEventListener("DOMContentLoaded", function () {
    let mainPanel = document.getElementById("main-panel");
    let cronometroPanel = document.getElementById("cronometro-panel");
    let countdownPanel = document.getElementById("countdown-panel");

    let btnCronometro = document.getElementById("btn-cronometro");
    let btnCountdown = document.getElementById("btn-countdown");
    let backCronometro = document.getElementById("back-cronometro");
    let backCountdown = document.getElementById("back-countdown");

    let display = document.getElementById("display");
    let displayCountdown = document.getElementById("display-countdown");

    let startCronometro = document.getElementById("start-cronometro");
    let clearCronometro = document.getElementById("clear-cronometro");

    let numberButtons = document.querySelectorAll(".num");
    let setCountdown = document.getElementById("set-countdown");
    let clearCountdown = document.getElementById("clear-countdown");
    let countdownControls = document.getElementById("countdown-controls");
    let startCountdown = document.getElementById("start-countdown");
    let clearTimer = document.getElementById("clear-timer");

    let interval, countdownTime = 0, cronometroRunning = false, countdownRunning = false;

    // Mostrar/Ocultar paneles
    btnCronometro.addEventListener("click", function () {
        mainPanel.classList.add("hidden");
        cronometroPanel.classList.remove("hidden");
    });

    btnCountdown.addEventListener("click", function () {
        mainPanel.classList.add("hidden");
        countdownPanel.classList.remove("hidden");
    });

    backCronometro.addEventListener("click", function () {
        cronometroPanel.classList.add("hidden");
        mainPanel.classList.remove("hidden");
    });

    backCountdown.addEventListener("click", function () {
        countdownPanel.classList.add("hidden");
        mainPanel.classList.remove("hidden");
    });

    // Cronómetro
    let ms = 0, sec = 0, min = 0, hr = 0;

    function updateDisplay() {
        display.innerText = `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
    }

    startCronometro.addEventListener("click", function () {
        if (!cronometroRunning) {
            cronometroRunning = true;
            interval = setInterval(function () {
                ms += 10;
                if (ms >= 1000) { ms = 0; sec++; }
                if (sec >= 60) { sec = 0; min++; }
                if (min >= 60) { min = 0; hr++; }
                updateDisplay();
            }, 10);
        }
    });

    clearCronometro.addEventListener("click", function () {
        clearInterval(interval);
        ms = sec = min = hr = 0;
        updateDisplay();
        cronometroRunning = false;
    });

    // Temporizador
    let countdownInput = "";

    numberButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (countdownInput.length < 8) {
                countdownInput += this.innerText;
                displayCountdown.innerText = countdownInput.padStart(8, '0').replace(/(\d{2})(\d{2})(\d{2})(\d{3})/, "$1:$2:$3:$4");
            }
        });
    });

    setCountdown.addEventListener("click", function () {
        countdownTime = parseInt(countdownInput);
        if (!isNaN(countdownTime)) {
            countdownControls.classList.remove("hidden");
            numberButtons.forEach(btn => btn.disabled = true);
        }
    });

    startCountdown.addEventListener("click", function () {
        if (!countdownRunning && countdownTime > 0) {
            countdownRunning = true;
            interval = setInterval(function () {
                countdownTime--;
                if (countdownTime <= 0) {
                    clearInterval(interval);
                    countdownRunning = false;
                }
                displayCountdown.innerText = countdownTime.toString().padStart(8, '0').replace(/(\d{2})(\d{2})(\d{2})(\d{3})/, "$1:$2:$3:$4");
            }, 10);
        }
    });

    clearTimer.addEventListener("click", function () {
        clearInterval(interval);
        countdownRunning = false;
        displayCountdown.innerText = countdownInput;
    });

    clearCountdown.addEventListener("click", function () {
        countdownInput = "";
        displayCountdown.innerText = "00:00:00:000";
        countdownControls.classList.add("hidden");
        numberButtons.forEach(btn => btn.disabled = false);
    });
});
