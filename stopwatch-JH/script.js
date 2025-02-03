const btnCronometro = document.getElementById('btnCronometro');
const btnCuentaAtras = document.getElementById('btnCuentaAtras');

const cronometro = document.getElementById('cronometro');
const cronometroDisplay = document.getElementById('cronometroDisplay');
const btnIniciarCronometro = document.getElementById('btnIniciarCronometro');
const btnReiniciarCronometro = document.getElementById('btnReiniciarCronometro');

const cuentaAtras = document.getElementById('cuentaAtras');
const cuentaAtrasDisplay = document.getElementById('cuentaAtrasDisplay');
const tiempoInicial = document.getElementById('tiempoInicial');
const btnIniciarCuentaAtras = document.getElementById('btnIniciarCuentaAtras');
const btnDetenerCuentaAtras = document.getElementById('btnDetenerCuentaAtras');

let cronometroIntervalo;
let cuentaAtrasIntervalo;
let tiempoRestante;

btnCronometro.addEventListener('click', () => {
    cronometro.classList.remove('oculto');
    cuentaAtras.classList.add('oculto');
});

btnCuentaAtras.addEventListener('click', () => {
    cuentaAtras.classList.remove('oculto');
    cronometro.classList.add('oculto');
});

btnIniciarCronometro.addEventListener('click', () => {
    clearInterval(cronometroIntervalo);
    let tiempoTranscurrido = 0;
    cronometroIntervalo = setInterval(() => {
        tiempoTranscurrido++;
        actualizarDisplay(cronometroDisplay, tiempoTranscurrido);
    }, 1000);
});

btnReiniciarCronometro.addEventListener('click', () => {
    clearInterval(cronometroIntervalo);
    actualizarDisplay(cronometroDisplay, 0);
});

btnIniciarCuentaAtras.addEventListener('click', () => {
    clearInterval(cuentaAtrasIntervalo);
    tiempoRestante = parseInt(tiempoInicial.value);

    if (isNaN(tiempoRestante) || tiempoRestante < 1) {
        alert('Por favor, ingresa un tiempo válido en segundos.');
        return;
    }

    actualizarDisplay(cuentaAtrasDisplay, tiempoRestante);
    cuentaAtrasIntervalo = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante < 0) {
            clearInterval(cuentaAtrasIntervalo);
            alert('¡Tiempo cumplido!');
            return;
        }
        actualizarDisplay(cuentaAtrasDisplay, tiempoRestante);
    }, 1000);
});

btnDetenerCuentaAtras.addEventListener('click', () => {
    clearInterval(cuentaAtrasIntervalo);
});

function actualizarDisplay(elemento, tiempo) {
    const horas = Math.floor(tiempo / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;
    elemento.textContent = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}