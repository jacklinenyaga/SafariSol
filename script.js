// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('is-active');
        navMenu.classList.toggle('active');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
});


// FAQ Toggle Function
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

// Testimonials Navigation
let slideIndex = 1; /*initializing the slideIndex to 1*/
showSlides(slideIndex); /*calling the function showSlides*/

function currentSlide(n) { /*Defines a function currentSlide that takes a parameter n (slide number)*/
    showSlides(slideIndex = n); /*When called, it updates slideIndex to n and calls showSlides to display that slide*/
}

function showSlides(n) {
    let dots = document.getElementsByClassName("dot");
    if (n > dots.length) { slideIndex = 1 } /*Checks if n is greater than the number of dots (meaning beyond the last slide)
    If true, wraps around to the first slide by setting slideIndex to 1*/
    if (n < 1) { slideIndex = dots.length }
    /*Checks if n is less than 1 (meaning before the first slide)
    If true, wraps around to the last slide by setting slideIndex to the number of dots*/
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
        /*Loops through all the dots
        Removes the "active" class from each dot (this likely controls the visual appearance of inactive dots)*/
    }
    
    dots[slideIndex - 1].classList.add("active");
}

// Contact Form Submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you within 12 hours.');
    this.reset();
});

// Auto-rotate testimonials
setInterval(function() {
    slideIndex++;
    if (slideIndex > document.getElementsByClassName("dot").length) {
        slideIndex = 1;
    }
    showSlides(slideIndex);
}, 5000);

