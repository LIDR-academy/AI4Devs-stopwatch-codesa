// Variables de estado
let cronometroInterval;
let cuentaRegresivaInterval;
let tiempoCronometro = 0;
let tiempoCuentaRegresiva = 0;
let cronometroActivo = false;
let cuentaRegresivaActivo = false;

// Funciones de Cronómetro
function startCronometro() {
    if (!cronometroActivo) {
        cronometroInterval = setInterval(() => {
            tiempoCronometro += 10;
            document.getElementById('cronometro-time').innerText = formatTime(tiempoCronometro);
        }, 10);
        document.getElementById('start-cronometro').innerText = 'Pausa';
        cronometroActivo = true;
    } else {
        clearInterval(cronometroInterval);
        document.getElementById('start-cronometro').innerText = 'Continuar';
        cronometroActivo = false;
    }
}

function clearCronometro() {
    clearInterval(cronometroInterval);
    tiempoCronometro = 0;
    document.getElementById('cronometro-time').innerText = formatTime(tiempoCronometro);
    document.getElementById('start-cronometro').innerText = 'Start';
    cronometroActivo = false;
}

// Formato de tiempo HH:MM:SS:ms
function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Funciones de Cuenta Regresiva
function startCuentaRegresiva() {
    if (!cuentaRegresivaActivo) {
        cuentaRegresivaInterval = setInterval(() => {
            if (tiempoCuentaRegresiva <= 0) {
                clearInterval(cuentaRegresivaInterval);
            } else {
                tiempoCuentaRegresiva -= 10;
                document.getElementById('cuenta-regresiva-time').innerText = formatTime(tiempoCuentaRegresiva);
            }
        }, 10);
        document.getElementById('set-cuenta-regresiva').innerText = 'Pausa';
        cuentaRegresivaActivo = true;
    } else {
        clearInterval(cuentaRegresivaInterval);
        document.getElementById('set-cuenta-regresiva').innerText = 'Continuar';
        cuentaRegresivaActivo = false;
    }
}

function clearCuentaRegresiva() {
    clearInterval(cuentaRegresivaInterval);
    tiempoCuentaRegresiva = 0;
    document.getElementById('cuenta-regresiva-time').innerText = formatTime(tiempoCuentaRegresiva);
    document.getElementById('set-cuenta-regresiva').innerText = 'Set';
    document.getElementById('cuenta-regresiva-container').querySelector('.number-panel').classList.remove('hidden');
}

// Establecer el tiempo de la cuenta regresiva
function setTiempoCuentaRegresiva(tiempo) {
    tiempoCuentaRegresiva = tiempo * 1000; // Convertir segundos a milisegundos
    document.getElementById('cuenta-regresiva-time').innerText = formatTime(tiempoCuentaRegresiva);
}

// Control de interacción y navegación
document.getElementById('cronometro-btn').addEventListener('click', () => {
    document.querySelector('.main-buttons').classList.add('hidden');
    document.getElementById('cronometro-container').classList.remove('hidden');
});

document.getElementById('cuenta-regresiva-btn').addEventListener('click', () => {
    document.querySelector('.main-buttons').classList.add('hidden');
    document.getElementById('cuenta-regresiva-container').classList.remove('hidden');
});

// Cronómetro
document.getElementById('start-cronometro').addEventListener('click', startCronometro);
document.getElementById('clear-cronometro').addEventListener('click', clearCronometro);
document.getElementById('back-cronometro').addEventListener('click', () => {
    document.getElementById('cronometro-container').classList.add('hidden');
    document.querySelector('.main-buttons').classList.remove('hidden');
});

// Cuenta regresiva
document.querySelectorAll('.number-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Establecer el tiempo de cuenta regresiva según el número seleccionado
        setTiempoCuentaRegresiva(parseInt(btn.innerText));
    });
});

// Cuando se hace clic en el botón "Set"
document.getElementById('set-cuenta-regresiva').addEventListener('click', () => {
    if (tiempoCuentaRegresiva > 0) {
        // Cambiar texto del botón Set a Start
        document.getElementById('set-cuenta-regresiva').innerText = 'Start';
        document.getElementById('clear-cuenta-regresiva').innerText = 'Clear';
        
        // Ocultar el panel de números
        document.getElementById('cuenta-regresiva-container').querySelector('.number-panel').classList.remove('hidden');
    }
});

// Iniciar la cuenta regresiva al presionar Start
document.getElementById('set-cuenta-regresiva').addEventListener('click', startCuentaRegresiva);

// Limpiar la cuenta regresiva
document.getElementById('clear-cuenta-regresiva').addEventListener('click', clearCuentaRegresiva);

// Volver al menú principal de la cuenta regresiva
document.getElementById('back-cuenta-regresiva').addEventListener('click', () => {
    document.getElementById('cuenta-regresiva-container').classList.add('hidden');
    document.querySelector('.main-buttons').classList.remove('hidden');
});
