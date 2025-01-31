    // Screen management
    function showScreen(screenName) {
        document.getElementById('homeScreen').classList.add('hidden');
        document.getElementById('stopwatchScreen').classList.add('hidden');
        document.getElementById('countdownScreen').classList.add('hidden');

        switch(screenName) {
            case 'home':
                document.getElementById('homeScreen').classList.remove('hidden');
                break;
            case 'stopwatch':
                document.getElementById('stopwatchScreen').classList.remove('hidden');
                break;
            case 'countdown':
                document.getElementById('countdownScreen').classList.remove('hidden');
                break;
        }
    }

    // Stopwatch functionality
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;

    document.getElementById('stopwatchStartBtn').addEventListener('click', function() {
        if (!stopwatchRunning) {
            stopwatchRunning = true;
            this.textContent = 'Pause';
            stopwatchInterval = setInterval(updateStopwatch, 10);
        } else {
            stopwatchRunning = false;
            this.textContent = 'Start';
            clearInterval(stopwatchInterval);
        }
    });

    document.querySelector('#stopwatchScreen .btn-clear').addEventListener('click', function() {
        if (stopwatchRunning) {
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
            document.getElementById('stopwatchStartBtn').textContent = 'Start';
        }
        stopwatchTime = 0;
        document.getElementById('stopwatchDisplay').textContent = '00:00:00.00';
    });

    function updateStopwatch() {
        stopwatchTime++;
        const display = document.getElementById('stopwatchDisplay');
        const hours = Math.floor(stopwatchTime / 360000);
        const minutes = Math.floor((stopwatchTime % 360000) / 6000);
        const seconds = Math.floor((stopwatchTime % 6000) / 100);
        const milliseconds = stopwatchTime % 100;

        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }

    // Countdown functionality
    let countdownInterval;
    let countdownRunning = false;
    let countdownTime = 0;
    let countdownSetTime = 0;

    const numpadButtons = document.querySelectorAll('#countdownScreen .numpad button');
    const countdownControls = document.getElementById('countdownControls');
    const countdownStartBtn = document.getElementById('countdownStartBtn');

    numpadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            const display = document.getElementById('countdownDisplay');
            
            if (value === 'Clear') {
                resetCountdown();
            } else if (value === 'Set') {
                const timeStr = display.textContent.replace(/:/g, '');
                if (timeStr !== '000000') {
                    countdownSetTime = parseInt(timeStr);
                    countdownTime = countdownSetTime;
                    countdownControls.classList.remove('hidden');
                }
            } else {
                if (!countdownRunning) {
                    const currentTime = display.textContent.replace(/:/g, '');
                    const newTime = (currentTime + value).slice(-6);
                    display.textContent = `${newTime.slice(0,2)}:${newTime.slice(2,4)}:${newTime.slice(4)}`;
                }
            }
        });
    });

    countdownStartBtn.addEventListener('click', function() {
        if (!countdownRunning) {
            countdownRunning = true;
            this.textContent = 'Pause';
            countdownInterval = setInterval(updateCountdown, 1000);
        } else {
            countdownRunning = false;
            this.textContent = 'Continue';
            clearInterval(countdownInterval);
        }
    });

    document.querySelector('#countdownControls .btn-clear').addEventListener('click', resetCountdown);

    function updateCountdown() {
        if (countdownTime > 0) {
            countdownTime--;
            displayCountdownTime();
        } else {
            clearInterval(countdownInterval);
            countdownRunning = false;
            countdownStartBtn.textContent = 'Start';
            // Aquí podrías agregar una alarma o notificación
            alert('Time is up!');
        }
    }

    function displayCountdownTime() {
        const display = document.getElementById('countdownDisplay');
        const hours = Math.floor(countdownTime / 10000);
        const minutes = Math.floor((countdownTime % 10000) / 100);
        const seconds = countdownTime % 100;
        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function resetCountdown() {
        clearInterval(countdownInterval);
        countdownRunning = false;
        countdownTime = 0;
        countdownSetTime = 0;
        countdownStartBtn.textContent = 'Start';
        document.getElementById('countdownDisplay').textContent = '00:00:00';
        countdownControls.classList.add('hidden');
    }

    function pad(num) {
        return num.toString().padStart(2, '0');
    }