// Wait for DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive components
    initPlanetExplorer();
    initTabs();
    initSlideshow();
    initFormValidation();
    initSecretFeatures();
});

// =====================================
// PLANET EXPLORER FUNCTIONALITY
// =====================================
function initPlanetExplorer() {
    const planets = document.querySelectorAll('.planet');
    const planetInfo = document.getElementById('planet-info');
    
    // Planet data object with descriptions
    const planetData = {
        mercury: {
            name: "Mercury",
            description: "The smallest and innermost planet in the Solar System. Mercury has no atmosphere to retain heat, causing extreme temperature variations.",
            fact: "A day on Mercury (176 Earth days) is longer than its year (88 Earth days)!"
        },
        venus: {
            name: "Venus",
            description: "Venus is the hottest planet in our solar system due to its thick atmosphere that traps heat in a runaway greenhouse effect.",
            fact: "Venus rotates in the opposite direction to most planets, meaning the Sun rises in the west and sets in the east."
        },
        earth: {
            name: "Earth",
            description: "Our home planet and the only known world with active life. Earth's atmosphere and magnetic field protect us from cosmic radiation.",
            fact: "Earth is the only planet not named after a god or goddess from Greek/Roman mythology."
        },
        mars: {
            name: "Mars",
            description: "Known as the Red Planet due to iron oxide (rust) on its surface. Mars has polar ice caps and evidence of ancient rivers and lakes.",
            fact: "Mars hosts the tallest mountain in the solar system, Olympus Mons, which stands at 22km (13.6 miles) high."
        }
    };

    // Add hover event listeners to planets
    planets.forEach(planet => {
        const planetId = planet.getAttribute('data-planet');
        
        // Hover events
        planet.addEventListener('mouseenter', () => {
            // Preview info on hover
            planetInfo.innerHTML = `<h3>${planetData[planetId].name}</h3>
                                    <p>Click to learn more about this fascinating planet!</p>`;
        });
        
        planet.addEventListener('mouseleave', () => {
            // Reset if no planet is selected
            if (!document.querySelector('.planet.selected')) {
                planetInfo.innerHTML = `<h3>Select a planet to learn more</h3>
                                        <p>Hover over a planet for a preview, click to see details!</p>`;
            }
        });
        
        // Click event for detailed info
        planet.addEventListener('click', () => {
            // Remove selected class from all planets
            planets.forEach(p => p.classList.remove('selected'));
            
            // Add selected class to clicked planet
            planet.classList.add('selected');
            
            // Update info panel with full details
            planetInfo.innerHTML = `
                <h3>${planetData[planetId].name}</h3>
                <p>${planetData[planetId].description}</p>
                <p><strong>Fun fact:</strong> ${planetData[planetId].fact}</p>
            `;
            
            // Add animation effect
            planetInfo.style.animation = 'none';
            setTimeout(() => {
                planetInfo.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    });
}

// =====================================
// TABBED CONTENT FUNCTIONALITY
// =====================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// =====================================
// SLIDESHOW FUNCTIONALITY
// =====================================
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Handle index bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Hide all slides and remove active class from dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and activate corresponding dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Initialize first slide
    showSlide(currentSlide);
    
    // Event listeners for next and previous buttons
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// =====================================
// FORM VALIDATION FUNCTIONALITY
// =====================================
function initFormValidation() {
    const form = document.getElementById('explorer-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const interestSelect = document.getElementById('interest');
    const termsCheckbox = document.getElementById('terms');
    const formFeedback = document.getElementById('form-feedback');
    
    // Real-time validation
    const inputs = [nameInput, emailInput, passwordInput, interestSelect];
    
    // Add input event listeners for real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Checkbox change event
    termsCheckbox.addEventListener('change', () => {
        validateCheckbox(termsCheckbox);
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!validateCheckbox(termsCheckbox)) {
            isValid = false;
        }
        
        // If all validations pass, show success message
        if (isValid) {
            form.style.display = 'none';
                        formFeedback.classList.remove('hidden');
                    }
                });
            }
            
            