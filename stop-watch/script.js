document.addEventListener("DOMContentLoaded", () => {
    const panel = document.getElementById("panel");
    const cronometro = document.getElementById("cronometro");
    const cuentaRegresiva = document.getElementById("cuentaRegresiva");
    const displayCrono = document.getElementById("displayCrono");
    const displayCuenta = document.getElementById("displayCuenta");
    const botonesTiempo = document.getElementById("botonesTiempo");
    
    let cronoInterval, cuentaInterval;
    let cronoTime = 0, cuentaTime = 0;
    let cronoRunning = false, cuentaRunning = false;
    
    document.getElementById("btnCronometro").addEventListener("click", () => {
        panel.classList.add("hidden");
        cronometro.classList.remove("hidden");
    });
    
    document.getElementById("btnCuentaRegresiva").addEventListener("click", () => {
        panel.classList.add("hidden");
        cuentaRegresiva.classList.remove("hidden");
    });
    
    document.getElementById("btnVolverPanel1").addEventListener("click", () => {
        cronometro.classList.add("hidden");
        panel.classList.remove("hidden");
    });
    
    document.getElementById("btnVolverPanel2").addEventListener("click", () => {
        cuentaRegresiva.classList.add("hidden");
        panel.classList.remove("hidden");
    });
    
    function formatTime(ms) {
        let h = String(Math.floor(ms / 3600000)).padStart(2, '0');
        let m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
        let s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
        let msStr = String(ms % 1000).padStart(3, '0').slice(0,2);
        return `${h}:${m}:${s}:${msStr}`;
    }
    
    document.getElementById("btnIniciarCrono").addEventListener("click", (e) => {
        if (!cronoRunning) {
            cronoRunning = true;
            let startTime = Date.now() - cronoTime;
            cronoInterval = setInterval(() => {
                cronoTime = Date.now() - startTime;
                displayCrono.textContent = formatTime(cronoTime);
            }, 10);
            e.target.textContent = "⏸️ Pausar";
        } else {
            cronoRunning = false;
            clearInterval(cronoInterval);
            e.target.textContent = "▶️ Continuar";
        }
    });
    
    document.getElementById("btnResetCrono").addEventListener("click", () => {
        clearInterval(cronoInterval);
        cronoTime = 0;
        displayCrono.textContent = "00:00:00:00";
        document.getElementById("btnIniciarCrono").textContent = "▶️ Iniciar";
        cronoRunning = false;
    });
    
    for (let i = 1; i <= 10; i++) {
        let btn = document.createElement("button");
        btn.textContent = `${i}s`;
        btn.className = "bg-yellow-500 px-3 py-1 rounded-lg m-1";
        btn.addEventListener("click", () => {
            cuentaTime = i * 1000;
            displayCuenta.textContent = formatTime(cuentaTime);
        });
        botonesTiempo.appendChild(btn);
    }
    
    document.getElementById("btnIniciarCuenta").addEventListener("click", (e) => {
        if (!cuentaRunning) {
            cuentaRunning = true;
            let startTime = Date.now();
            cuentaInterval = setInterval(() => {
                let elapsed = Date.now() - startTime;
                let remaining = cuentaTime - elapsed;
                if (remaining <= 0) {
                    clearInterval(cuentaInterval);
                    displayCuenta.textContent = "00:00:00:00";
                    cuentaRunning = false;
                    e.target.textContent = "▶️ Iniciar";
                } else {
                    displayCuenta.textContent = formatTime(remaining);
                }
            }, 10);
            e.target.textContent = "⏸️ Pausar";
        } else {
            cuentaRunning = false;
            clearInterval(cuentaInterval);
            e.target.textContent = "▶️ Iniciar";
        }
    });
    
    document.getElementById("btnResetCuenta").addEventListener("click", () => {
        clearInterval(cuentaInterval);
        cuentaTime = 0;
        displayCuenta.textContent = "00:00:00:00";
        document.getElementById("btnIniciarCuenta").textContent = "▶️ Iniciar";
        cuentaRunning = false;
    });
});
