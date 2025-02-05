- Deepseek
- Como un profesional Desarrolla una página web (separada en html, js y css) que incluya dos funciones principales: un cronómetro y una cuenta atrás. Debe cumplir con los siguientes requisitos:

### Cronómetro:
- Un cronómetro que inicie al presionar un botón de **"Iniciar"**, se pause al presionar un botón de **"Pausar"**, y se reinicie al presionar un botón **"Reiniciar"**.
- Debe mostrar el tiempo en segundos y fracciones de segundo.
- Al pausar, debe ser posible iniciar el cronómetro desde el último punto de pausa.
- Debe seguir funcionando correctamente incluso si la página se recarga (mantener el estado a través de la memoria local).
- Los botones deben tener un color característico que refleje su función.

### Cuenta Atrás:
- Una cuenta atrás que comience desde un valor definido por el usuario (en segundos).
- El usuario debe poder ajustar el tiempo de la cuenta atrás y **comenzar, pausar o detenerla**.
- Debe mostrar el tiempo restante de forma precisa y detenerse al llegar a cero, mostrando un mensaje o alerta de **"Tiempo agotado"**.
- Al igual que el cronómetro, debe poder reanudar desde el último punto de pausa incluso después de que la página se recargue.

## Memoria:
- La página debe manejar correctamente el estado del cronómetro y la cuenta atrás.
- Si el usuario recarga la página, ambos deben recordar su estado (ya sea detenido, en ejecución o pausado) utilizando el **almacenamiento local** del navegador.
- Si el usuario navega a otra página y vuelve, el estado debe mantenerse intacto hasta que la página se vuelva a cargar.

## Pruebas:
- Debes asegurar que el cronómetro y la cuenta atrás se comporten correctamente en diferentes casos:
  - Recarga de la página.
  - Cambio entre pestañas.
- Probar con diferentes configuraciones de tiempo (**10 segundos, 1 minuto, 1 hora**).
- Realizar pruebas de límites (tiempos muy largos o muy cortos) y verificar que la interfaz se mantenga clara y funcional.

## Tecnologías:
- **HTML, CSS, JavaScript** (usa almacenamiento local).
