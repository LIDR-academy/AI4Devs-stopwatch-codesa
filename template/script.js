function formatTime(ms) {
    return (ms / 1000).toFixed(2).padStart(5, '0');
}

class Stopwatch {
    constructor() {
        this.elapsed = 0;
        this.isRunning = false;
        this.startTime = 0;
        this.interval = null;

        const storedData = JSON.parse(localStorage.getItem('stopwatch')) || {};
        if (storedData.elapsed !== undefined) this.elapsed = storedData.elapsed;
        
        if (storedData.isRunning) {
            const currentTime = Date.now();
            this.elapsed += currentTime - storedData.startTime;
            this.start();
        }
        
        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsed;
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.elapsed = Date.now() - this.startTime;
                this.updateDisplay();
                this.saveState();
            }, 10);
            this.saveState();
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
            this.saveState();
        }
    }

    reset() {
        this.elapsed = 0;
        this.isRunning = false;
        clearInterval(this.interval);
        this.updateDisplay();
        localStorage.removeItem('stopwatch');
    }

    updateDisplay() {
        document.getElementById('stopwatch-display').textContent = formatTime(this.elapsed);
    }

    saveState() {
        localStorage.setItem('stopwatch', JSON.stringify({
            elapsed: this.elapsed,
            isRunning: this.isRunning,
            startTime: this.isRunning ? this.startTime : undefined
        }));
    }
}

class Countdown {
    constructor() {
        this.remaining = 0;
        this.endTime = 0;
        this.isRunning = false;
        this.interval = null;
        this.initialTime = 0;

        const storedData = JSON.parse(localStorage.getItem('countdown')) || {};
        const input = document.getElementById('countdown-input');
        
        if (storedData.initialTime) {
            this.initialTime = storedData.initialTime;
            input.value = this.initialTime;
        }
        
        if (storedData.isRunning) {
            this.remaining = storedData.endTime - Date.now();
            if (this.remaining <= 0) {
                this.remaining = 0;
                this.isRunning = false;
            } else {
                this.endTime = storedData.endTime;
                this.start();
            }
        } else {
            this.remaining = storedData.remaining || 0;
        }
        
        this.updateDisplay();
    }

    start() {
        const input = document.getElementById('countdown-input');
        const seconds = parseFloat(input.value);
        
        if (isNaN(seconds) || seconds < 0) {
            alert('Ingrese un valor válido');
            return;
        }

        this.initialTime = seconds;
        this.remaining = seconds * 1000;
        
        if (!this.isRunning) {
            this.endTime = Date.now() + this.remaining;
            this.isRunning = true;
            
            this.interval = setInterval(() => {
                this.remaining = this.endTime - Date.now();
                
                if (this.remaining <= 0) {
                    this.remaining = 0;
                    this.isRunning = false;
                    clearInterval(this.interval);
                    alert('¡Tiempo agotado!');
                }
                
                this.updateDisplay();
                this.saveState();
            }, 10);
        }
        
        this.saveState();
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
            this.saveState();
        }
    }

    reset() {
        const input = document.getElementById('countdown-input');
        const seconds = parseFloat(input.value);
        
        if (isNaN(seconds) || seconds < 0) {
            alert('Ingrese un valor válido');
            return;
        }

        this.remaining = seconds * 1000;
        this.isRunning = false;
        clearInterval(this.interval);
        this.updateDisplay();
        this.saveState();
    }

    updateDisplay() {
        document.getElementById('countdown-display').textContent = formatTime(this.remaining);
    }

    saveState() {
        localStorage.setItem('countdown', JSON.stringify({
            initialTime: this.initialTime,
            remaining: this.remaining,
            endTime: this.isRunning ? this.endTime : undefined,
            isRunning: this.isRunning
        }));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
    const countdown = new Countdown();

    document.getElementById('stopwatch-start').addEventListener('click', () => stopwatch.start());
    document.getElementById('stopwatch-pause').addEventListener('click', () => stopwatch.pause());
    document.getElementById('stopwatch-reset').addEventListener('click', () => stopwatch.reset());

    document.getElementById('countdown-start').addEventListener('click', () => countdown.start());
    document.getElementById('countdown-pause').addEventListener('click', () => countdown.pause());
    document.getElementById('countdown-reset').addEventListener('click', () => countdown.reset());
});