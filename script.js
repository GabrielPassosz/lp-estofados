/* ===== LP ESTOFADOS - SCRIPT UNIFICADO ===== */
/* ===== MOBILE MENU CORRIGIDO ===== */
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        
        if (!this.menuToggle || !this.navMenu) return;
        
        this.init();
    }
    
    init() {
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Fechar ao clicar em um link
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Fechar ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.closeMenu();
            }
        });
        
        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active')) {
                if (!this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
                    this.closeMenu();
                }
            }
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new DynamicHeader();
    new CountUpAnimation();
    new BackToTop();
    new SmoothScroll();
    new BeforeAfterSlider();
    new FAQ();
    new Carousel();
    new FormHandler();
    new ScrollReveal();  // <--- ADICIONE ESTA LINHA
});

// Header dinâmico
class DynamicHeader {
    constructor() {
        this.header = document.getElementById('navbar');
        if (!this.header) return;
        window.addEventListener('scroll', () => this.onScroll());
    }
    
    onScroll() {
        if (window.scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// Contadores animados
class CountUpAnimation {
    constructor() {
        this.elements = document.querySelectorAll('[data-target]');
        if (!this.elements.length) return;
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.countUp(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });
        
        this.elements.forEach(el => observer.observe(el));
    }
    
    countUp(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('pt-BR');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString('pt-BR');
            }
        }, 16);
    }
}

// Back to Top
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.toggleButton());
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    toggleButton() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }
    
    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

// Before/After Slider
class BeforeAfterSlider {
    constructor() {
        this.slider = document.querySelector('.comparison-slider');
        if (!this.slider) return;
        
        this.afterImage = this.slider.querySelector('.comparison-slider__after');
        this.handle = this.slider.querySelector('.comparison-slider__handle');
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        this.slider.addEventListener('mousedown', () => this.startDrag());
        this.slider.addEventListener('mousemove', (e) => this.drag(e));
        this.slider.addEventListener('mouseup', () => this.stopDrag());
        this.slider.addEventListener('mouseleave', () => this.stopDrag());
        
        this.slider.addEventListener('touchstart', () => this.startDrag());
        this.slider.addEventListener('touchmove', (e) => this.drag(e));
        this.slider.addEventListener('touchend', () => this.stopDrag());
    }
    
    startDrag() { this.isDragging = true; }
    stopDrag() { this.isDragging = false; }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const rect = this.slider.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        if (e.touches) x = e.touches[0].clientX - rect.left;
        
        x = Math.max(0, Math.min(x, rect.width));
        const percentage = (x / rect.width) * 100;
        
        this.afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        this.handle.style.left = `${percentage}%`;
    }
}

// FAQ Accordion
class FAQ {
    constructor() {
        this.questions = document.querySelectorAll('.faq__question');
        if (!this.questions.length) return;
        this.init();
    }
    
    init() {
        this.questions.forEach(question => {
            question.addEventListener('click', () => this.toggleAnswer(question));
        });
    }
    
    toggleAnswer(button) {
        const answer = button.nextElementSibling;
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        
        this.questions.forEach(q => {
            if (q !== button) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling?.setAttribute('hidden', '');
            }
        });
        
        button.setAttribute('aria-expanded', !isOpen);
        if (isOpen) {
            answer.setAttribute('hidden', '');
        } else {
            answer.removeAttribute('hidden');
        }
    }
}

// Carousel
class Carousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.dotsContainer = document.getElementById('carouselDots');
        
        if (!this.track) return;
        
        this.cards = Array.from(this.track.children);
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.updateCarousel();
        this.createDots();
        
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        
        this.startAutoPlay();
        
        this.track.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth + 24;
        this.track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
        
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        this.cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === this.currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                this.currentIndex = i;
                this.updateCarousel();
                this.resetAutoPlay();
            });
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = document.querySelectorAll('.dot');
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Form Handler with WhatsApp
class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const service = document.getElementById('service')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        let whatsappMessage = `*NOVO ORÇAMENTO LP ESTOFADOS*%0A%0A`;
        whatsappMessage += `*Nome:* ${name}%0A`;
        whatsappMessage += `*Email:* ${email}%0A`;
        whatsappMessage += `*Telefone:* ${phone}%0A`;
        whatsappMessage += `*Serviço:* ${service}%0A`;
        if (message) whatsappMessage += `*Mensagem:* ${message}%0A`;
        
        window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, '_blank');
        this.form.reset();
    }
}
// ===== SCROLL REVEAL - Faz os elementos aparecerem ao rolar =====
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        if (this.elements.length === 0) return;
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}



// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new DynamicHeader();
    new CountUpAnimation();
    new BackToTop();
    new SmoothScroll();
    new BeforeAfterSlider();
    new FAQ();
    new Carousel();
    new FormHandler();
});