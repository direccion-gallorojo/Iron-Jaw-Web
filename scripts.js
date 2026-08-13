document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DEL MENÚ MÓVIL ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // --- 2. LÓGICA DEL FORMULARIO DE CONTACTO ---
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

    // --- 3. LÓGICA DEL AVISO DE COOKIES ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.remove('hidden');
    }

    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) cookieBanner.classList.add('hidden');
        });
    }

    // --- 4. LÓGICA DE LA GALERÍA MODAL (POP-UP) ---
    const modalGallery = document.getElementById('modalGallery');
    const closeGalleryBtn = document.querySelector('.close-button-gallery');
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');
    const openGalleryItems = document.querySelectorAll('.gallery-item, .trabajo-item');

    // Abrir Modal de Galería
    if (modalGallery && openGalleryItems.length > 0) {
        openGalleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img && mainGalleryImage) {
                    mainGalleryImage.src = img.src;
                    mainGalleryImage.alt = img.alt || 'Imagen de Galería';
                    modalGallery.style.display = 'block';
                }
            });
        });
    }

    // Cerrar Modal
    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', () => {
            modalGallery.style.display = 'none';
        });
    }

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modalGallery) {
            modalGallery.style.display = 'none';
        }
    });

    // Cambiar imagen principal mediante miniaturas
    if (galleryThumbnails.length > 0) {
        galleryThumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                if (mainGalleryImage) {
                    mainGalleryImage.src = this.src;
                }
                galleryThumbnails.forEach(t => t.classList.remove('active-thumb'));
                this.classList.add('active-thumb');
            });
        });
    }

    // ==========================================================================
    // 5. IRON JAW CUSTOMIZER INTERACTIVO (SIMULADOR DE PROTECTOR BUCAL)
    // ==========================================================================
    
    // Elementos del Simulador
    const customInput = document.getElementById('customText');
    const previewText = document.getElementById('previewText');
    const fontSelector = document.getElementById('fontSelector');
    const colorButtons = document.querySelectorAll('.color-btn');
    const vistaButtons = document.querySelectorAll('.btn-vista');
    const productImg = document.getElementById('baseMouthguard');
    const emojiButtons = document.querySelectorAll('.btn-quick-emoji');

    // Campos Ocultos para Formulario (Envío de Email)
    const formCustomText = document.getElementById('formCustomText');
    const formCustomColor = document.getElementById('formCustomColor');
    const formCustomFont = document.getElementById('formCustomFont');
    let formCustomVista = document.getElementById('formCustomVista');
    
    if (!formCustomVista && contactForm) {
        formCustomVista = document.createElement('input');
        formCustomVista.type = 'hidden';
        formCustomVista.id = 'formCustomVista';
        formCustomVista.name = 'custom_vista';
        formCustomVista.value = 'Frontal';
        contactForm.appendChild(formCustomVista);
    }

    /**
     * Algoritmo de Auto-escalado Tipográfico Dinámico
     */
    const ajustarTamanoTexto = (texto) => {
        if (!previewText) return;
        
        const longitud = Array.from(texto).length;
        const esMovil = window.innerWidth <= 768;
        let baseSize = esMovil ? 1.2 : 1.6;

        if (longitud > 3) {
            const factorReduccion = (longitud - 3) * (esMovil ? 0.10 : 0.15);
            let nuevoSize = baseSize - factorReduccion;
            const minSize = esMovil ? 0.70 : 0.90;
            if (nuevoSize < minSize) nuevoSize = minSize;
            
            previewText.style.fontSize = `${nuevoSize}rem`;
        } else {
            previewText.style.fontSize = `${baseSize}rem`;
        }
    };

    // Parche de inicialización en frío
    if (productImg && !productImg.src.includes('images/')) {
        productImg.src = 'images/bucal-blanco.png';
    }
    if (previewText) {
        const textoInicial = previewText.innerText || "TITÁN";
        ajustarTamanoTexto(textoInicial);
    }

    // A) CONTROL DE TEXTO EN VIVO
    if (customInput && previewText) {
        customInput.addEventListener('input', (e) => {
            let userText = e.target.value;
            
            let textToUppercase = "";
            for (let char of userText) {
                textToUppercase += (char.match(/[a-zñáéíóúü]/i)) ? char.toUpperCase() : char;
            }
            
            if (textToUppercase.trim() === "") {
                previewText.innerText = "TITÁN";
                if (formCustomText) formCustomText.value = "TITÁN";
                ajustarTamanoTexto("TITÁN");
            } else {
                previewText.innerText = textToUppercase;
                if (formCustomText) formCustomText.value = textToUppercase;
                ajustarTamanoTexto(textToUppercase);
            }
        });
    }

    // B) INYECCIÓN DE EMOJIS RÁPIDOS
    emojiButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (!customInput || !previewText) return;

            const emoji = button.getAttribute('data-emoji');
            const contenidoActual = customInput.value;
            const longitudVisualActual = Array.from(contenidoActual).length;
            
            if (contenidoActual.trim() === "") {
                customInput.value = emoji;
            } else {
                if (longitudVisualActual < 8) {
                    customInput.value += emoji;
                } else {
                    return; 
                }
            }

            const textoFinal = customInput.value;
            previewText.innerText = textoFinal;
            
            if (formCustomText) formCustomText.value = textoFinal;
            ajustarTamanoTexto(textoFinal);
        });
    });

    // C) CONTROL DE COLOR EN VIVO
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeColorBtn = document.querySelector('.color-btn.active');
            if (activeColorBtn) activeColorBtn.classList.remove('active');
            
            button.classList.add('active');

            const selectedColor = button.getAttribute('data-color');
            if (previewText) previewText.style.color = selectedColor;
            
            if (formCustomColor) formCustomColor.value = selectedColor;
        });
    });

    // D) CONTROL DE FUENTE EN VIVO
    if (fontSelector && previewText) {
        fontSelector.addEventListener('change', (e) => {
            const selectedClass = e.target.value;
            
            previewText.classList.remove(
                'tipografia-mma', 
                'tipografia-classic', 
                'tipografia-modern',
                'tipografia-grafiti',
                'tipografia-ruda',
                'tipografia-stencil'
            );
            previewText.classList.add(selectedClass);

            let fontFriendlyName = "Combat (Impact)";
            if (selectedClass === 'tipografia-classic') fontFriendlyName = "Deportivo Clásico (Monospace)";
            if (selectedClass === 'tipografia-modern') fontFriendlyName = "Diseño Moderno (Italic)";
            if (selectedClass === 'tipografia-grafiti') fontFriendlyName = "Urbano Grafiti (Permanent Marker)";
            if (selectedClass === 'tipografia-ruda') fontFriendlyName = "Estilo Rudo (Rubik Dirt)";
            if (selectedClass === 'tipografia-stencil') fontFriendlyName = "Militar Stencil (Black Ops One)";
            
            if (formCustomFont) formCustomFont.value = fontFriendlyName;
        });
    }

    // E) PERSPECTIVAS Y VISTAS 3D
    vistaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeVistaBtn = document.querySelector('.btn-vista.active');
            if (activeVistaBtn) activeVistaBtn.classList.remove('active');
            
            button.classList.add('active');

            const vistaSeleccionada = button.getAttribute('data-vista'); 
            
            if (productImg) {
                if (vistaSeleccionada === 'frontal') {
                    productImg.src = 'images/bucal-blanco.png';
                } else if (vistaSeleccionada === 'izquierdo') {
                    productImg.src = 'images/bucal-lado-izquierdo.png';
                } else if (vistaSeleccionada === 'derecho') {
                    productImg.src = 'images/bucal-lado-derecho.png';
                }
            }

            if (previewText) {
                previewText.classList.remove('vista-frontal', 'vista-izquierdo', 'vista-derecho');
                previewText.classList.add(`vista-${vistaSeleccionada}`);
            }

            const nombresVistas = { 'frontal': 'Frontal', 'izquierdo': 'Lado Izquierdo', 'derecho': 'Lado Derecho' };
            if (formCustomVista) {
                formCustomVista.value = nombresVistas[vistaSeleccionada] || 'Frontal';
            }
            
            const textoActual = customInput ? customInput.value : "TITÁN";
            ajustarTamanoTexto(textoActual.trim() === "" ? "TITÁN" : textoActual);
        });
    });

    // Recalcular tamaño de texto en caso de redimensionar la ventana
    window.addEventListener('resize', () => {
        const textoActual = customInput ? customInput.value : "TITÁN";
        ajustarTamanoTexto(textoActual.trim() === "" ? "TITÁN" : textoActual);
    });
});
