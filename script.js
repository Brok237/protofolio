// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Project Navigation System
class ProjectNavigator {
    constructor() {
        this.currentProject = 1;
        this.totalProjects = 5;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.bindEvents();
    }

    bindEvents() {
        const prevBtn = document.getElementById('prevProject');
        const nextBtn = document.getElementById('nextProject');

        prevBtn.addEventListener('click', () => this.previousProject());
        nextBtn.addEventListener('click', () => this.nextProject());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousProject();
            } else if (e.key === 'ArrowRight') {
                this.nextProject();
            }
        });
    }

    previousProject() {
        if (this.currentProject > 1) {
            this.currentProject--;
            this.updateDisplay();
        }
    }

    nextProject() {
        if (this.currentProject < this.totalProjects) {
            this.currentProject++;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        // Hide all project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('active');
        });

        // Show current project card
        const currentCard = document.querySelector(`[data-project="${this.currentProject}"]`);
        if (currentCard) {
            currentCard.classList.add('active');
        }

        // Update counter
        document.getElementById('currentProject').textContent = this.currentProject;
        document.getElementById('totalProjects').textContent = this.totalProjects;

        // Update button states
        const prevBtn = document.getElementById('prevProject');
        const nextBtn = document.getElementById('nextProject');

        prevBtn.disabled = this.currentProject === 1;
        nextBtn.disabled = this.currentProject === this.totalProjects;

        // Add animation effect
        if (currentCard) {
            currentCard.style.opacity = '0';
            currentCard.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                currentCard.style.transition = 'all 0.3s ease';
                currentCard.style.opacity = '1';
                currentCard.style.transform = 'translateX(0)';
            }, 50);
        }
    }

    // Method to add new projects dynamically
    addProject(projectData) {
        this.totalProjects++;
        
        const projectContainer = document.querySelector('.project-container');
        const newCard = this.createProjectCard(projectData, this.totalProjects);
        projectContainer.appendChild(newCard);
        
        this.updateDisplay();
    }

    createProjectCard(data, projectNumber) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project', projectNumber);
        
        card.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder">
                    <i class="${data.icon || 'fas fa-code'}"></i>
                </div>
            </div>
            <div class="project-content">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <div class="project-tech">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">
                        ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                        ${data.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        return card;
    }
}

// Smooth Scrolling for Navigation Links
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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-content, .skill-category, .timeline-item, .education-item, .contact-content');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 32, 44, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 32, 44, 0.95)';
    }
});

// Initialize Project Navigator
document.addEventListener('DOMContentLoaded', () => {
    const projectNavigator = new ProjectNavigator();
    
    // Make it globally accessible for adding new projects
    window.projectNavigator = projectNavigator;
});

// Utility function to add new projects (for future use)
function addNewProject(projectData) {
    if (window.projectNavigator) {
        window.projectNavigator.addProject(projectData);
    }
}

// Example of how to add a new project:
// addNewProject({
//     title: "New Project",
//     description: "Description of the new project",
//     technologies: ["React", "Node.js", "MongoDB"],
//     achievements: ["Achievement 1", "Achievement 2", "Achievement 3"],
//     icon: "fas fa-laptop-code"
// });

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 100);
//     }
// });

// Skills Animation on Hover
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

