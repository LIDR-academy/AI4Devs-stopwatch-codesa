Como un desarrollador web experto en maquetado html con diseños responsive, javascript, css deseo que me ayudes a crear una web con cronometro y temporizador, construir una pagina web que contenga 2 funcionalidades, la primera debe ser una cronometro y la segunda es una cuenta regresiva o temporizador, toma como referencia la siguiente imagen https://www.online-stopwatch.com. Ten en cuenta las siguiente indicaciones:

## Diseño

1. Requiero una web responsive, incluye algun framework como bootstrap para dicho fin y sweetalert2 para las alertas.

2. La web debe generarse en 3 archivos, index, un archivo de scripts y por por ultimo los css.

3. La pagina debe ser dinamica, debe permitir seleccionar primero que función desea el usuario, si el cronometro o el temporizador.

4. Usa iconos o emojis en los botones para hacerlos más intuitivos y tamaños ajustados a los textos y los iconos/emojis respetando la simetria y dejando espacios a los lados.

5. Crea un diseño simetro, estilizado y usando las mejores practicas de usabilidad, UX, UI.

6. Debe haber una opción que me permita volver a la pantalla de seleccion de funcionalidad si ya he seleccionado alguna.

Al seleccionar una de las opciones la vista debe cambiar y según la función deseada, a continuación detallo un poco más cada una de las funcionalidades:

## Funcionalidades cronometro

- Se debe mostrar una contador de reloj digital, con el formato hh:mm:ss, debajo de este debe haber en una grilla de 2 columnas 2 con los botones iniciar y detener.
- Al pulsar el botón iniciar, debe iniciar el cronometro y el botón Iniciar debe cambiar y convertirse en un botón de pausa.
- Al pulsar el botón pausa, se debe detener el contador sin reiniciarlo, es decir sin regresarlo a 00:00:00 y el botón debe convertirse en un botón de Reanudar.
- Al pulsar el botón reanudar debe continuar el conteo desde el punto en se pauso.
- El botón detener, debe para el cronometro y reiniciarlo a 00:00:00, en este caso los botones deben reiniciarse a su estado inicial.

## Funcionalidades temporizador o cuenta regresiva

- Se debe mostrar una contador de reloj digital, con el formato hh:mm:ss, y permitir de una forma sencilla y amigable al usuario programar por serado las horas, minutos y segundo desde la cual empezará la cuenta regresiva.
- El usuario debe introducir al menos un valor (horas, minutos o segundos) para usar la funcionalidad, en caso contrario no podrá iniciar el temporizador y se el notificará con un alert.
- Cuando finalice la cuenta debe mostrarse una notificación al usuario.
- Deben existir los mismo botones que en la funcionalidad de cronometro con el mismo comportamiento (iniciar, pausar, reanudar, detener).

Cada vez que se ingresa a una opción el cronometro o el temporizador debe estar reinciado (00:00:00) junto con la configurtación en el caso del temporizador (horas, minutas, segundos sin valor), Por ultimo por favor genera un codigo con comentarios para que sea facil de entender.

### CHATGPT respuesta

¡Claro! Vamos a construir una página web que cumpla con todas tus especificaciones. Te proporcionaré un código dividido en tres archivos, como mencionaste:

index.html: El archivo principal con la estructura HTML.
scripts.js: El archivo con la lógica de JavaScript para controlar el cronómetro y el temporizador.
styles.css: El archivo con los estilos CSS para hacer la página responsive y estilizada.
Vamos a comenzar:

1. index.html
html
Copiar
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cronómetro y Temporizador</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.2/dist/sweetalert2.min.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container" id="main-container">
    <h1 class="text-center my-4">Cronómetro y Temporizador</h1>
    
    <!-- Pantalla de selección -->
    <div id="selection-screen" class="text-center">
      <button class="btn btn-primary btn-lg mx-3" id="start-timer" onclick="startTimerScreen()">⏲️ Temporizador</button>
      <button class="btn btn-success btn-lg mx-3" id="start-stopwatch" onclick="startStopwatchScreen()">⏱️ Cronómetro</button>
    </div>
    
    <!-- Pantalla del Cronómetro -->
    <div id="stopwatch-screen" class="text-center d-none">
      <h2 id="stopwatch-time">00:00:00</h2>
      <div class="row">
        <div class="col-6">
          <button class="btn btn-primary w-100" id="start-stopwatch-btn" onclick="startStopwatch()">Iniciar</button>
        </div>
        <div class="col-6">
          <button class="btn btn-danger w-100" id="stop-stopwatch-btn" onclick="stopStopwatch()">Detener</button>
        </div>
      </div>
      <button class="btn btn-secondary mt-3" id="back-to-selection" onclick="goBackToSelection()">Volver</button>
    </div>
    
    <!-- Pantalla del Temporizador -->
    <div id="timer-screen" class="text-center d-none">
      <h2 id="timer-time">00:00:00</h2>
      <input type="number" id="hours" class="form-control my-2" placeholder="Horas" min="0">
      <input type="number" id="minutes" class="form-control my-2" placeholder="Minutos" min="0">
      <input type="number" id="seconds" class="form-control my-2" placeholder="Segundos" min="0">
      <div class="row">
        <div class="col-6">
          <button class="btn btn-primary w-100" id="start-timer-btn" onclick="startTimer()">Iniciar</button>
        </div>
        <div class="col-6">
          <button class="btn btn-danger w-100" id="stop-timer-btn" onclick="stopTimer()">Detener</button>
        </div>
      </div>
      <button class="btn btn-secondary mt-3" id="back-to-selection-timer" onclick="goBackToSelection()">Volver</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.2/dist/sweetalert2.all.min.js"></script>
  <script src="scripts.js"></script>
</body>
</html>
2. scripts.js
javascript
Copiar
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
3. styles.css
css
Copiar
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
}

h1 {
  color: #333;
}

#main-container {
  max-width: 600px;
  margin: auto;
}

#stopwatch-time, #timer-time {
  font-size: 3rem;
  margin: 20px 0;
}

button {
  font-size: 1.2rem;
}

@media (max-width: 600px) {
  #stopwatch-time, #timer-time {
    font-size: 2.5rem;
  }

  button {
    font-size: 1rem;
  }
}
Explicación rápida:
HTML: Estructura básica con Bootstrap para los botones y la interfaz. He incluido SweetAlert2 para las alertas.
JavaScript: Controla las funcionalidades del cronómetro y el temporizador. Cada funcionalidad tiene su propia lógica de botones (Iniciar, Pausar, Reanudar, Detener).
CSS: Estilos básicos para asegurar que la interfaz sea responsiva y tenga un buen diseño, con un tamaño adecuado en móviles y escritorio.
Cuando accedas a la página, podrás elegir entre el cronómetro o el temporizador y luego interactuar con los botones para controlar cada uno.

Si tienes alguna duda o necesitas hacer algún ajuste, avísame. ¡Estoy aquí para ayudarte!
