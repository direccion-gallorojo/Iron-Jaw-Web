document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENÚ HAMBURGUESA Y NAVEGACIÓN
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       2. BANNER DE COOKIES
       ========================================================================== */
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.classList.remove('hidden');
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.add('hidden');
        });
    }

    /* ==========================================================================
       3. MODAL DE GALERÍA DE TRABAJOS (LIGHTBOX)
       ========================================================================== */
    const modalGallery = document.getElementById('modalGallery');
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const closeGalleryBtn = document.querySelector('.close-button-gallery');
    const trabajoItems = document.querySelectorAll('.trabajo-item img');

    if (modalGallery && mainGalleryImage) {
        trabajoItems.forEach(img => {
            img.addEventListener('click', () => {
                mainGalleryImage.src = img.src;
                mainGalleryImage.alt = img.alt;
                modalGallery.style.display = 'flex';
            });
        });

        if (closeGalleryBtn) {
            closeGalleryBtn.addEventListener('click', () => {
                modalGallery.style.display = 'none';
            });
        }

        modalGallery.addEventListener('click', (e) => {
            if (e.target === modalGallery) {
                modalGallery.style.display = 'none';
            }
        });
    }

    /* ==========================================================================
       4. PERSONALIZADOR DE BUCALES CON CANVAS Y MÁSCARA
       ========================================================================== */
    const canvas = document.getElementById('mouthguardCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Cargar imágenes
        const imgPlancha = new Image();
        imgPlancha.src = 'images/plantilla-plancha.png';

        const imgMascara = new Image();
        imgMascara.src = 'images/mascara.png';

        let userImage = null;

        // Estado de la imagen del cliente
        let imageState = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            scale: 1,
            rotation: 0
        };

        // Estado de configuración del bucal
        let configState = {
            baseColor: '#FFFFFF',
            text: 'TITÁN',
            textColor: '#1a1a1a',
            fontFamily: 'Impact'
        };

        let planchaLoaded = false;
        let mascaraLoaded = false;

        imgPlancha.onload = () => {
            planchaLoaded = true;
            renderCanvas();
        };

        imgMascara.onload = () => {
            mascaraLoaded = true;
            renderCanvas();
        };

        imgPlancha.onerror = () => {
            console.warn('No se encontró images/plantilla-plancha.png');
            renderCanvas();
        };

        imgMascara.onerror = () => {
            console.warn('No se encontró images/mascara.png');
            renderCanvas();
        };

        // RENDERIZADO CANVAS CON FONDO BLANCO Y CORRECCIÓN DE CAPAS
        function renderCanvas() {
            // 1. Limpiar lienzo y fijar el marco exterior SIEMPRE en Blanco
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Dibujar la BASE DEL PROTECTOR BUCAL (Aplica color base solo dentro de la máscara)
            if (mascaraLoaded) {
                const baseCanvas = document.createElement('canvas');
                baseCanvas.width = canvas.width;
                baseCanvas.height = canvas.height;
                const baseCtx = baseCanvas.getContext('2d');

                // Rellenar con el color de base elegido (Azul, Rojo, Negro, Blanco)
                baseCtx.fillStyle = configState.baseColor;
                baseCtx.fillRect(0, 0, canvas.width, canvas.height);

                // Recortar la base para que solo ocupe la forma del protector
                baseCtx.globalCompositeOperation = 'destination-in';
                baseCtx.drawImage(imgMascara, 0, 0, canvas.width, canvas.height);

                // Dibujar el protector coloreado sobre el fondo blanco
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(baseCanvas, 0, 0);
            } else {
                // Fallback en caso de que no cargue la máscara
                ctx.fillStyle = configState.baseColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // 3. Dibujar Imagen del Usuario dentro de la Máscara
            if (userImage && mascaraLoaded) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempCtx = tempCanvas.getContext('2d');

                // Dibuja la imagen del cliente con sus transformaciones (pos, escala)
                tempCtx.save();
                tempCtx.translate(imageState.x, imageState.y);
                tempCtx.scale(imageState.scale, imageState.scale);
                tempCtx.drawImage(
                    userImage,
                    -userImage.width / 2,
                    -userImage.height / 2
                );
                tempCtx.restore();

                // Recorta la imagen basándose exclusivamente en la silueta de mascara.png
                tempCtx.globalCompositeOperation = 'destination-in';
                tempCtx.drawImage(imgMascara, 0, 0, canvas.width, canvas.height);

                // Plasma la imagen recortada encima de la base
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(tempCanvas, 0, 0);
            }

            // 4. Capa de Textura, Relieve y Sombras (Plantilla Plancha)
            if (planchaLoaded) {
                ctx.save();
                ctx.globalCompositeOperation = 'multiply';
                ctx.drawImage(imgPlancha, 0, 0, canvas.width, canvas.height);
                ctx.restore();
            }

            // 5. Capa de Texto
            if (configState.text) {
                ctx.save();
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = configState.textColor;
                ctx.font = `bold 75px ${configState.fontFamily}, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(configState.text, canvas.width / 2, canvas.height / 2 + 20);
                ctx.restore();
            }

            // Guardar DataURL en el formulario
            const dataInput = document.getElementById('formCanvasData');
            if (dataInput) {
                dataInput.value = canvas.toDataURL('image/png');
            }
        }

        // Función para calcular la escala Inteligente (Garantiza que no se corte por alto/ancho)
        function calculateSmartScale() {
            if (!userImage) return 1;
            // Definimos un área segura (75% ancho, 75% alto) para que quepa la imagen completa
            const safeWidth = canvas.width * 0.75;
            const safeHeight = canvas.height * 0.75;

            const scaleX = safeWidth / userImage.width;
            const scaleY = safeHeight / userImage.height;

            // 'Contain': Toma la menor escala para asegurar que el logo completo sea visible
            return Math.min(scaleX, scaleY);
        }

        // Aplicar ajuste automático inteligente
        function applyFitCover() {
            if (!userImage) return;
            imageState.scale = calculateSmartScale();
            imageState.x = canvas.width / 2;
            imageState.y = canvas.height / 2;

            const scaleRange = document.getElementById('scaleRange');
            if (scaleRange) {
                scaleRange.value = imageState.scale;
            }
            renderCanvas();
        }

        // Selección de color base
        document.querySelectorAll('.color-base-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-base-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                configState.baseColor = btn.getAttribute('data-base-color');
                const formBaseColor = document.getElementById('formBaseColor');
                if (formBaseColor) formBaseColor.value = configState.baseColor;
                renderCanvas();
            });
        });

        // Subida de imagen
        const uploadInput = document.getElementById('uploadImage');
        const transformControls = document.getElementById('imageTransformControls');
        const btnRemove = document.getElementById('btnRemoveImage');

        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        userImage = new Image();
                        userImage.onload = () => {
                            // Muestra controles
                            if (transformControls) transformControls.style.display = 'block';
                            if (btnRemove) btnRemove.style.display = 'inline-block';

                            // Auto-fit inicial automático con ajuste inteligente
                            applyFitCover();
                        };
                        userImage.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (btnRemove) {
            btnRemove.addEventListener('click', () => {
                userImage = null;
                if (uploadInput) uploadInput.value = '';
                if (transformControls) transformControls.style.display = 'none';
                btnRemove.style.display = 'none';
                renderCanvas();
            });
        }

        // Slider de Zoom / Escala
        const scaleRange = document.getElementById('scaleRange');
        if (scaleRange) {
            scaleRange.addEventListener('input', (e) => {
                imageState.scale = parseFloat(e.target.value);
                renderCanvas();
            });
        }

        // Botón: Ajustar a todo el bucal
        const btnFitCover = document.getElementById('btnFitCover');
        if (btnFitCover) {
            btnFitCover.addEventListener('click', () => {
                applyFitCover();
            });
        }

        // Botón: Centrar imagen
        const btnCenterImage = document.getElementById('btnCenterImage');
        if (btnCenterImage) {
            btnCenterImage.addEventListener('click', () => {
                imageState.x = canvas.width / 2;
                imageState.y = canvas.height / 2;
                renderCanvas();
            });
        }

        // Botón: Restablecer
        const btnResetTransform = document.getElementById('btnResetTransform');
        if (btnResetTransform) {
            btnResetTransform.addEventListener('click', () => {
                applyFitCover();
            });
        }

        // Texto e Iconos
        const textInput = document.getElementById('customText');
        if (textInput) {
            textInput.addEventListener('input', (e) => {
                configState.text = e.target.value;
                const formCustomText = document.getElementById('formCustomText');
                if (formCustomText) formCustomText.value = configState.text;
                renderCanvas();
            });
        }

        document.querySelectorAll('.btn-quick-emoji').forEach(btn => {
            btn.addEventListener('click', () => {
                if (textInput) {
                    textInput.value += btn.getAttribute('data-emoji');
                    configState.text = textInput.value;
                    const formCustomText = document.getElementById('formCustomText');
                    if (formCustomText) formCustomText.value = configState.text;
                    renderCanvas();
                }
            });
        });

        // Color del texto
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                configState.textColor = btn.getAttribute('data-color');
                const formCustomColor = document.getElementById('formCustomColor');
                if (formCustomColor) formCustomColor.value = configState.textColor;
                renderCanvas();
            });
        });

        // Tipografía
        const fontSelector = document.getElementById('fontSelector');
        if (fontSelector) {
            fontSelector.addEventListener('change', (e) => {
                configState.fontFamily = e.target.value;
                const formCustomFont = document.getElementById('formCustomFont');
                if (formCustomFont) formCustomFont.value = configState.fontFamily;
                renderCanvas();
            });
        }

        // Arrastre en Canvas (Mouse y Touch)
        let isDragging = false;
        let startX, startY;

        function getCanvasCoordinates(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        function startDrag(e) {
            if (!userImage) return;
            isDragging = true;
            const coords = getCanvasCoordinates(e);
            startX = coords.x - imageState.x;
            startY = coords.y - imageState.y;
            canvas.style.cursor = 'grabbing';
        }

        function doDrag(e) {
            if (!isDragging || !userImage) return;
            e.preventDefault();
            const coords = getCanvasCoordinates(e);
            imageState.x = coords.x - startX;
            imageState.y = coords.y - startY;
            renderCanvas();
        }

        function stopDrag() {
            isDragging = false;
            canvas.style.cursor = 'grab';
        }

        canvas.addEventListener('mousedown', startDrag);
        canvas.addEventListener('mousemove', doDrag);
        window.addEventListener('mouseup', stopDrag);

        canvas.addEventListener('touchstart', startDrag, { passive: false });
        canvas.addEventListener('touchmove', doDrag, { passive: false });
        window.addEventListener('touchend', stopDrag);

        // Primer render inicial
        renderCanvas();
    }
});

/* ==========================================================================
   5. VISOR POP-UP PARA CAMISETAS
   ========================================================================== */
function openShirtModal(imgSrc, captionText) {
    const shirtModal = document.getElementById('shirtModal');
    const shirtModalImg = document.getElementById('shirtModalImg');
    const shirtModalCaption = document.getElementById('shirtModalCaption');

    if (shirtModal && shirtModalImg) {
        shirtModalImg.src = imgSrc;
        if (shirtModalCaption) shirtModalCaption.textContent = captionText;
        shirtModal.style.display = 'block';
    }
}

function closeShirtModal() {
    const shirtModal = document.getElementById('shirtModal');
    if (shirtModal) {
        shirtModal.style.display = 'none';
    }
}
