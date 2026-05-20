// Permitir sonido cuando el usuario interactúa con la página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar instrucción de clic
    const playInfo = document.querySelector('.play-info p');
    
    // Permitir que el usuario habilite el sonido con clic
    const videoContainer = document.querySelector('.video-container');
    
    videoContainer.addEventListener('click', function() {
        const iframe = document.getElementById('youtubePlayer');
        // Recargar el iframe sin mute para permitir sonido
        iframe.src = 'https://www.youtube.com/embed/otGz6hz-AXo?autoplay=1';
    });

    // Animación de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los cards
    const cards = document.querySelectorAll('.card:not(.fade-in)');
    cards.forEach(card => observer.observe(card));

    // Smooth scroll para los links de navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de scroll en la navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Contador de visitas (opcional)
    let visitCount = localStorage.getItem('bossaNovaVisits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('bossaNovaVisits', visitCount);
    console.log(`Visitas: ${visitCount}`);
});

// Función para detectar cuando el usuario hace clic en el video
document.addEventListener('click', function(e) {
    if (e.target.closest('.video-container')) {
        // Ya manejado arriba
    }
});

// Scroll reveal para elementos
function revealOnScroll() {
    const reveals = document.querySelectorAll('.card, .cultural-card, .timeline-item');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Inicializar reveal en carga
revealOnScroll();