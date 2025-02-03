let stopwatchInterval;
let stopwatchTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeStopwatchEvents();
});

function initializeStopwatchEvents() {
    // Botones de Stopwatch
    document.getElementById('stopwatchStart')?.addEventListener('click', startStopwatch);
    document.getElementById('stopwatchPause')?.addEventListener('click', pauseStopwatch);
    document.getElementById('stopwatchContinue')?.addEventListener('click', continueStopwatch);
    document.getElementById('stopwatchClear')?.addEventListener('click', clearStopwatch);
}

function startStopwatch() {
    // Ocultar botón de inicio y mostrar botón de pausa
    document.getElementById('stopwatchStart').style.display = 'none';
    document.getElementById('stopwatchPause').style.display = 'inline-block';
    document.getElementById('stopwatchContinue').style.display = 'none';
    
    // Iniciar el contador
    stopwatchInterval = setInterval(() => {
        stopwatchTime += 10;
        updateStopwatchDisplay();
    }, 10);
}

function pauseStopwatch() {
    // Detener el contador
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    
    // Actualizar visibilidad de botones
    document.getElementById('stopwatchPause').style.display = 'none';
    document.getElementById('stopwatchContinue').style.display = 'inline-block';
}

function continueStopwatch() {
    // Ocultar botón continuar y mostrar botón pausa
    document.getElementById('stopwatchContinue').style.display = 'none';
    document.getElementById('stopwatchPause').style.display = 'inline-block';
    
    // Reiniciar el contador desde el último valor
    stopwatchInterval = setInterval(() => {
        stopwatchTime += 10;
        updateStopwatchDisplay();
    }, 10);
}

function clearStopwatch() {
    // Detener el contador si está activo
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
    
    // Reiniciar el tiempo a cero
    stopwatchTime = 0;
    
    // Actualizar el display
    document.getElementById('stopwatchTime').textContent = '00:00:00';
    document.querySelector('#stopwatchPanel .milliseconds').textContent = '.000';
    
    // Resetear los botones a su estado inicial
    document.getElementById('stopwatchStart').style.display = 'inline-block';
    document.getElementById('stopwatchPause').style.display = 'none';
    document.getElementById('stopwatchContinue').style.display = 'none';
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    clearStopwatch();
}

function updateStopwatchDisplay() {
    const time = formatTime(stopwatchTime);
    document.getElementById('stopwatchTime').textContent = `${time.hours}:${time.minutes}:${time.seconds}`;
    document.querySelector('#stopwatchPanel .milliseconds').textContent = `.${time.milliseconds}`;
}