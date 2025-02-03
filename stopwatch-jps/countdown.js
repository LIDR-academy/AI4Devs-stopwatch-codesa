let countdownInterval;
let countdownTime = 0;
let formattedTime = 0;
let inputBuffer = '';
const alarmSound = new Audio('./Alarma de despertador.mp3');


document.addEventListener('DOMContentLoaded', () => {
    initializeCountdownEvents();
});

function initializeCountdownEvents() {
    // Botones de Countdown
    document.getElementById('countdownStart')?.addEventListener('click', startCountdown);
    document.getElementById('countdownPause')?.addEventListener('click', pauseCountdown);
    document.getElementById('countdownContinue')?.addEventListener('click', continueCountdown);
    document.getElementById('countdownClear')?.addEventListener('click', clearCountdown);
    document.getElementById('countdownEdit')?.addEventListener('click', () => showPanel('countdownInputPanel'));
    document.getElementById('countdownSave')?.addEventListener('click', saveCountdown);
    document.getElementById('countdownInputClear')?.addEventListener('click', clearCountdownInput);

    // Event listener para el teclado numérico
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('countdownInputPanel').classList.contains('hidden')) return;
        
        if (/^[0-9]$/.test(e.key)) {
            addNumber(e.key);
        }
    });

    // Event listeners para los botones numéricos
    document.querySelectorAll('.numpad-btn').forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-number');
            addNumber(number);
        });
    });
}

function addNumber(num) {
    if (inputBuffer.length < 6) {  // Limitamos a 6 dígitos (HHMMSS)
        inputBuffer = inputBuffer + num;
        updateCountdownInputDisplay();
    }
}

function updateCountdownInputDisplay() {
    const fullNumber = inputBuffer.padStart(6, '0');
    const hours = fullNumber.slice(0, 2);
    const minutes = fullNumber.slice(2, 4);
    const seconds = fullNumber.slice(4, 6);
    document.getElementById('countdownInput').textContent = `${hours}:${minutes}:${seconds}`;
    document.querySelector('#countdownInputPanel .milliseconds').textContent = '.000';
}

function saveCountdown() {
    if (inputBuffer.length === 0) return;

    let fullNumber = inputBuffer.padStart(6, '0');
    let seconds = parseInt(fullNumber.slice(4, 6));
    let minutes = parseInt(fullNumber.slice(2, 4));
    let hours = parseInt(fullNumber.slice(0, 2));

    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds = seconds % 60;
    }
    
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }

    formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    
    document.getElementById('countdownTime').textContent = formattedTime;
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';
    
    showPanel('countdownPanel');
    inputBuffer = '';
}

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
            playAlarm();
            return;
        }
        countdownTime -= 10;
        updateCountdownDisplay();
    }, 10);
}

function pauseCountdown() {
    clearInterval(countdownInterval);
    document.getElementById('countdownPause').style.display = 'none';
    document.getElementById('countdownContinue').style.display = 'inline-block';
}

function continueCountdown() {
    document.getElementById('countdownContinue').style.display = 'none';
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

function clearCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    stopAlarm();
    countdownTime = (formattedTime === 0) ? 0 : convertTimeToMs(formattedTime);
    
    document.getElementById('countdownTime').textContent = formattedTime || '00:00:00';
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';
    
    document.getElementById('countdownStart').style.display = 'inline-block';
    document.getElementById('countdownPause').style.display = 'none';
    document.getElementById('countdownContinue').style.display = 'none';
}

function stopCountdown() {
    clearInterval(countdownInterval);
	stopAlarm();
	// Actualizar el display
    document.getElementById('countdownInput').textContent = '00:00:00';
    document.getElementById('countdownTime').textContent = '00:00:00';
    document.querySelector('#countdownInputPanel .milliseconds').textContent = '.000';
    document.querySelector('#countdownPanel .milliseconds').textContent = '.000';
	
    document.getElementById('countdownStart').style.display = 'inline-block';
    document.getElementById('countdownPause').style.display = 'none';
    document.getElementById('countdownContinue').style.display = 'none';
}

function updateCountdownDisplay() {
    const time = formatTime(countdownTime);
    document.getElementById('countdownTime').textContent = `${time.hours}:${time.minutes}:${time.seconds}`;
    document.querySelector('#countdownPanel .milliseconds').textContent = `.${time.milliseconds}`;
}

function convertTimeToMs(timeStr) {
    if (!timeStr) return 0;
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

/**
 * Reproduce la alarma y muestra la alerta cuando el tiempo finaliza
 */
function playAlarm() {
    alarmSound.play()
        .then(() => {
            alert('¡Tiempo terminado!');
        })
        .catch(error => {
            console.error('Error al reproducir la alarma:', error);
            alert('¡Tiempo terminado!');
        });
}

/**
 * Detiene la alarma
 */
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

