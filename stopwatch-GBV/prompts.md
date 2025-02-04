
Actua como un desarrollador experto en las tecnologías de HTML, Javascript y CSS. Debes desarrolar una aplicación web que tenga un cronómetro y un conteo hacía atrás.

# Requerimientos Funcionales
## Requerimiento 1
Como usuario de la aplicación quiero tener en la pagina de inicio las opciones que permitan seleccionar si va a utilizar el Cronometro que lo llamaremos Stopwath o el conteo hacía atrás que se llamará CountDown.

- El titulo de la aplicación que se encuentra en la parte superior de los botones será 'STOPWATH - GBV'
- El boton Stopwatch permite al usuario dar clic y lo debe redireccionar a una pagina llamada stopwatch.html
- El boton Countdown permite al usuario dar clic y lo debe redireccionar a una pagina llamada Countdown.
- El diseño debe ser basado en el mockup que se encuentra en la siguiente URL: https://github.com/gianc2007/AI4Devs-stopwatch-codesa/blob/main/stopwatch-GBV/mockup/index-mockup.png, teniendo encuenta que es un panel divido con los 2 botones con sus respectivos iconos y titulo.
- Tener presente los colores utilizados en el mockup.

## Requerimiento 2
Como usuario de la aplicación quiero tener un cronometro que me permite realizar pausa, limpieza y continuar el conteo.

- El cronometro se debe desarrolar dentro de stopwatch.html.
- Debe cotener un reloj en formato HH:MM:SS, el cual debe estar centrado
- Debajo del reloj en la parte inferior derecha debe mostrar el conteo de milisegundos en SSS, el diseño debe ser con una letra de tamaño inferior a la de la hora.
- Debajo debe tener 2 botones centrados del mismo tamaño
- El primer boton tiene 3 posibles label (Iniciar, Continuar, Parar).
- Al ingresar a la pantalla el valor del primero boton sera Iniciar. 
- Al darle clic cuando el primero boton tenga el valor Iniciar, debe iniciar el cronometro el cual nos debe ir mostrando los milisegundos transcurridos y sumar 1 segundo al reloj, por ejemplo si la hora esta como 00:00:00 luego de transcurirr 1000 milisegundos debe mostrarme 00:00:01, adicional cambia el valor a Parar.
- Al dar clic cuando el boton tiene el valor Parar, se debe parar el reloj dejandolo en el conteo de milisegundos y segundos que se esta visualizando al usuario y debera cambiar el valor a Continuar.
- Al dar clic cuando el boton tiene el valor Continuar, el reloj seguira aumentando su conteo.
- El segundo boton tendra el valor Limpiar al dar clic en él reinicia el reloj, por ejemplo si el reloj estaba en ese momento en 00:10:00 volvera a 00:00:00 y el primero boton quedara en la primera opción de iniciar. Tambien se debe reinicar el conteo de milisegundos.
- Debajo de los botones debera tener un boton de Atrás con su respectivo icono el cual nos permite retornar al index de la pagina.
- El diseño debe ser basado en el mockup que se encuentra en la siguiente URL: https://github.com/gianc2007/AI4Devs-stopwatch-codesa/blob/main/stopwatch-GBV/mockup/stopwatch-mockup.png.

# Requerimientos técnicos

- RQ-1: Debe ser compatibilible con los diferentes navegadores de los sistemas operativos.
- RQ-2: Se debe programar en ingles
- RQ-3: Utilizar altos estandares de html5 y CSS3
- RQ-4: Separar responsabilidades en las diferentes capas HTML, JavaScript, CSS.
- RQ-3: Para el diseño utilizar la libreria bootstrap.

# Requerimientos no funcionales

- RQ-1: La aplicación debe poseer diseño "Responsive", para garantizar el debido funcionamiento en los diferentes tamaños de dispotivos.


