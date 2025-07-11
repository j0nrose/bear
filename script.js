// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 85, 48, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#2c5530';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .about-card, .gallery-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for statistics
const animateCounters = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h4');
            const target = parseInt(counter.textContent.replace(/,/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                    if (target < 100) {
                        counter.textContent += '+';
                    }
                }
            };
            
            updateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
};

const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
});

document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#28a745';
        
        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#2c5530';
        }, 3000);
    }, 1500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const bearSilhouette = document.querySelector('.bear-silhouette');
    
    if (hero && bearSilhouette) {
        const rate = scrolled * -0.5;
        bearSilhouette.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('.placeholder-image');
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.placeholder-image');
        image.style.transform = 'scale(1)';
    });
});

// Dynamic text animation for hero section
const heroTitle = document.querySelector('.hero-content h2');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < titleText.length) {
        heroTitle.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typewriter effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Bear roar sound effect simulation (visual feedback)
const bearElements = document.querySelectorAll('.bear-silhouette, .bear-illustration');
bearElements.forEach(bear => {
    bear.addEventListener('click', () => {
        bear.style.animation = 'none';
        bear.style.transform = 'scale(1.1)';
        bear.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            bear.style.transform = 'scale(1)';
            setTimeout(() => {
                bear.style.animation = bear.classList.contains('bear-silhouette') ? 'float 3s ease-in-out infinite' : 'sway 4s ease-in-out infinite';
            }, 200);
        }, 200);
    });
});

// Random fact generator
const bearFacts = [
    "Grizzly bears can run up to 35 mph, faster than any human!",
    "A grizzly bear's sense of smell is 7 times stronger than a bloodhound's.",
    "Grizzly bears can live up to 25 years in the wild.",
    "Despite their size, grizzly bears are excellent swimmers.",
    "Grizzly bears can weigh up to 790 pounds when fully grown.",
    "Baby grizzly bears are called cubs and are born blind and hairless.",
    "Grizzly bears hibernate for 5-7 months during winter.",
    "A grizzly bear's claws can grow up to 4 inches long."
];

// Add fact display functionality
const showRandomFact = () => {
    const randomFact = bearFacts[Math.floor(Math.random() * bearFacts.length)];
    
    // Create fact popup
    const factPopup = document.createElement('div');
    factPopup.className = 'fact-popup';
    factPopup.innerHTML = `
        <div class="fact-content">
            <h3>Did You Know?</h3>
            <p>${randomFact}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(factPopup);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (factPopup.parentElement) {
            factPopup.remove();
        }
    }, 5000);
};

// Add fact popup styles dynamically
const factStyles = document.createElement('style');
factStyles.textContent = `
    .fact-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .fact-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    }
    
    .fact-content h3 {
        color: #2c5530;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .fact-content p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .fact-content button {
        background: #d4af37;
        color: #2c5530;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s ease;
    }
    
    .fact-content button:hover {
        background: #b8941f;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(factStyles);

// Show random fact every 30 seconds
setInterval(showRandomFact, 30000);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const factPopup = document.querySelector('.fact-popup');
        if (factPopup) {
            factPopup.remove();
        }
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preload animations
window.addEventListener('load', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize all animations
    const allAnimatedElements = document.querySelectorAll('[style*="opacity: 0"]');
    allAnimatedElements.forEach(el => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Conservation progress tracker
const conservationProgress = {
    bearsProtected: 1247,
    habitatRestored: 15000,
    educationPrograms: 89
};

// Update conservation numbers periodically
const updateConservationNumbers = () => {
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach((stat, index) => {
        const originalValue = parseInt(stat.textContent.replace(/[,+]/g, ''));
        const increment = Math.floor(Math.random() * 3) + 1;
        const newValue = originalValue + increment;
        
        if (index === 0 && newValue < 2000) {
            stat.textContent = newValue.toLocaleString();
        } else if (index === 1 && newValue < 60000) {
            stat.textContent = newValue.toLocaleString();
        } else if (index === 2 && newValue < 50) {
            stat.textContent = newValue + '+';
        }
    });
};

// Update conservation numbers every 5 minutes
setInterval(updateConservationNumbers, 300000);