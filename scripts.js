document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica del Menú Móvil ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('success-msg');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Resetear mensajes de error
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
        successMsg.style.display = 'none';

        let isValid = true;
        
        // Obtener valores
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const deporte = document.getElementById('deporte');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Validación Simple
        if (nombre.value.trim() === '') {
            showError('error-nombre');
            isValid = false;
        }

        if (email.value.trim() === '' || !email.value.includes('@')) {
            showError('error-email');
            isValid = false;
        }

        if (isValid) {
            // Simular envío al backend
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Simulación de éxito tras 1.5 segundos
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                successMsg.style.display = 'block';
                contactForm.reset();
                
                // Ocultar mensaje de éxito tras 5 segundos
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });

    function showError(elementId) {
        document.getElementById(elementId).style.display = 'block';
    }

    // Efecto suave al hacer scroll (Polyfill simple para navegadores viejos si fuera necesario, 
    // pero CSS scroll-behavior suele bastar)
});