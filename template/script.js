// Variables para el cronómetro
let stopwatchInterval;
let stopwatchTime = 0; // En segundos

// Variables para el temporizador
let timerInterval;
let timerTime = 0; // En segundos

// Función para mostrar la pantalla de cronómetro
function startStopwatchScreen() {
  document.getElementById('selection-screen').classList.add('d-none');
  document.getElementById('stopwatch-screen').classList.remove('d-none');
  resetStopwatch();
}

// Función para mostrar la pantalla de temporizador
function startTimerScreen() {
  document.getElementById('selection-screen').classList.add('d-none');
  document.getElementById('timer-screen').classList.remove('d-none');
  resetTimer();
}

// Función para volver a la pantalla de selección
function goBackToSelection() {
  document.getElementById('stopwatch-screen').classList.add('d-none');
  document.getElementById('timer-screen').classList.add('d-none');
  document.getElementById('selection-screen').classList.remove('d-none');
}

// Función para formatear el tiempo
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function pad(value) {
  return value < 10 ? '0' + value : value;
}

// ------------------------- FUNCIONES CRONÓMETRO -------------------------

// Iniciar cronómetro
function startStopwatch() {
  document.getElementById('start-stopwatch-btn').textContent = 'Pausar';
  document.getElementById('start-stopwatch-btn').setAttribute('onclick', 'pauseStopwatch()');

  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    document.getElementById('stopwatch-time').textContent = formatTime(stopwatchTime);
  }, 1000);
}

// Pausar cronómetro
function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  document.getElementById('start-stopwatch-btn').textContent = 'Reanudar';
  document.getElementById('start-stopwatch-btn').setAttribute('onclick', 'resumeStopwatch()');
}

// Reanudar cronómetro
function resumeStopwatch() {
  startStopwatch();
}

// Detener cronómetro
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  document.getElementById('stopwatch-time').textContent = formatTime(stopwatchTime);
  document.getElementById('start-stopwatch-btn').textContent = 'Iniciar';
  document.getElementById('start-stopwatch-btn').setAttribute('onclick', 'startStopwatch()');
}

// Resetear cronómetro
function resetStopwatch() {
  stopwatchTime = 0;
  document.getElementById('stopwatch-time').textContent = formatTime(stopwatchTime);
  document.getElementById('start-stopwatch-btn').textContent = 'Iniciar';
  document.getElementById('start-stopwatch-btn').setAttribute('onclick', 'startStopwatch()');
}

// ------------------------- FUNCIONES TEMPORIZADOR -------------------------

// Iniciar temporizador
function startTimer() {
  const hours = document.getElementById('hours').value;
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;

  if (hours === '' && minutes === '' && seconds === '') {
    Swal.fire('Error', 'Debe ingresar al menos un valor para horas, minutos o segundos.', 'error');
    return;
  }

  timerTime = (parseInt(hours || 0) * 3600) + (parseInt(minutes || 0) * 60) + (parseInt(seconds || 0));

  document.getElementById('start-timer-btn').textContent = 'Pausar';
  document.getElementById('start-timer-btn').setAttribute('onclick', 'pauseTimer()');

  timerInterval = setInterval(() => {
    if (timerTime > 0) {
      timerTime--;
      document.getElementById('timer-time').textContent = formatTime(timerTime);
    } else {
      clearInterval(timerInterval);
      Swal.fire('¡Tiempo!', 'El temporizador ha finalizado.', 'success');
      resetTimer();
    }
  }, 1000);
}

// Pausar temporizador
function pauseTimer() {
  clearInterval(timerInterval);
  document.getElementById('start-timer-btn').textContent = 'Reanudar';
  document.getElementById('start-timer-btn').setAttribute('onclick', 'resumeTimer()');
}

// Reanudar temporizador
function resumeTimer() {
  startTimer();
}

// Detener temporizador
function stopTimer() {
  clearInterval(timerInterval);
  resetTimer();
}

// Resetear temporizador
function resetTimer() {
  timerTime = 0;
  document.getElementById('timer-time').textContent = formatTime(timerTime);
  document.getElementById('start-timer-btn').textContent = 'Iniciar';
  document.getElementById('start-timer-btn').setAttribute('onclick', 'startTimer()');
}
