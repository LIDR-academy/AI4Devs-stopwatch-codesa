let tiempo = 0;
let intervalo;
let corriendo = false;
// Variables para la cuenta regresiva
let tiempoRestante = 0;
let intervaloCuenta;
let corriendoCuenta = false;


function iniciarCronometro() {
    if (!corriendo) {
        corriendo = true;
        intervalo = setInterval(actualizarTiempo, 0);
        document.getElementById('iniciar').style.display = 'none';
        document.getElementById('pausar').style.display = 'inline';
    }
}

function pausarCronometro() {
    corriendo = false;
    clearInterval(intervalo);
    document.getElementById('pausar').style.display = 'none';
    document.getElementById('continuar').style.display = 'inline';
}

function continuarCronometro() {
    corriendo = true;
    intervalo = setInterval(actualizarTiempo, 10);
    document.getElementById('continuar').style.display = 'none';
    document.getElementById('pausar').style.display = 'inline';
}

function limpiarCronometro() {
    corriendo = false; // Detener el cronómetro
    clearInterval(intervalo); // Limpiar el intervalo
    tiempo = 0; // Reiniciar el tiempo a 0
    actualizarTiempo(); // Actualizar la pantalla a 00:00:00:000
    // Restablecer la visibilidad de los botones
    document.getElementById('iniciar').style.display = 'inline';
    document.getElementById('pausar').style.display = 'none';
    document.getElementById('continuar').style.display = 'none';
}

function actualizarTiempo() {
    tiempo += 10;
    let horas = Math.floor(tiempo / 3600000);
    let minutos = Math.floor((tiempo % 3600000) / 60000);
    let segundos = Math.floor((tiempo % 60000) / 1000);
    let milisegundos = tiempo % 1000;
    document.getElementById('tiempo').innerText = 
        `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(milisegundos).padStart(3, '0')}`;
}


// Función para iniciar la cuenta regresiva
function iniciarCuentaRegresiva() {
    if (!corriendoCuenta) {
        const tiempoIngresado = document.getElementById('tiempoInicial').value;
        const tiempoArray = tiempoIngresado.split(':');
        if (tiempoArray.length === 4) {
            const horas = parseInt(tiempoArray[0]) || 0;
            const minutos = parseInt(tiempoArray[1]) || 0;
            const segundos = parseInt(tiempoArray[2]) || 0;
            const milisegundos = parseInt(tiempoArray[3]) || 0;

            tiempoRestante = (horas * 3600000) + (minutos * 60000) + (segundos * 1000) + milisegundos;

            if (tiempoRestante > 0) {
                corriendoCuenta = true;
                intervaloCuenta = setInterval(actualizarCuentaRegresiva, 10);
                document.getElementById('iniciar').style.display = 'none';
                document.getElementById('pausar').style.display = 'inline';
            } else {
                alert("Ingrese un tiempo válido.");
            }
        } else {
            alert("Formato incorrecto. Use hh:mm:ss:ms");
        }
    }
}

// Función para actualizar la cuenta regresiva
function actualizarCuentaRegresiva() {
    if (tiempoRestante > 0) {
        tiempoRestante -= 10;
        const horas = Math.floor(tiempoRestante / 3600000);
        const minutos = Math.floor((tiempoRestante % 3600000) / 60000);
        const segundos = Math.floor((tiempoRestante % 60000) / 1000);
        const milisegundos = tiempoRestante % 1000;

        document.getElementById('tiempo').innerText =
            `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(milisegundos).padStart(3, '0')}`;
    } else {
        clearInterval(intervaloCuenta);
        corriendoCuenta = false;
        document.getElementById('tiempo').innerText = "00:00:00:000";
        alert("¡Tiempo terminado!");
        document.getElementById('iniciar').style.display = 'inline';
        document.getElementById('pausar').style.display = 'none';
        document.getElementById('continuar').style.display = 'none';
    }
}

// Función para pausar la cuenta regresiva
function pausarCuentaRegresiva() {
    corriendoCuenta = false;
    clearInterval(intervaloCuenta);
    document.getElementById('pausar').style.display = 'none';
    document.getElementById('continuar').style.display = 'inline';
}

// Función para continuar la cuenta regresiva
function continuarCuentaRegresiva() {
    if (tiempoRestante > 0) {
        corriendoCuenta = true;
        intervaloCuenta = setInterval(actualizarCuentaRegresiva, 10);
        document.getElementById('continuar').style.display = 'none';
        document.getElementById('pausar').style.display = 'inline';
    }
}

// Función para limpiar la cuenta regresiva
function limpiarCuentaRegresiva() {
    corriendoCuenta = false;
    clearInterval(intervaloCuenta);
    tiempoRestante = 0;
    document.getElementById('tiempo').innerText = "00:00:00:000";
    document.getElementById('tiempoInicial').value = "";
    document.getElementById('iniciar').style.display = 'inline';
    document.getElementById('pausar').style.display = 'none';
    document.getElementById('continuar').style.display = 'none';
}