document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Navigation =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    }
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on nav links
        const navAnchors = document.querySelectorAll('#navLinks a');
        navAnchors.forEach(anchor => {
            anchor.addEventListener('click', toggleMenu);
        });
    }

    // ===== About Modal =====
    const modal = document.getElementById('aboutModal');
    const aboutLink = document.getElementById('aboutLink');
    const closeBtn = document.querySelector('.close-modal');
    const contactBtn = document.querySelector('.btn-contact');
    
    // Open modal when About link is clicked
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact button functionality
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Scroll to contact section
            document.querySelector('#contact-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== Service Cards =====
    function learnMore(serviceType) {
        // Define content for each service type
        const serviceDetails = {
            wildlife: {
                title: "Safaris & Wildlife Tours",
                description: "Immerse yourself in Kenya's world-famous national parks. Our expert-guided tours guarantee sightings of the Big Five (lion, leopard, rhino, elephant, and buffalo) in their natural habitats. Includes game drives, bush walks, and luxury camp stays.",
                image: "images/game3.JPG"
            },
            culture: {
                title: "Cultural Experiences",
                description: "Authentic interactions with Maasai, Samburu, and Swahili communities. Participate in traditional ceremonies, sample local cuisine, and learn ancient crafts. Ethical tourism that directly benefits local villages.",
                image: "images/culture.jpg"
            },
            coast: {
                title: "Coastal Escapes",
                description: "Pristine beaches of Diani, Watamu, and Lamu. Snorkeling in marine parks, dhow sailing trips, and Swahili cultural tours. Luxury beachfront resorts and private island getaways.",
                image: "images/beach1.JPG"
            },
            mountain: {
                title: "Adventure Sports",
                description: "Summit Mount Kenya, hike through Aberdare ranges, or zip-line through Kereita Forest. White-water rafting on the Tana River and mountain biking trails. All equipment and expert guides provided.",
                image: "images/profile.webp"
            }
        };
        
        // Get the service details
        const service = serviceDetails[serviceType];
        
        // Create and display modal
        const modalHTML = `
            <div class="service-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${service.title}</h3>
                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                    <p>${service.description}</p>
                    <button class="btn-book" onclick="bookService('${serviceType}')">Book Now</button>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        document.querySelector('.service-modal .close-modal').addEventListener('click', closeServiceModal);
        document.querySelector('.service-modal').addEventListener('click', function(e) {
            if (e.target === this) closeServiceModal();
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function serviceModalKeyHandler(e) {
            if (e.key === 'Escape') {
                closeServiceModal();
                document.removeEventListener('keydown', serviceModalKeyHandler);
            }
        });
    }
    
    window.learnMore = learnMore;
    
    function closeServiceModal() {
        const modal = document.querySelector('.service-modal');
        if (modal) modal.remove();
    }
    
    window.closeServiceModal = closeServiceModal;
    
    function bookService(serviceType) {
        alert(`Booking request received for ${serviceType} package! We'll contact you shortly.`);
        closeServiceModal();
    }
    
    window.bookService = bookService;

    // ===== Testimonials Slider =====
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 1;
    let rotationInterval;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial and activate its dot
        const selectedTestimonial = document.getElementById(`testimonial-${index}`);
        if (selectedTestimonial) {
            selectedTestimonial.classList.add('active');
        }
        
        const selectedDot = dots[index - 1];
        if (selectedDot) {
            selectedDot.classList.add('active');
        }
        
        currentIndex = index;
    }
    
    function autoRotateTestimonials() {
        const totalTestimonials = testimonials.length;
        currentIndex = currentIndex % totalTestimonials + 1;
        showTestimonial(currentIndex);
    }
    
    // Initialize slider if testimonials exist
    if (testimonials.length > 0) {
        // Start with first testimonial
        showTestimonial(1);
        
        // Start auto-rotation
        rotationInterval = setInterval(autoRotateTestimonials, 5000);
        
        // Pause auto-rotation when hovering over testimonials
        const sliderContainer = document.querySelector('.testimonial-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(rotationInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                rotationInterval = setInterval(autoRotateTestimonials, 5000);
            });
            
            // Touch events for mobile swipe
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(rotationInterval);
            }, {passive: true});
            
            sliderContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                rotationInterval = setInterval(autoRotateTestimonials, 5000);
            }, {passive: true});
            
            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    // Swipe left - next testimonial
                    autoRotateTestimonials();
                }
                if (touchEndX > touchStartX + 50) {
                    // Swipe right - previous testimonial
                    const totalTestimonials = testimonials.length;
                    currentIndex = (currentIndex - 2 + totalTestimonials) % totalTestimonials + 1;
                    showTestimonial(currentIndex);
                }
            }
        }
    }
    
    window.showTestimonial = showTestimonial;

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Prepare form data
            const formData = {
                name,
                email,
                message,
                timestamp: new Date().toISOString()
            };
            
            // Submit form
            submitContactForm(formData);
        });
        
        // Email validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Form submission
        function submitContactForm(formData) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate network request
            setTimeout(() => {
                // Show success message
                alert(`Thank you, ${formData.name}! We'll contact you soon.`);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    }
    
    window.submitForm = function(e) {
        e.preventDefault();
        if (contactForm) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    };

    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize each FAQ item
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Set initial state (all closed)
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.padding = '0';
        question.setAttribute('aria-expanded', 'false');
        
        // Click handler for each question
        question.addEventListener('click', function() {
            // Toggle this item
            const isOpening = answer.style.maxHeight === '0px';
            
            // Close all other items first
            closeAllFaqItems();
            
            // Toggle current item
            if (isOpening) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.padding = '15px 0';
                icon.textContent = '−';
                question.setAttribute('aria-expanded', 'true');
                
                // Smooth scroll to keep question visible when opened
                question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    
    // Close all FAQ items
    function closeAllFaqItems() {
        document.querySelectorAll('.faq-item').forEach(item => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            const question = item.querySelector('.faq-question');
            
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.padding = '0';
            icon.textContent = '+';
            question.setAttribute('aria-expanded', 'false');
        });
    }
    
    function toggleFAQ(index) {
        const item = document.querySelector(`.faq-item:nth-child(${index})`);
        if (item) {
            item.querySelector('.faq-question').click();
        }
    }
    
    window.toggleFAQ = toggleFAQ;

    // ===== Responsive Image Loading =====
    function loadResponsiveImages() {
        const images = document.querySelectorAll('img[data-srcset]');
        images.forEach(img => {
            const srcset = window.innerWidth >= 768 ? 
                img.getAttribute('data-srcset') : 
                img.getAttribute('data-src-mobile') || img.getAttribute('data-srcset');
            if (srcset) {
                img.srcset = srcset;
            }
        });
    }
    
    // Run on load and resize
    window.addEventListener('load', loadResponsiveImages);
    window.addEventListener('resize', loadResponsiveImages);

    // ===== Window Resize Handler =====
    function handleResize() {
        // Close mobile menu if window is resized to desktop size
        if (window.innerWidth > 992 && navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
        
        // Reload responsive images
        loadResponsiveImages();
    }
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
});