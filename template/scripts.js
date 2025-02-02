document.addEventListener("DOMContentLoaded", () => {
    const mainScreen = document.getElementById("main-screen");
    const stopwatchScreen = document.getElementById("stopwatch-screen");
    const countdownScreen = document.getElementById("countdown-screen");
  
    const stopwatchButton = document.getElementById("stopwatch-button");
    const countdownButton = document.getElementById("countdown-button");
  
    const backToMain1 = document.getElementById("back-to-main-1");
    const backToMain2 = document.getElementById("back-to-main-2");
  
    // Stopwatch functionality
    let stopwatchInterval;
    let stopwatchTime = 0;
    const stopwatchTimeField = document.getElementById("stopwatch-time");
    const startPauseResumeButton = document.getElementById("start-pause-resume");
    const resetStopwatchButton = document.getElementById("reset-stopwatch");
  
    let stopwatchRunning = false;
  
    const formatTime = (ms) => {
      const date = new Date(ms);
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");
      const milliseconds = String(ms % 1000).padStart(3, "0");
      return `${hours}:${minutes}:${seconds}.<span class="milliseconds">${milliseconds}</span>`;
    };
  
    stopwatchButton.addEventListener("click", () => {
      mainScreen.classList.add("hidden");
      stopwatchScreen.classList.remove("hidden");
      clearInterval(stopwatchInterval);
      stopwatchTime = 0;
      stopwatchTimeField.innerHTML = formatTime(stopwatchTime);
      startPauseResumeButton.textContent = "Comenzar";
      stopwatchRunning = false;
    });
  
    startPauseResumeButton.addEventListener("click", () => {
      if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        startPauseResumeButton.textContent = "Continuar";
      } else {
        startPauseResumeButton.textContent = "Pausar";
        stopwatchInterval = setInterval(() => {
          stopwatchTime += 10;
          stopwatchTimeField.innerHTML = formatTime(stopwatchTime);
        }, 10);
      }
      stopwatchRunning = !stopwatchRunning;
    });
  
    resetStopwatchButton.addEventListener("click", () => {
      clearInterval(stopwatchInterval);
      stopwatchTime = 0;
      stopwatchTimeField.innerHTML = formatTime(stopwatchTime);
      startPauseResumeButton.textContent = "Comenzar";
      stopwatchRunning = false;
    });
  
    // Countdown functionality
    let countdownTime = 0;
    const countdownTimeField = document.getElementById("countdown-time");
    const numberButtons = document.querySelectorAll(".number");
    const defineTimeButton = document.getElementById("define-time");
    const clearTimeButton = document.getElementById("clear-time");
    const redefineTimeButton = document.getElementById("redefine-time");
    const startPauseCountdownButton = document.getElementById(
      "start-pause-countdown"
    );
  
    numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        countdownTime = countdownTime * 10 + parseInt(button.textContent, 10);
        countdownTimeField.innerHTML = formatTime(countdownTime);
      });
    });
  
    clearTimeButton.addEventListener("click", () => {
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
    });
  
    // Navigation
    countdownButton.addEventListener("click", () => {
      mainScreen.classList.add("hidden");
      countdownScreen.classList.remove("hidden");
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
    });
  
    backToMain1.addEventListener("click", () => {
      stopwatchScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
    });
  
    backToMain2.addEventListener("click", () => {
      countdownScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
    });
  });
  


  document.addEventListener("DOMContentLoaded", () => {
    const mainScreen = document.getElementById("main-screen");
    const stopwatchScreen = document.getElementById("stopwatch-screen");
    const countdownScreen = document.getElementById("countdown-screen");
  
    const stopwatchButton = document.getElementById("stopwatch-button");
    const countdownButton = document.getElementById("countdown-button");
  
    const backToMain1 = document.getElementById("back-to-main-1");
    const backToMain2 = document.getElementById("back-to-main-2");
  
    // Variables para la pantalla de Cuenta Regresiva
    let countdownTime = 0;
    const maxTime = 359999999; // Máximo permitido (99:59:59.999 en milisegundos)
    const countdownTimeField = document.getElementById("countdown-time");
    const numberButtons = document.querySelectorAll(".number");
    const defineTimeButton = document.getElementById("define-time");
    const clearTimeButton = document.getElementById("clear-time");
    const redefineTimeButton = document.getElementById("redefine-time");
    const startPauseCountdownButton = document.getElementById(
      "start-pause-countdown"
    );
  
    const numberButtonsContainer = document.getElementById("number-buttons");
  
    // Formatear tiempo en el campo
    const formatTime = (ms) => {
      const date = new Date(ms);
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");
      const milliseconds = String(ms % 1000).padStart(3, "0");
      return `${hours}:${minutes}:${seconds}.<span class="milliseconds">${milliseconds}</span>`;
    };
  
    countdownButton.addEventListener("click", () => {
      mainScreen.classList.add("hidden");
      countdownScreen.classList.remove("hidden");
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
      numberButtonsContainer.classList.remove("hidden");
      defineTimeButton.classList.remove("hidden");
      clearTimeButton.classList.remove("hidden");
      redefineTimeButton.classList.add("hidden");
      startPauseCountdownButton.classList.add("hidden");
    });
  
    // Agregar dígitos al campo de tiempo
    numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (countdownTime < maxTime) {
          countdownTime = countdownTime * 10 + parseInt(button.textContent, 10);
          if (countdownTime > maxTime) {
            countdownTime = maxTime;
          }
          countdownTimeField.innerHTML = formatTime(countdownTime);
        }
      });
    });
  
    // Limpiar el campo de tiempo
    clearTimeButton.addEventListener("click", () => {
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
    });
  
    // Definir tiempo y ocultar los botones numéricos
    defineTimeButton.addEventListener("click", () => {
      numberButtonsContainer.classList.add("hidden");
      defineTimeButton.classList.add("hidden");
      clearTimeButton.classList.add("hidden");
      redefineTimeButton.classList.remove("hidden");
      startPauseCountdownButton.classList.remove("hidden");
    });
  
    // Volver a redefinir el tiempo
    redefineTimeButton.addEventListener("click", () => {
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
      numberButtonsContainer.classList.remove("hidden");
      defineTimeButton.classList.remove("hidden");
      clearTimeButton.classList.remove("hidden");
      redefineTimeButton.classList.add("hidden");
      startPauseCountdownButton.classList.add("hidden");
    });
  
    backToMain2.addEventListener("click", () => {
      countdownScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
    });
  });
  




  document.addEventListener("DOMContentLoaded", () => {
    const mainScreen = document.getElementById("main-screen");
    const countdownScreen = document.getElementById("countdown-screen");
  
    const countdownButton = document.getElementById("countdown-button");
    const backToMain2 = document.getElementById("back-to-main-2");
  
    // Variables para la pantalla de Cuenta Regresiva
    let countdownTime = 0;
    const maxTime = 359999999; // Máximo permitido (99:59:59.999 en milisegundos)
    let countdownInterval = null;
  
    const countdownTimeField = document.getElementById("countdown-time");
    const numberButtons = document.querySelectorAll(".number");
    const defineTimeButton = document.getElementById("define-time");
    const clearTimeButton = document.getElementById("clear-time");
    const redefineTimeButton = document.getElementById("redefine-time");
    const startPauseCountdownButton = document.getElementById(
      "start-pause-countdown"
    );
  
    const numberButtonsContainer = document.getElementById("number-buttons");
  
    // Formatear tiempo en el campo
    const formatTime = (ms) => {
      const date = new Date(ms);
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");
      const milliseconds = String(ms % 1000).padStart(3, "0");
      return `${hours}:${minutes}:${seconds}.<span class="milliseconds">${milliseconds}</span>`;
    };
  
    countdownButton.addEventListener("click", () => {
      mainScreen.classList.add("hidden");
      countdownScreen.classList.remove("hidden");
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
      numberButtonsContainer.classList.remove("hidden");
      defineTimeButton.classList.remove("hidden");
      clearTimeButton.classList.remove("hidden");
      redefineTimeButton.classList.add("hidden");
      startPauseCountdownButton.classList.add("hidden");
    });
  
    // Agregar dígitos al campo de tiempo
    numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (countdownTime < maxTime) {
          countdownTime = countdownTime * 10 + parseInt(button.textContent, 10);
          if (countdownTime > maxTime) {
            countdownTime = maxTime;
          }
          countdownTimeField.innerHTML = formatTime(countdownTime);
        }
      });
    });
  
    // Limpiar el campo de tiempo
    clearTimeButton.addEventListener("click", () => {
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
    });
  
    // Definir tiempo y ocultar los botones numéricos
    defineTimeButton.addEventListener("click", () => {
      numberButtonsContainer.classList.add("hidden");
      defineTimeButton.classList.add("hidden");
      clearTimeButton.classList.add("hidden");
      redefineTimeButton.classList.remove("hidden");
      startPauseCountdownButton.classList.remove("hidden");
    });
  
    // Iniciar/pausar la cuenta regresiva
    startPauseCountdownButton.addEventListener("click", () => {
      if (countdownInterval) {
        // Pausar cuenta regresiva
        clearInterval(countdownInterval);
        countdownInterval = null;
        startPauseCountdownButton.textContent = "Continuar";
      } else {
        // Iniciar cuenta regresiva
        startPauseCountdownButton.textContent = "Pausar";
        countdownInterval = setInterval(() => {
          if (countdownTime > 0) {
            countdownTime -= 10; // Reducir cada 10ms
            countdownTimeField.innerHTML = formatTime(countdownTime);
          } else {
            clearInterval(countdownInterval);
            countdownInterval = null;
            alert("¡Tiempo terminado!");
            const audio = new Audio("Alarm01.wav"); // Ruta a un sonido de alarma
            audio.play();
            startPauseCountdownButton.textContent = "Comenzar";
          }
        }, 10);
      }
    });
  
    // Volver a redefinir el tiempo
    redefineTimeButton.addEventListener("click", () => {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownTime = 0;
      countdownTimeField.innerHTML = formatTime(countdownTime);
      numberButtonsContainer.classList.remove("hidden");
      defineTimeButton.classList.remove("hidden");
      clearTimeButton.classList.remove("hidden");
      redefineTimeButton.classList.add("hidden");
      startPauseCountdownButton.classList.add("hidden");
      startPauseCountdownButton.textContent = "Comenzar";
    });
  
    backToMain2.addEventListener("click", () => {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
    });
  });