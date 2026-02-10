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
    const successMsg = document.getElementById('success-msg');
    const mensajeArea = document.getElementById('mensaje');

    // Función para actualizar el mensaje automático según el material seleccionado
    const updateAutoMessage = () => {
        const material = document.querySelector('input[name="material_custom"]:checked');
        if (mensajeArea && material) {
            mensajeArea.value = `Hola Iron Jaw, estoy interesado en el protector IRON JAW CUSTOM con protección ${material.value}.`;
        }
    };

    // Escuchar cambios en los botones de radio del material
    document.querySelectorAll('input[name="material_custom"]').forEach(radio => {
        radio.addEventListener('change', updateAutoMessage);
    });

    // Ejecutar una vez al cargar para que ya tenga el mensaje por defecto
    updateAutoMessage();

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            if (successMsg) successMsg.style.display = 'none';

            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (nombre && nombre.value.trim() === '') {
                showError('error-nombre');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value.trim())) {
                showError('error-email');
                isValid = false;
            }

            if (isValid) {
                const originalBtnText = submitBtn.innerText;
                submitBtn.innerText = 'Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    if (successMsg) successMsg.style.display = 'block';
                    contactForm.reset();
                    updateAutoMessage(); // Reiniciar el mensaje tras el reset
                    
                    setTimeout(() => {
                        if (successMsg) successMsg.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    function showError(elementId) {
        const errEl = document.getElementById(elementId);
        if (errEl) errEl.style.display = 'block';
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
});
