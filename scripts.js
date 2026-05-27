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
        contactForm.addEventListener('submit', function(e) {
            // Nota: Descomenta e.preventDefault() si vas a procesar el envío mediante AJAX/Fetch
            // e.preventDefault(); 
            
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
    const emojiButtons = document.querySelectorAll('.btn-quick-emoji'); // NUEVO: Botones de emojis rápidos

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
     * Algoritmo de Auto-escalado Tipográfico Dinámico (AFINADO)
     * Previene desbordamientos físicos en el lienzo ajustando el tamaño del rem según los caracteres.
     */
    const ajustarTamanoTexto = (texto) => {
        if (!previewText) return;
        const longitud = texto.length;
        
        // Determinar base por el ancho de la pantalla (Mobile vs Desktop)
        const esMovil = window.innerWidth <= 768;
        
        let baseSize = esMovil ? 1.2 : 1.6; // Tamaños definidos en el CSS original

        // AFINADO: Empezar a reducir a partir de 4 caracteres (en lugar de 5)
        // Esto asegura que "TITAN" o emojis dobles se encogerán lo suficiente para las vistas laterales.
        if (longitud > 3) {
            // Factor de reducción progresivo y más agresivo
            const factorReduccion = (longitud - 3) * (esMovil ? 0.10 : 0.15);
            let nuevoSize = baseSize - factorReduccion;
            
            // Límite mínimo de lectura segura reajustado
            const minSize = esMovil ? 0.70 : 0.90;
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

    // NUEVO: 1B. INYECCIÓN DE EMOJIS RÁPIDOS EN EL SIMULADOR
    emojiButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!customInput || !previewText) return;

            const emoji = button.getAttribute('data-emoji');
            
            // Comprobar si el texto actual es el placeholder por defecto o está vacío
            if (customInput.value.trim() === "") {
                customInput.value = emoji;
            } else {
                // Verificar el límite máximo de caracteres (8) antes de añadirlo
                if (customInput.value.length < 8) {
                    customInput.value += emoji;
                } else {
                    return; // Si ya llegó al límite de caracteres, no hace nada
                }
            }

            // Forzar actualización visual inmediata idéntica al evento de escritura manual
            const textoActualizado = customInput.value.toUpperCase();
            previewText.innerText = textoActualizado;
            
            if (formCustomText) formCustomText.value = textoActualizado;
            ajustarTamanoTexto(textoActualizado);
        });
    });

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

    // 3. CONTROL DE FUENTE / TIPOGRAFÍA EN VIVO (CON NUEVAS FUENTES URBANAS)
    if (fontSelector && previewText) {
        fontSelector.addEventListener('change', (e) => {
            const selectedClass = e.target.value;
            
            // Saneamiento completo incluyendo las nuevas clases de fuentes
            previewText.classList.remove(
                'tipografia-mma', 
                'tipografia-classic', 
                'tipografia-modern',
                'tipografia-grafiti',
                'tipografia-ruda',
                'tipografia-stencil'
            );
            previewText.classList.add(selectedClass);

            // Mapeo legible para la recepción de leads de producción
            let fontFriendlyName = "Combat (Impact)";
            if (selectedClass === 'tipografia-classic') fontFriendlyName = "Deportivo Clásico (Monospace)";
            if (selectedClass === 'tipografia-modern') fontFriendlyName = "Diseño Moderno (Italic)";
            if (selectedClass === 'tipografia-grafiti') fontFriendlyName = "Urbano Grafiti (Permanent Marker)";
            if (selectedClass === 'tipografia-ruda') fontFriendlyName = "Estilo Rudo (Rubik Dirt)";
            if (selectedClass === 'tipografia-stencil') fontFriendlyName = "Militar Stencil (Black Ops One)";
            
            if (formCustomFont) formCustomFont.value = fontFriendlyName;
        });
    }

    // 4. MOTOR INTERACTIVO DE PERSPECTIVAS Y VISTAS 3D (RUTAS CORREGIDAS CARPETA IMAGES)
    vistaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeVistaBtn = document.querySelector('.btn-vista.active');
            if (activeVistaBtn) activeVistaBtn.classList.remove('active');
            
            button.classList.add('active');

            const vistaSeleccionada = button.getAttribute('data-vista'); // frontal | izquierdo | derecho
            
            // A) Actualizar imagen del protector apuntando a la carpeta /images/
            if (productImg) {
                if (vistaSeleccionada === 'frontal') {
                    productImg.src = 'images/bucal-frontal.png'; 
                } else if (vistaSeleccionada === 'izquierdo') {
                    productImg.src = 'images/bucal-lado-izquierdo.png';
                } else if (vistaSeleccionada === 'derecho') {
                    productImg.src = 'images/bucal-lado-derecho.png';
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
