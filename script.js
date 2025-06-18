// About Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('aboutModal');
    const aboutLink = document.getElementById('aboutLink');
    const closeBtn = document.querySelector('.close-modal');
    const contactBtn = document.querySelector('.btn-contact');
    
    // Open modal when About link is clicked
    aboutLink.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Contact button functionality
    contactBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      // Scroll to contact section
      document.querySelector('#contact-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });



  // Service Card Button Functionality
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
          <img src="${service.image}" alt="${service.title}">
          <p>${service.description}</p>
          <button class="btn-book" onclick="bookService('${serviceType}')">Book Now</button>
        </div>
      </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.querySelector('.close-modal').addEventListener('click', closeServiceModal);
    document.querySelector('.service-modal').addEventListener('click', function(e) {
      if (e.target === this) closeServiceModal();
    });
  }
  
  function closeServiceModal() {
    const modal = document.querySelector('.service-modal');
    if (modal) modal.remove();
  }

  
  function bookService(serviceType) {
    alert(`Booking request received for ${serviceType} package! We'll contact you shortly.`);
    closeServiceModal();
  }


  // Testimonial Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all testimonials and dots
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    // Function to show a specific testimonial
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
    }
    
    // Make the function available globally for the onclick attributes
    window.showTestimonial = showTestimonial;
    
    // Optional: Auto-rotate testimonials every 5 seconds
    let currentIndex = 1;
    const totalTestimonials = testimonials.length;
    
    function autoRotateTestimonials() {
        currentIndex = currentIndex % totalTestimonials + 1;
        showTestimonial(currentIndex);
    }
    
    // Start auto-rotation (comment out if you don't want this feature)
    const rotationInterval = setInterval(autoRotateTestimonials, 5000);
    
    // Pause auto-rotation when hovering over testimonials
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(rotationInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            rotationInterval = setInterval(autoRotateTestimonials, 5000);
        });
    }
});


// Contact Form Functionality
// Contact Form with Modal Close Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const contactForm = document.getElementById('contactForm');
    const contactModal = document.querySelector('.contact .modal'); // Adjusted selector
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Form submission handler
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
    }
    
    // Close modal functionality
    function setupModalClose() {
        // Close button
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Close when clicking outside
        if (contactModal) {
            contactModal.addEventListener('click', function(e) {
                if (e.target === contactModal) {
                    closeModal();
                }
            });
        }
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Close modal function
    function closeModal() {
        const modal = document.querySelector('.contact .modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
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
            
            // Close the modal
            closeModal();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // Initialize modal close functionality
    setupModalClose();
    
    // Make functions available globally if needed
    window.closeModal = closeModal;
    window.submitForm = function(e) {
        e.preventDefault();
        if (contactForm) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    };
});


// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
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
                answer.style.paddingTop = '15px';
                answer.style.marginBottom = '15px';
                icon.textContent = '−';
                question.setAttribute('aria-expanded', 'true');
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
            answer.style.paddingTop = '0';
            answer.style.marginBottom = '0';
            icon.textContent = '+';
            question.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Make toggle function available globally for onclick attributes
    window.toggleFAQ = function(index) {
        const item = document.querySelector(`.faq-item:nth-child(${index})`);
        if (item) {
            item.querySelector('.faq-question').click();
        }
    };
});