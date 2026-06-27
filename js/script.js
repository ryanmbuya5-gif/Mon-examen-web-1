// ============================================
// 1. MENU BURGER (navigation mobile)
// ============================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Quand on clique sur le burger, le menu s'ouvre/ferme
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// ============================================
// 2. CARROUSEL AUTOMATIQUE
// ============================================
let slideIndex = 0;
let autoSlideInterval;

// Fonction pour changer de slide
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    
    // Enlever la classe active du slide actuel
    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');
    
    // Calculer le nouvel index
    slideIndex = (slideIndex + direction + slides.length) % slides.length;
    
    // Ajouter la classe active au nouveau slide
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    // Déplacer le carrousel
    const slideContainer = document.querySelector('.carousel-slide');
    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Réinitialiser le timer automatique
    resetAutoSlide();
}

// Fonction pour aller directement à un slide spécifique
function currentSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    
    // Enlever la classe active
    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');
    
    // Mettre à jour l'index
    slideIndex = index;
    
    // Ajouter la classe active
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    // Déplacer le carrousel
    const slideContainer = document.querySelector('.carousel-slide');
    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Réinitialiser le timer automatique
    resetAutoSlide();
}

// Fonction pour le défilement automatique
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change toutes les 5 secondes
}

// Fonction pour réinitialiser le timer automatique
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ============================================
// 3. VALIDATION DE FORMULAIRE (page contact)
// ============================================
function validateForm() {
    // Récupérer les valeurs des champs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Valider le nom (minimum 2 caractères)
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Le nom doit contenir au moins 2 caractères';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }
    
    // Valider l'email (format valide)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Veuillez entrer un email valide';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
    
    // Valider le sujet (minimum 3 caractères)
    if (subject.length < 3) {
        document.getElementById('subjectError').textContent = 'Le sujet doit contenir au moins 3 caractères';
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('subjectError').style.display = 'none';
    }
    
    // Valider le message (minimum 10 caractères)
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('messageError').style.display = 'none';
    }
    
    if (isValid) {
        alert('✅ Message envoyé avec succès !\n\nNous vous répondrons dans les plus brefs délais.');
        document.getElementById('contactForm').reset();
    }
    
    return false; // Empêche l'envoi réel du formulaire pour la démo
}

// ============================================
// 4. CHARGEMENT DE LA PAGE
// ============================================
// Démarrer le carrousel automatique quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si le carrousel existe sur la page
    if (document.querySelector('.carousel-slide')) {
        startAutoSlide();
    }
});

// ============================================
// 5. ANIMATION AU SCROLL (optionnel)
// ============================================
// Ajouter une classe aux éléments quand ils apparaissent à l'écran
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.feature-card, .service-card, .team-member, .portfolio-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // Si l'élément est visible dans la fenêtre
        if (position.top < window.innerHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// ============================================
// 6. EFFET SUR LE HEADER AU SCROLL
// ============================================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// 7. GESTION DU BURGER (version améliorée)
// ============================================
// Ajouter une classe pour l'animation du burger
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
}




// ============================================
// EFFET PARALLAXE - À AJOUTER À LA FIN DE main.js
// ============================================

// 1. Effet de profondeur au survol des cartes
document.querySelectorAll('.service-card, .team-member, .feature-card, .portfolio-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// 2. Révélation au scroll
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);