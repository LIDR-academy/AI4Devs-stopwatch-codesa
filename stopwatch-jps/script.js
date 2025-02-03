// Configuración de idiomas
const translations = {
    es: {
        title: 'Cronómetro',
        stopwatch: 'Conteo progresivo',
        countdown: 'Conteo regresivo',
        start: 'Iniciar',
        pause: 'Pausar',
        continue: 'Continuar',
        clear: 'Limpiar',
        save: 'Guardar',
        edit: 'Editar',
        return: 'Regresar'
    },
    en: {
        title: 'Stopwatch',
        stopwatch: 'Progressive count',
        countdown: 'Regressive count',
        start: 'Start',
        pause: 'Pause',
        continue: 'Continue',
        clear: 'Clear',
        save: 'Save',
        edit: 'Edit',
        return: 'Return'
    }
};

// Variables globales
let currentLanguage = 'es';

// Event Listeners - Se ejecutan cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeButtons();
});

function initializeEventListeners() {
    // Selector de idioma
    document.getElementById('languageSelect')?.addEventListener('change', (e) => changeLanguage(e.target.value));

    // Inicializar los mode-cards con sus event listeners
    const stopwatchCard = document.querySelector('.mode-card:first-child');
    const countdownCard = document.querySelector('.mode-card:last-child');
    
    if (stopwatchCard) {
        stopwatchCard.addEventListener('click', () => showPanel('stopwatchPanel'));
    }
    
    if (countdownCard) {
        countdownCard.addEventListener('click', () => showPanel('countdownInputPanel'));
    }
    
    // Actualizar los event listeners de los botones de retorno
    document.querySelectorAll('.return-btn').forEach(button => {
        button.addEventListener('click', handleReturn);
    });
}

function initializeButtons() {
    // Configurar botones de retorno
    const returnButtons = document.querySelectorAll('.btn-secondary[onclick="showModeSelection()"]');
    returnButtons.forEach(button => {
        button.addEventListener('click', showModeSelection);
    });
}

// Funciones de gestión de paneles
function showPanel(panelId) {
    // Ocultar todos los paneles
    const panels = [
        'modeSelection',
        'stopwatchPanel',
        'countdownInputPanel',
        'countdownPanel'
    ];
    
    panels.forEach(id => {
        const panel = document.getElementById(id);
        if (panel) {
            panel.classList.add('hidden');
        }
    });

    // Mostrar el panel seleccionado
    const selectedPanel = document.getElementById(panelId);
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }
}

function showModeSelection() {
    showPanel('modeSelection');
}

// Funciones de idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('title').textContent = translations[lang].title;
    updateUITexts();
}

function updateUITexts() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Utilidad para formatear el tiempo
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');

    return {
        hours,
        minutes,
        seconds,
        milliseconds
    };
}

// Función para manejar el retorno y limpieza
function handleReturn() {
    stopStopwatch();
    stopCountdown();
    showPanel('modeSelection');
}