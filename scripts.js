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
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Lógica del Formulario de Contacto (AJUSTADA) ---
    const contactForm = document.getElementById('contactForm');

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
            if (cookieBanner) {
                cookieBanner.classList.add('hidden');
            }
        });
    }

    // ==========================================================================
    // NUEVA LÓGICA: CONFIGURADOR EN TIEMPO REAL (IRON JAW CUSTOMIZER)
    // ==========================================================================
    
    // Elementos visuales del lienzo
    const baseMouthguard = document.getElementById('baseMouthguard');
    const customInput = document.getElementById('customText');
    const previewText = document.getElementById('previewText');
    const fontSelector = document.getElementById('fontSelector');
    const colorButtons = document.querySelectorAll('.color-btn');
    const vistaButtons = document.querySelectorAll('.btn-vista');

    // Campos ocultos del formulario para enviar por email
    const formCustomText = document.getElementById('formCustomText');
    const formCustomColor = document.getElementById('formCustomColor');
    const formCustomFont = document.getElementById('formCustomFont');
    const formCustomVista = document.getElementById('formCustomVista');

    // Mapeo de rutas de imágenes según la perspectiva seleccionada
    const imagenesBucal = {
        frontal: 'images/bucal-blanco.png',
        izquierdo: 'images/bucal-lado-izquierdo.png',
        derecho: 'images/bucal-lado-derecho.png'
    };

    // 1. CONTROL DE CAMBIO DE VISTA (PERSPECTIVA 3D) EN VIVO
    vistaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa al botón de vista anterior de forma segura
            const activeVista = document.querySelector('.btn-vista.active');
            if (activeVista) {
                activeVista.classList.remove('active');
            }
            
            // Añadir clase activa al pulsado
            button.classList.add('active');

            // Capturar la vista elegida (frontal, izquierdo, derecho)
            const seleccionVista = button.getAttribute('data-vista');

            // Cambiar imagen de fondo del bucal dinámicamente
            if (baseMouthguard && imagenesBucal[seleccionVista]) {
                baseMouthguard.src = imagenesBucal[seleccionVista];
            }

            // Cambiar posición física y deformación del texto usando clases CSS
            if (previewText) {
                previewText.classList.remove('vista-frontal', 'vista-izquierdo', 'vista-derecho');
                previewText.classList.add(`vista-${seleccionVista}`);
            }

            // Mapear nombre legible para la bandeja de entrada del email
            let nombreLegibleVista = "Frontal";
            if (seleccionVista === 'izquierdo') nombreLegibleVista = "Lateral Izquierdo";
            if (seleccionVista === 'derecho') nombreLegibleVista = "Lateral Derecho";

            // Almacenar en el input oculto si existe
            if (formCustomVista) {
                formCustomVista.value = nombreLegibleVista;
            }
        });
    });

    // 2. CONTROL DE TEXTO EN VIVO
    if (customInput && previewText) {
        customInput.addEventListener('input', (e) => {
            let userText = e.target.value.toUpperCase(); // Forzar mayúsculas estilo combat
            
            if (userText.trim() === "") {
                previewText.innerText = "TU NOMBRE";
                if (formCustomText) formCustomText.value = "TU NOMBRE";
            } else {
                previewText.innerText = userText;
                if (formCustomText) formCustomText.value = userText; // Se guarda para el email
            }
        });
    }

    // 3. CONTROL DE COLOR EN VIVO
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa al botón anterior de forma segura
            const activeColor = document.querySelector('.color-btn.active');
            if (activeColor) {
                activeColor.classList.remove('active');
            }
            
            // Añadir clase activa al pulsado
            button.classList.add('active');

            // Capturar el color hexadecimal seleccionado
            const selectedColor = button.getAttribute('data-color');
            
            // Aplicar el color al texto flotante
            if (previewText) {
                previewText.style.color = selectedColor;
            }
            
            // Guardar el color en el campo oculto para el email
            if (formCustomColor) {
                formCustomColor.value = selectedColor;
            }
        });
    });

    // 4. CONTROL DE FUENTE / TIPOGRAFÍA EN VIVO
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
            
            if (formCustomFont) {
                formCustomFont.value = fontFriendlyName;
            }
        });
    }
});
