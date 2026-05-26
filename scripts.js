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

    // --- Lógica del Formulario de Contacto ---
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
            cookieBanner.classList.add('hidden');
        });
    }

    // ==========================================================================
    // NUEVA LÓGICA EXCLUSIVA: IRON JAW CUSTOMIZER INTERACTIVO (CON VISTAS 3D Y AUTO-ESCALA)
    // ==========================================================================
    
    // Elementos visuales del lienzo y controles del simulador
    const customInput = document.getElementById('customText');
    const previewText = document.getElementById('previewText');
    const fontSelector = document.getElementById('fontSelector');
    const colorButtons = document.querySelectorAll('.color-btn');
    const vistaButtons = document.querySelectorAll('.btn-vista');
    const productImg = document.querySelector('.canvas-wrapper img'); // Imagen principal del protector

    // Campos ocultos del formulario para persistencia de datos (Envío por Email)
    const formCustomText = document.getElementById('formCustomText');
    const formCustomColor = document.getElementById('formCustomColor');
    const formCustomFont = document.getElementById('formCustomFont');
    const formCustomVista = document.getElementById('formCustomVista') || document.createElement('input'); 
    
    // Configuración inicial de campos si no existen en el DOM
    if (!document.getElementById('formCustomVista') && contactForm) {
        formCustomVista.type = 'hidden';
        formCustomVista.id = 'formCustomVista';
        formCustomVista.name = 'custom_vista';
        formCustomVista.value = 'Frontal';
        contactForm.appendChild(formCustomVista);
    }

    /**
     * Algoritmo de Auto-escalado Tipográfico Dinámico
     * Previene desbordamientos físicos en el lienzo ajustando el tamaño del rem según los caracteres.
     */
    const ajustarTamanoTexto = (texto) => {
        if (!previewText) return;
        const longitud = texto.length;
        
        // Determinar base por el ancho de la pantalla (Mobile vs Desktop)
        const esMovil = window.innerWidth <= 768;
        
        let baseSize = esMovil ? 1.2 : 1.6; // Tamaños definidos en el CSS original

        if (longitud > 5) {
            // Factor de reducción progresivo a partir de 6 caracteres
            const factorReduccion = (longitud - 5) * (esMovil ? 0.08 : 0.12);
            let nuevoSize = baseSize - factorReduccion;
            
            // Límite mínimo de lectura segura para que no colapse por completo
            const minSize = esMovil ? 0.75 : 0.95;
            if (nuevoSize < minSize) nuevoSize = minSize;
            
            previewText.style.fontSize = `${nuevoSize}rem`;
        } else {
            previewText.style.fontSize = `${baseSize}rem`;
        }
    };

    // 1. CONTROL DE TEXTO EN VIVO CON RESTRICCIONES DE COMBATE
    if (customInput && previewText) {
        customInput.addEventListener('input', (e) => {
            let userText = e.target.value.toUpperCase(); // Forzar estética mayúsculas combat
            
            if (userText.trim() === "") {
                previewText.innerText = "TU NOMBRE";
                if (formCustomText) formCustomText.value = "TU NOMBRE";
                ajustarTamanoTexto("TU NOMBRE");
            } else {
                previewText.innerText = userText;
                if (formCustomText) formCustomText.value = userText;
                ajustarTamanoTexto(userText);
            }
        });
    }

    // 2. CONTROL DE COLOR EN VIVO
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeColorBtn = document.querySelector('.color-btn.active');
            if (activeColorBtn) activeColorBtn.classList.remove('active');
            
            button.classList.add('active');

            // Extraer y plasmar el color hexadecimal elegido
            const selectedColor = button.getAttribute('data-color');
            if (previewText) previewText.style.color = selectedColor;
            
            if (formCustomColor) formCustomColor.value = selectedColor;
        });
    });

    // 3. CONTROL DE FUENTE / TIPOGRAFÍA EN VIVO
    if (fontSelector && previewText) {
        fontSelector.addEventListener('change', (e) => {
            const selectedClass = e.target.value;
            
            // Saneamiento de las clases de fuentes previas
            previewText.classList.remove('tipografia-mma', 'tipografia-classic', 'tipografia-modern');
            previewText.classList.add(selectedClass);

            // Mapeo legible para la recepción de leads de producción
            let fontFriendlyName = "Combat (Impact)";
            if (selectedClass === 'tipografia-classic') fontFriendlyName = "Deportivo Clásico (Monospace)";
            if (selectedClass === 'tipografia-modern') fontFriendlyName = "Diseño Moderno (Italic)";
            
            if (formCustomFont) formCustomFont.value = fontFriendlyName;
        });
    }

    // 4. MOTOR INTERACTIVO DE PERSPECTIVAS Y VISTAS 3D
    vistaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeVistaBtn = document.querySelector('.btn-vista.active');
            if (activeVistaBtn) activeVistaBtn.classList.remove('active');
            
            button.classList.add('active');

            const vistaSeleccionada = button.getAttribute('data-vista'); // frontal | izquierdo | derecho
            
            // A) Actualizar imagen del protector según la perspectiva técnica
            if (productImg) {
                // Mapeo de rutas de imágenes dinámicas. Asegúrate de tener estas imágenes en tu proyecto.
                if (vistaSeleccionada === 'frontal') {
                    productImg.src = 'img/bucal-frontal.png'; 
                } else if (vistaSeleccionada === 'izquierdo') {
                    productImg.src = 'img/bucal-izquierdo.png';
                } else if (vistaSeleccionada === 'derecho') {
                    productImg.src = 'img/bucal-derecho.png';
                }
            }

            // B) Mutar clases CSS para aplicar deformaciones de perspectiva 3D (Skew, Rotate, Position)
            if (previewText) {
                previewText.classList.remove('vista-frontal', 'vista-izquierdo', 'vista-derecho');
                previewText.classList.add(`vista-${vistaSeleccionada}`);
            }

            // C) Guardar metadato en input oculto para procesar el pedido final
            const nombresVistas = { 'frontal': 'Frontal', 'izquierdo': 'Lado Izquierdo', 'derecho': 'Lado Derecho' };
            formCustomVista.value = nombresVistas[vistaSeleccionada] || 'Frontal';
            
            // Re-ejecutar la escala tipográfica ya que los límites de espacio cambian en los laterales
            const textoActual = customInput ? customInput.value : "TU NOMBRE";
            ajustarTamanoTexto(textoActual.trim() === "" ? "TU NOMBRE" : textoActual);
        });
    });

    // Ajustar escala tipográfica si el usuario rota la pantalla del dispositivo móvil
    window.addEventListener('resize', () => {
        const textoActual = customInput ? customInput.value : "TU NOMBRE";
        ajustarTamanoTexto(textoActual.trim() === "" ? "TU NOMBRE" : textoActual);
    });
});
