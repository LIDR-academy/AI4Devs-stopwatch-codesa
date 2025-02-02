// Configuración de idiomas
const translations = {
    es: {
        title: 'Cronómetro',
        stopwatch: 'Conteo progresivo',
        countdown: 'Conteo regresivo',
        start: 'Iniciar',
        pause: 'Pausar',
        continue: 'Continuar',
        clear: 'Limpiar',
        save: 'Guardar',
        edit: 'Editar',
        return: 'Regresar'
    },
    en: {
        title: 'Stopwatch',
        stopwatch: 'Progressive count',
        countdown: 'Regressive count',
        start: 'Start',
        pause: 'Pause',
        continue: 'Continue',
        clear: 'Clear',
        save: 'Save',
        edit: 'Edit',
        return: 'Return'
    }
};

// Variables globales
let currentLanguage = 'es';
let stopwatchInterval;
let countdownInterval;
let stopwatchTime = 0;
let countdownTime = 0;
let formattedTime = 0;
let inputBuffer = '';

// Event Listeners - Se ejecutan cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeButtons();
});

function initializeEventListeners() {
    // Botones de Stopwatch
    document.getElementById('stopwatchStart')?.addEventListener('click', startStopwatch);
    document.getElementById('stopwatchPause')?.addEventListener('click', pauseStopwatch);
    document.getElementById('stopwatchContinue')?.addEventListener('click', continueStopwatch);
    document.getElementById('stopwatchClear')?.addEventListener('click', clearStopwatch);

    // Botones de Countdown
    document.getElementById('countdownStart')?.addEventListener('click', startCountdown);
    document.getElementById('countdownPause')?.addEventListener('click', pauseCountdown);
    document.getElementById('countdownContinue')?.addEventListener('click', continueCountdown);
    document.getElementById('countdownClear')?.addEventListener('click', clearCountdown);
    document.getElementById('countdownEdit')?.addEventListener('click', () => showPanel('countdownInputPanel'));
    document.getElementById('countdownSave')?.addEventListener('click', saveCountdown);
	document.getElementById('countdownInputClear')?.addEventListener('click', clearCountdownInput);

    // Selector de idioma
    document.getElementById('languageSelect')?.addEventListener('change', (e) => changeLanguage(e.target.value));

    // Inicializar los mode-cards con sus event listeners
    const stopwatchCard = document.querySelector('.mode-card:first-child');
    const countdownCard = document.querySelector('.mode-card:last-child');
    
    if (stopwatchCard) {
        stopwatchCard.addEventListener('click', () => showPanel('stopwatchPanel'));
    }
    
    if (countdownCard) {
        countdownCard.addEventListener('click', () => showPanel('countdownInputPanel'));
    }
	
	// Actualizar los event listeners de los botones de retorno
    document.querySelectorAll('.return-btn').forEach(button => {
        button.addEventListener('click', handleReturn);
    });
}

function initializeButtons() {
    // Configurar botones de retorno
    const returnButtons = document.querySelectorAll('.btn-secondary[onclick="showModeSelection()"]');
    returnButtons.forEach(button => {
        button.addEventListener('click', showModeSelection);
    });
}

// Funciones de gestión de paneles
function showPanel(panelId) {
    // Ocultar todos los paneles
    const panels = [
        'modeSelection',
        'stopwatchPanel',
        'countdownInputPanel',
        'countdownPanel'
    ];
    
    panels.forEach(id => {
        const panel = document.getElementById(id);
        if (panel) {
            panel.classList.add('hidden');
        }
    });

    // Mostrar el panel seleccionado
    const selectedPanel = document.getElementById(panelId);
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }
}

function showModeSelection() {
    stopStopwatch();
    stopCountdown();
    showPanel('modeSelection');
}

// Funciones del Stopwatch
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

// Funciones del Countdown
// Función para añadir números al cronómetro
function addNumber(num) {
    if (inputBuffer.length < 6) {  // Limitamos a 6 dígitos (HHMMSS)
        inputBuffer = inputBuffer + num;
        updateCountdownInputDisplay();
    }
}

// Función para actualizar el display del input
function updateCountdownInputDisplay() {
    // Rellenar con ceros a la izquierda hasta tener 6 dígitos
    const fullNumber = inputBuffer.padStart(6, '0');
    
    // Separar los dígitos en grupos
    const hours = fullNumber.slice(0, 2);
    const minutes = fullNumber.slice(2, 4);
    const seconds = fullNumber.slice(4, 6);
    
    // Actualizar el display
    document.getElementById('countdownInput').textContent = `${hours}:${minutes}:${seconds}`;
	
    document.querySelector('#countdownInputPanel .milliseconds').textContent = '.000';
}

function updateCountdownInput() {
	console.log(formattedTime);
    let display = inputBuffer.padStart(6, '0');
    const hours = display.slice(0, 2);
    const minutes = display.slice(2, 4);
    const seconds = display.slice(4, 6);
	
    //document.getElementById('countdownInput').textContent = `${hours}:${minutes}:${seconds}`;
	document.getElementById('countdownTime').textContent = formattedTime;
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';
}

// Función para convertir y guardar el tiempo
function saveCountdown() {
    if (inputBuffer.length === 0) return;

    let fullNumber = inputBuffer.padStart(6, '0');
    
    // Extraer los valores
    let seconds = parseInt(fullNumber.slice(4, 6));
    let minutes = parseInt(fullNumber.slice(2, 4));
    let hours = parseInt(fullNumber.slice(0, 2));

    // Realizar la conversión automática
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds = seconds % 60;
    }
    
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }

    // Formatear el tiempo resultante
    formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Convertir a milisegundos para el countdown
    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    
    // Actualizar el display del countdown
    document.getElementById('countdownTime').textContent = formattedTime;
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';
    
    // Mostrar el panel de countdown
    showPanel('countdownPanel');
    
    // Resetear el buffer de entrada
    inputBuffer = '';
}

// Función para limpiar el input
function clearCountdownInput() {
    inputBuffer = '';
	countdownTime = 0;
	formattedTime = 0;
    document.getElementById('countdownInput').textContent = '00:00:00';
    document.getElementById('countdownTime').textContent = '00:00:00';
    document.querySelector('#countdownInputPanel .milliseconds').textContent = '.000';
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';
}

function startCountdown() {
    if (countdownTime <= 0) return;
    
    document.getElementById('countdownStart').style.display = 'none';
    document.getElementById('countdownPause').style.display = 'inline-block';
    countdownInterval = setInterval(() => {
        if (countdownTime <= 0) {
            stopCountdown();
            alert('¡Tiempo terminado!');
            return;
        }
        countdownTime -= 10;
        updateCountdownDisplay();
    }, 10);
}

// Event listeners para el teclado numérico y los botones
document.addEventListener('DOMContentLoaded', () => {
    // Listener para el teclado
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('countdownInputPanel').classList.contains('hidden')) return;
        
        if (/^[0-9]$/.test(e.key)) {
            addNumber(e.key);
        }
    });

    // Listener para los botones numéricos
    document.querySelectorAll('.numpad-btn').forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-number');
            addNumber(number);
        });
    });
});

function pauseCountdown() {
    clearInterval(countdownInterval);
    document.getElementById('countdownPause').style.display = 'none';
    document.getElementById('countdownContinue').style.display = 'inline-block';
}

function continueCountdown() {
    document.getElementById('countdownContinue').style.display = 'none';
    document.getElementById('countdownPause').style.display = 'inline-block';
    startCountdown();
}

function clearCountdown() {
    inputBuffer = '';
    updateCountdownInput();
}

function stopCountdown() {
    clearInterval(countdownInterval);
    document.getElementById('countdownStart').style.display = 'inline-block';
    document.getElementById('countdownPause').style.display = 'none';
    document.getElementById('countdownContinue').style.display = 'none';
}

function updateCountdownDisplay() {
    const time = formatTime(countdownTime);
    document.getElementById('countdownTime').textContent = `${time.hours}:${time.minutes}:${time.seconds}`;
    document.querySelector('#countdownPanel .milliseconds').textContent = `.${time.milliseconds}`;
}

// Utilidad para formatear el tiempo
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');

    return {
        hours,
        minutes,
        seconds,
        milliseconds
    };
}

// Funciones de idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('title').textContent = translations[lang].title;
    updateUITexts();
}

function updateUITexts() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Función para manejar el retorno y limpieza
function handleReturn() {
    // Detener y limpiar el cronómetro de stopwatch
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatchTime = 0;
        document.getElementById('stopwatchTime').textContent = '00:00:00';
        document.querySelector('#stopwatchPanel .milliseconds').textContent = '.000';
    }

	stopwatchTime = 0;
	document.getElementById('stopwatchTime').textContent = '00:00:00';
	document.querySelector('#stopwatchPanel .milliseconds').textContent = '.000';
		
    // Resetear los botones del stopwatch
    document.getElementById('stopwatchStart').style.display = 'inline-block';
    document.getElementById('stopwatchPause').style.display = 'none';
    document.getElementById('stopwatchContinue').style.display = 'none';

    // Detener y limpiar el countdown
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    countdownTime = 0;
    inputBuffer = '';
    document.getElementById('countdownInput').textContent = '00:00:00';
    document.getElementById('countdownTime').textContent = '00:00:00';
    document.querySelector('#countdownInputPanel .milliseconds').textContent = '.000';
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';

    // Resetear los botones del countdown
    document.getElementById('countdownStart').style.display = 'inline-block';
    document.getElementById('countdownPause').style.display = 'none';
    document.getElementById('countdownContinue').style.display = 'none';

    // Mostrar el panel de selección
    showPanel('modeSelection');
}