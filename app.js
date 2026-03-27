document.addEventListener('DOMContentLoaded', () => {
    // Navbar Sticky Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.hasAttribute('target')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if(target) {
                        const navHeight = navbar.offsetHeight;
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });

    // Animation au défilement (Fade In Up basique)
    const fadeElements = document.querySelectorAll('.usp-card, .domain-card, .metric-card');
    
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeObserver.observe(el);
    });
});
