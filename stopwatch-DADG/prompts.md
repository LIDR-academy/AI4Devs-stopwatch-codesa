## Chat GPT
Eres un desarrollador de software senior especialista en desarrollo web. 

Usando la una imagen de referencia que se encuentra en el siguiente link: https://github.com/danieldonoso1/AI4Devs-stopwatch-codesa/blob/main/res/stopwatch.png asociados a un cronómetro y un countDown. Quiero que realices la siguiente tarea: 

Crear un cronómetro y un countDown (contador hasta cero) con las siguientes características: 

Quiero un panel principal que permita elegir mediante dos botones una de las dos funcionalidades, Cronometro y countDown, al presionar el botón Cronometro permitirá visualizar el panel de la funcionalidad cronometro, al seleccionar el botón countDown permitirá visualizar el panel de la funcionalidad de countDown. 

Para la funcionalidad de cronometro requiero las siguientes tareas: 

- Un panel superior con un contador de horas separado por dos puntos para visualizar las horas, minutos, segundos y milisegundos. 

- En la parte inferior dos botones, uno con label “Start” en color verde y “Clear” en color rojo.  

- Al presionar el botón de “Start” se ejecutará la funcionalidad para aumentar el tiempo y así actualizando el panel superior uno a uno, partiendo desde los milisegundos, pasando por los segundos, minutos y horas esto al momento de llegar al límite de cantidad de cada uno, teniendo en cuenta el formato de reloj. 

- Al presionar el botón rojo de “Clear”, el cronometro del panel superior quedará en el estado inicial, con milisegundos, segundos, minutos y horas en cero. 

- Se debe genera un botón con label back que permita regresar al panel principal en donde se selecciona el cronometro o el countDown  

Para el countDown (contador hasta cero) o temporizador se deben realizar las siguientes tareas: 

- Debe usar el mismo panel superior utilizado en el cronometro, ocultando los dos botones de la parte inferior, "Start" y "Clear". 

- En la parte inferior del panel, se deben generar diez botones de color verde en dos filas y cada uno de ellos tendrá asignado un número desde el cero hasta el nueve, el label debe estar en formato numérico y no se deben repetir. Al seleccionarse cada uno de los números generados, debe cambiar el valor en el panel superior de derecha a izquierda según se vaya seleccionando.

- Debes crear dos botones en la parte derecha, uno de color verde con el label “SET” que tendrá la funcionalidad de cambiar a los botones ocultos del cronometro y ocultar los botones númericos y el segundo botón de color gris tendrá un label “Clear”, que permitirá limpiar el panel de configuración superior sin ocultar los botones númericos, tener en cuenta que los doce botones generados deben estar debajo del panel. 

- Al seleccionar el botón “SET” debe mantener el tiempo configurado y mostrar los botones generados para el cronómetro, botón “Start” y “Clear” 

- Al seleccionar el botón “Start”, debe iniciar la cuenta regresiva desde el valor configurado hacia cero, y actualizarse en el panel en formato fecha. 

- Al seleccionar el botón “Clear”, debe detenerse el conteo regresivo y dejar los valores seteados al momento de presionar el botón “SET”. 

- Se debe genera un botón con label "back" que permita regresar al panel principal en donde se selecciona el cronometro o el countDown 

Requiero que la página web sea desarrollada utilizando buenas prácticas de desarrollo con un correcto código comentado, separando las características en tres archivos diferentes y JavaScript como lenguaje de programación, HTML y estilos CSS propios, el estilo debe ser igual al de la imagen de referencia y debe aplicarse a toda la página web. 

El resultado debería tener tres archivos, un archivo llamado script.js que contiene el código de JavaScript, un archivo HTML con el desarrollo de la página con nombre index.html y un archivo que contenga y separe los estilos de la página en un archivo llamado styles.css 