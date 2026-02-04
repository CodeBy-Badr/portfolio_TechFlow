// ===== Smooth Scroll Function =====
function smoothScroll(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const inputs = this.querySelectorAll('input, textarea, select');
        const formData = {};
        
        inputs.forEach(input => {
            if (input.type !== 'checkbox' || input.checked) {
                formData[input.name || input.id] = input.value;
            }
        });

        // Show success message
        alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
        
        // Reset form
        this.reset();
        
        // Optional: Send to server
        // You can uncomment this and modify it to send data to your backend
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
        */
    });
}

// ===== Animate Elements on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// ===== Navbar Active Link =====
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Mobile Menu Close =====
const navbarCollapse = document.querySelector('.navbar-collapse');
const navbarToggler = document.querySelector('.navbar-toggler');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ===== Button Click Effects =====
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Service Button Click =====
const serviceButtons = document.querySelectorAll('.service-card .btn');

serviceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const card = this.closest('.service-card');
        const title = card.querySelector('h5').textContent;
        
        // Show alert with service name
        console.log('Selected service: ' + title);
        
        // Optional: Scroll to contact form
        setTimeout(() => {
            smoothScroll('contact');
        }, 300);
    });
});

// ===== Portfolio Button Click =====
const portfolioButtons = document.querySelectorAll('.portfolio-overlay .btn');

portfolioButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const item = this.closest('.portfolio-item');
        const projectName = item.querySelector('h6').textContent;
        
        console.log('Viewing project: ' + projectName);
        
        // Optional: Open modal or redirect to project details
        // You can create a modal for project details here
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC key to close navbar
    if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
    
    // Home key
    if (e.key === 'Home') {
        smoothScroll('home');
    }
    
    // End key
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ===== Loading Animation for Images =====
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeInUp 0.6s ease-out';
    });
});

// ===== Tooltip Initialization =====
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// ===== Utility Functions =====

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'جاري التحميل...';
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// ===== Document Ready =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website Loaded Successfully!');
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });
});

// ===== Performance Optimization =====
let ticking = false;

function update() {
    // Update animations and effects
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
    }
});

// ===== iOS Specific Handling =====
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

if (isIOS()) {
    // Add iOS-specific classes and styles
    document.body.classList.add('is-ios');
    
    // Prevent zoom on input focus
    document.addEventListener('touchmove', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            e.preventDefault();
        }
    }, false);
}

// ===== Log Application Version =====
console.log('%cProDesign v1.0', 'color: #0d6efd; font-size: 16px; font-weight: bold;');
console.log('%cDesigned with ❤️ using HTML, CSS, JavaScript & Bootstrap', 'color: #666; font-size: 12px;');
