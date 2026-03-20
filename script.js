// ===========================
// NAVIGATION SCROLL EFFECT
// ===========================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// ===========================
// SEARCH TABS
// ===========================

const searchTabs = document.querySelectorAll('.search-tab');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ===========================
// SEARCH FORM HANDLER
// ===========================

const floatingSearchForm = document.querySelector('.floating-search .search-form');

if (floatingSearchForm) {
    const searchButton = floatingSearchForm.querySelector('.btn-search');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

        const formData = {
            location: floatingSearchForm.querySelector('input[type="text"]').value,
            checkIn: floatingSearchForm.querySelector('input[type="date"]:nth-of-type(1)').value,
            checkOut: floatingSearchForm.querySelector('input[type="date"]:nth-of-type(2)').value,
            guests: floatingSearchForm.querySelector('select').value
        };

        if (formData.location && formData.checkIn && formData.checkOut) {
            showNotification('Searching for your perfect destination...', 'success');
            console.log('Search Data:', formData);

            // Simulate search process
            setTimeout(() => {
                showNotification('Results found! Explore our featured destinations below.', 'success');
                document.querySelector('#destinations').scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
}

// ===========================
// DESTINATION CARDS INTERACTION
// ===========================

const destinationCards = document.querySelectorAll('.destination-card');

destinationCards.forEach(card => {
    const btnIcon = card.querySelector('.btn-icon');

    if (btnIcon) {
        btnIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const destinationName = card.querySelector('.destination-title').textContent;
            const destinationPrice = card.querySelector('.destination-price').textContent;

            showNotification(`Booking ${destinationName} - ${destinationPrice}`, 'success');

            // Simulate booking
            setTimeout(() => {
                showNotification('Redirecting to booking page...', 'info');
            }, 1000);
        });
    }

    card.addEventListener('click', () => {
        const destinationName = card.querySelector('.destination-title').textContent;
        showNotification(`Exploring ${destinationName}...`, 'info');
    });
});

// ===========================
// OFFER CARDS INTERACTION
// ===========================

const offerCards = document.querySelectorAll('.offer-card');

offerCards.forEach(card => {
    const bookButton = card.querySelector('.btn-primary');

    if (bookButton) {
        bookButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const offerTitle = card.querySelector('.offer-title').textContent;
            const offerPrice = card.querySelector('.offer-price').textContent.trim().split(' ')[0];

            showNotification(`Booking ${offerTitle} for ${offerPrice}`, 'success');

            // Add animation
            bookButton.textContent = 'Processing...';
            bookButton.style.pointerEvents = 'none';

            setTimeout(() => {
                bookButton.textContent = 'Confirmed ✓';
                showNotification('Booking confirmed! Check your email for details.', 'success');

                setTimeout(() => {
                    bookButton.textContent = 'Book Now';
                    bookButton.style.pointerEvents = 'auto';
                }, 2000);
            }, 1500);
        });
    }
});

// ===========================
// CONTACT FORM HANDLER
// ===========================

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            firstName: contactForm.querySelector('input[type="text"]:nth-of-type(1)').value,
            lastName: contactForm.querySelector('input[type="text"]:nth-of-type(2)').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            destination: contactForm.querySelector('select').value,
            message: contactForm.querySelector('textarea').value
        };

        if (formData.firstName && formData.lastName && formData.email && formData.message) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.style.pointerEvents = 'none';

            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! Our team will contact you within 24 hours.', 'success');
                contactForm.reset();
                submitButton.textContent = 'Send Message';
                submitButton.style.pointerEvents = 'auto';
            }, 1500);

            console.log('Contact Form Data:', formData);
        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
}

// ===========================
// NEWSLETTER FORM HANDLER
// ===========================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email && validateEmail(email)) {
            const submitButton = newsletterForm.querySelector('button');
            submitButton.textContent = '✓ Subscribed';
            submitButton.style.pointerEvents = 'none';

            showNotification('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';

            setTimeout(() => {
                submitButton.textContent = 'Subscribe';
                submitButton.style.pointerEvents = 'auto';
            }, 3000);
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

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

// Observe all cards
document.querySelectorAll('.destination-card, .service-card, .offer-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===========================
// PARALLAX EFFECT FOR HERO
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// HERO BUTTONS INTERACTION
// ===========================

const heroBtns = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');

heroBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('Explore')) {
            document.querySelector('#destinations').scrollIntoView({ behavior: 'smooth' });
        } else if (btn.textContent.includes('Watch Video')) {
            showNotification('Video player coming soon!', 'info');
        }
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '40px',
        padding: '16px 24px',
        background: type === 'success' ? 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)' :
                    type === 'error' ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' :
                    'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        color: type === 'info' ? '#fff' : '#000',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '600',
        maxWidth: '400px',
        animation: 'slideInRight 0.4s ease',
        backdropFilter: 'blur(10px)'
    });

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===========================
// CURSOR EFFECT (OPTIONAL)
// ===========================

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
Object.assign(cursor.style, {
    width: '20px',
    height: '20px',
    border: '2px solid #d4af37',
    borderRadius: '50%',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '9999',
    transition: 'transform 0.2s ease',
    display: 'none'
});

document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Only show custom cursor on desktop
if (window.innerWidth > 968) {
    cursor.style.display = 'block';

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .destination-card, .service-card, .offer-card');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(212, 175, 55, 0.2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';

Object.assign(scrollToTopBtn.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
    color: '#000',
    border: 'none',
    borderRadius: '50%',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: '9999',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.4s ease',
    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)'
});

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ===========================
// LOADING ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    console.log('%c ORIGINOVA - Luxury Travel & Tourism ', 'background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); color: #000; font-size: 16px; padding: 10px; font-weight: bold;');
    console.log('%c Experience luxury travel like never before ', 'color: #d4af37; font-size: 12px;');
});

// ===========================
// DATE PICKER INITIALIZATION
// ===========================

// Set minimum date to today for date inputs
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Auto-fill check-out date when check-in is selected
const checkInInputs = document.querySelectorAll('input[type="date"]:nth-of-type(1)');
const checkOutInputs = document.querySelectorAll('input[type="date"]:nth-of-type(2)');

checkInInputs.forEach((checkIn, index) => {
    checkIn.addEventListener('change', () => {
        const checkInDate = new Date(checkIn.value);
        checkInDate.setDate(checkInDate.getDate() + 3); // Default 3 nights
        const checkOutDate = checkInDate.toISOString().split('T')[0];

        if (checkOutInputs[index]) {
            checkOutInputs[index].value = checkOutDate;
            checkOutInputs[index].setAttribute('min', checkIn.value);
        }
    });
});

console.log('✓ ORIGINOVA initialized successfully');

const modal = document.getElementById("videoModal");
const btn = document.getElementById("openVideoBtn");
const closeBtn = document.getElementById("closeBtn");
const video = document.getElementById("videoPlayer");

// فتح المودال عند الضغط على الزر
btn.onclick = () => {
  modal.classList.add("show");
  // الفيديو مش هيتشغل تلقائي
}

// غلق المودال عند الضغط على زر الإغلاق
closeBtn.onclick = () => {
  modal.classList.remove("show");
  // In case the video element/source fails to load, avoid JS errors.
  if (video) {
    video.pause();
    video.currentTime = 0; // إعادة الفيديو للبداية
  }
}

// غلق المودال عند الضغط خارج محتوى الفيديو
window.onclick = (event) => {
  if(event.target == modal){
    modal.classList.remove("show");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}
