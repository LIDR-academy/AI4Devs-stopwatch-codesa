document.addEventListener("DOMContentLoaded", () => {
    const mainMenu = document.getElementById("main-menu");
    const cronometroSection = document.getElementById("cronometro");
    const countdownSection = document.getElementById("countdown");

    document.getElementById("btn-cronometro").addEventListener("click", () => {
        mainMenu.classList.add("hidden");
        cronometroSection.classList.remove("hidden");
    });

    document.getElementById("btn-countdown").addEventListener("click", () => {
        mainMenu.classList.add("hidden");
        countdownSection.classList.remove("hidden");
    });

    document.querySelectorAll(".back-button").forEach(button => {
        button.addEventListener("click", () => {
            mainMenu.classList.remove("hidden");
            cronometroSection.classList.add("hidden");
            countdownSection.classList.add("hidden");
        });
    });

    // Cronómetro
    let cronometroInterval;
    let cronometroTime = 0;
    let runningCronometro = false;

    const cronometroDisplay = document.getElementById("cronometro-display");
    document.getElementById("start-cronometro").addEventListener("click", () => {
        if (!runningCronometro) {
            runningCronometro = true;
            cronometroInterval = setInterval(() => {
                cronometroTime++;
                cronometroDisplay.textContent = formatTime(cronometroTime);
            }, 1000);
        } else {
            clearInterval(cronometroInterval);
            runningCronometro = false;
        }
    });

    document.getElementById("reset-cronometro").addEventListener("click", () => {
        clearInterval(cronometroInterval);
        cronometroTime = 0;
        cronometroDisplay.textContent = "00:00:00";
        runningCronometro = false;
    });

    // Countdown
    let countdownTime = 0;
    let countdownInterval;
    const countdownDisplay = document.getElementById("countdown-display");

    document.querySelectorAll(".num-btn").forEach(button => {
        button.addEventListener("click", () => {
            let num = button.textContent;
            let timeStr = countdownDisplay.textContent.replace(/:/g, "") + num;
            timeStr = timeStr.slice(-6);
            countdownDisplay.textContent = formatTime(parseInt(timeStr, 10));
        });
    });

    document.getElementById("start-countdown").addEventListener("click", () => {
        const timeParts = countdownDisplay.textContent.split(":");
        countdownTime =
            parseInt(timeParts[0]) * 3600 + // Horas a segundos
            parseInt(timeParts[1]) * 60 +   // Minutos a segundos
            parseInt(timeParts[2]);         // Segundos
    
        if (countdownTime > 0) {
            clearInterval(countdownInterval);
            countdownInterval = setInterval(() => {
                if (countdownTime > 0) {
                    countdownTime--;
                    countdownDisplay.textContent = formatTime(countdownTime);
                } else {
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }
    });

    document.getElementById("reset-countdown").addEventListener("click", () => {
        clearInterval(countdownInterval);
        countdownTime = 0;
        countdownDisplay.textContent = "00:00:00";
    });

    function formatTime(num) {
        let str = num.toString().padStart(6, "0");
        return `${str.slice(0, 2)}:${str.slice(2, 4)}:${str.slice(4, 6)}`;
    }
});
