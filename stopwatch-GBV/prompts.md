
Actua como un desarrollador experto en las tecnologías de HTML, Javascript y CSS. Debes desarrolar una aplicación web que tenga un cronómetro y un conteo hacía atrás.

# Requerimientos Funcionales
## Requerimiento 1
Como usuario de la aplicación quiero tener en la pagina de inicio las opciones que permitan seleccionar si va a utilizar el Cronometro que lo llamaremos Stopwath o el conteo hacía atrás que se llamará CountDown.

- El titulo de la aplicación que se encuentra en la parte superior de los botones será 'STOPWATH - GBV'
- El boton Stopwatch permite al usuario dar clic y lo debe redireccionar a una pagina llamada stopwatch.html
- El boton Countdown permite al usuario dar clic y lo debe redireccionar a una pagina llamada countdown.html
- El diseño debe ser basado en el mockup que se encuentra en la siguiente URL: https://github.com/gianc2007/AI4Devs-stopwatch-codesa/blob/main/stopwatch-GBV/mockup/index-mockup.png, teniendo encuenta que es un panel divido con los 2 botones con sus respectivos iconos y titulo.
- Tener el diseño de los botones, iconografia, posicionamiento de los diferentes elementos como se muestran en el mockup

## Requerimiento 2
Como usuario de la aplicación quiero tener un cronometro que me permite realizar pausa, limpieza y continuar el conteo.

- El cronometro se debe desarrollar dentro de stopwatch.html.
- Reloj en formato HH:MM:SS, el cual debe estar centrado
- Debajo del reloj en la parte inferior derecha debe mostrar el conteo de milisegundos en SSS, el diseño debe ser con una letra de tamaño inferior a la de la hora.
- Debajo debe tener 2 botones centrados del mismo tamaño
- Boton 1 tiene 3 posibles funciones (Start, Continue, Stop).
- Al ingresar a la pantalla el valor Boton 1 será Iniciar. 
- Boton 1 funcion Start, debe iniciar el cronometro el cual nos debe ir mostrando los milisegundos transcurridos y sumar 1 segundo al reloj, por ejemplo si la hora esta como 00:00:00 luego de transcurirr 1000 milisegundos debe mostrarme 00:00:01, adicional cambia el valor a Stop.
- Boton 1 funcion Stop, se debe parar el reloj dejandolo en el conteo de milisegundos y segundos que se esta visualizando al usuario y debera cambiar el valor a Continue.
- Boton 1 funciona Continue, el reloj seguira aumentando su conteo.
- Boton 2 funcion Clear al dar clic en él reinicia el reloj, por ejemplo si el reloj estaba en ese momento en 00:10:00 volvera a 00:00:00 y el primero boton quedara en la primera opción de iniciar. Tambien se debe reinicar el conteo de milisegundos.
- Debajo de los botones debera tener un boton de Back con su respectivo icono el cual nos permite retornar al index de la pagina.
- El diseño debe ser basado en el mockup que se encuentra en la siguiente URL: https://github.com/gianc2007/AI4Devs-stopwatch-codesa/blob/main/stopwatch-GBV/mockup/stopwatch-mockup.png.
- Tener el diseño de los botones, iconografia, posicionamiento de los diferentes elementos como se muestran en el mockup


## Requerimiento 3
Como usuario de la aplicación quiero tener un contador hacia atrás que me permite ingresar el timpo en el cual quiero iniciarlo.
- El countdown se debe desarrollar dentro de countdown.html.
- Reloj en formato HH:MM:SS, el cual debe estar centrado
- Botones con los números del 0 al 9, un botón para cada número que se debera ir seteando en la hora.
- Un boton Set el cual permite guardar la hora y inicial muestra el panel para inicializar e countdown, tener en cuenta que al guardar se debe hacer la conversion de los segundos ingresados en el reloj.
- Un boton clear que reinicia la información en el reloj, por ejemplo si esta como 00:10:00 quedara en 00.
- Debajo de los botones debera tener un boton de Back con su respectivo icono el cual nos permite retornar al index de la pagina.
- El diseño debe ser basado en el mockup que se encuentra en la siguiente URL: https://github.com/gianc2007/AI4Devs-stopwatch-codesa/blob/main/stopwatch-GBV/mockup/countdown-mockup.png.
- Tener el diseño de los botones, iconografia, posicionamiento de los diferentes elementos como se muestran en el mockup

## Requerimiento 4
Como usuario de la aplicación quiero iniciar el countdown que me permita ver como va restando el reloj en tiempo real.
- Este panel aparece despues de dar clic en Set del requerimiento numero 3
- El panel de inicial el coutdown me muestra el la hora regisrada en el requerimiento 3.
- Botón Start que permite inicializar el conteo hacía a atrás, por ejemplo si la hora esta en 00:00:09 y transcure 1000 milisegundos debe mostrar 00:00:08.
- Al llegar la hora a 00:00:00 se debe poder visualizar que termino, mostrando al usuario la hora con un fondo rojo y indicando con sonido su finalizacion
- Boton clear que inicializa el countdown al tiempo que registro el usuario.
- Debajo de los botones debera tener un boton de Back con su respectivo icono el cual nos permite retornar al index de la pagina.
- El diseño debe ser basado en el mockup que se encuentra en la siguiente URL: https://github.com/gianc2007/AI4Devs-stopwatch-codesa/blob/main/stopwatch-GBV/mockup/countdown-mockup2.png.
- Tener el diseño de los botones, iconografia, posicionamiento de los diferentes elementos como se muestran en el mockup

# Requerimientos técnicos

- RQF-1: Debe ser compatibilible con los diferentes navegadores de los sistemas operativos.
- RQF-2: Se debe programar en ingles
- RQF-3: Utilizar altos estandares de html5 y CSS3
- RQF-4: Separar responsabilidades en las diferentes capas HTML, JavaScript, CSS.
- RQF-3: Para el diseño utilizar la libreria bootstrap.
- RQF-5: Crear un componente generico para mostrar la hora que se pueda reutilizar en stopwatch y countdown.

# Requerimientos no funcionales

- RQNF-1: La aplicación debe poseer diseño "Responsive", para garantizar el debido funcionamiento en los diferentes tamaños de dispotivos.
- RQNF-2: La aplicación debe tener un diseño para usuarios entre 20 y 50 años


