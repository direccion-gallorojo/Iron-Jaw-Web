document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica del Menú Móvil ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Lógica del Formulario de Contacto (AJUSTADA) ---
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.innerText = 'Enviando...';
                submitBtn.disabled = true;
            }
        });
    }

    // --- Lógica del Aviso de Cookies ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.remove('hidden');
    }

    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.add('hidden');
        });
    }

    // ==========================================================================
    // NUEVA LÓGICA: CONFIGURADOR EN TIEMPO REAL (IRON JAW CUSTOMIZER)
    // ==========================================================================
    
    // Elementos visuales del lienzo
    const customInput = document.getElementById('customText');
    const previewText = document.getElementById('previewText');
    const fontSelector = document.getElementById('fontSelector');
    const colorButtons = document.querySelectorAll('.color-btn');

    // Campos ocultos del formulario para enviar por email
    const formCustomText = document.getElementById('formCustomText');
    const formCustomColor = document.getElementById('formCustomColor');
    const formCustomFont = document.getElementById('formCustomFont');

    // 1. CONTROL DE TEXTO EN VIVO
    if (customInput && previewText) {
        customInput.addEventListener('input', (e) => {
            let userText = e.target.value.toUpperCase(); // Forzar mayúsculas estilo combat
            
            if (userText.trim() === "") {
                previewText.innerText = "TU NOMBRE";
                formCustomText.value = "TU NOMBRE";
            } else {
                previewText.innerText = userText;
                formCustomText.value = userText; // Se guarda para el email
            }
        });
    }

    // 2. CONTROL DE COLOR EN VIVO
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa al botón anterior
            document.querySelector('.color-btn.active').classList.remove('active');
            // Añadir clase activa al pulsado
            button.classList.add('active');

            // Capturar el color hexadecimal seleccionado
            const selectedColor = button.getAttribute('data-color');
            
            // Aplicar el color al texto flotante
            previewText.style.color = selectedColor;
            
            // Guardar el color en el campo oculto para el email
            formCustomColor.value = selectedColor;
        });
    });

    // 3. CONTROL DE FUENTE / TIPOGRAFÍA EN VIVO
    if (fontSelector && previewText) {
        fontSelector.addEventListener('change', (e) => {
            const selectedClass = e.target.value;
            
            // Limpiar las clases de fuentes antiguas
            previewText.classList.remove('tipografia-mma', 'tipografia-classic', 'tipografia-modern');
            
            // Añadir la nueva clase seleccionada
            previewText.classList.add(selectedClass);

            // Guardar un nombre legible en el campo oculto para el email
            let fontFriendlyName = "Combat (Impact)";
            if (selectedClass === 'tipografia-classic') fontFriendlyName = "Deportivo Clásico (Monospace)";
            if (selectedClass === 'tipografia-modern') fontFriendlyName = "Diseño Moderno (Italic)";
            
            formCustomFont.value = fontFriendlyName;
        });
    }
});
