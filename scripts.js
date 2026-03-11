document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica del Menú Móvil ---
    // (Exactamente igual que el original)
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
            // HEMOS QUITADO e.preventDefault() -> Ahora el formulario SÍ sale de la web
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (submitBtn) {
                // Mantenemos tu efecto visual de cambio de texto
                submitBtn.innerText = 'Enviando...';
                submitBtn.disabled = true;
            }
            
            // El navegador ahora enviará los datos a FormSubmit automáticamente
        });
    }

    // --- Lógica del Aviso de Cookies ---
    // (Exactamente igual que el original)
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
