document.addEventListener('DOMContentLoaded', function() {
  

console.log("Script loaded!"); 

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded");
  
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('header ul');
  
  if (!toggle) console.error("Toggle button not found!");
  if (!menu) console.error("Menu not found!");
  
  toggle?.addEventListener('click', function() {
    console.log("Menu clicked!");
    menu?.classList.toggle('active');
  });
});  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header ul');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous errors
    clearErrors();
    
    // Validate form
    if (validateForm()) {
      // Show loading state
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      
      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        // Success
        showSuccessMessage('Message sent successfully! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 1500);
    }
  });
  
  // Real-time validation
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('phone').addEventListener('blur', validatePhone);
  document.getElementById('name').addEventListener('blur', validateName);
  document.getElementById('message').addEventListener('blur', validateMessage);
}

// Validation Functions
function validateEmail() {
  const email = document.getElementById('email').value;
  const emailError = document.getElementById('emailError');
  
  if (!email) {
    emailError.textContent = 'Email is required';
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
    return false;
  }
  
  emailError.textContent = '';
  return true;
}

function validatePhone() {
  const phone = document.getElementById('phone').value;
  const phoneError = document.getElementById('phoneError');
  
  // Phone is optional, but if provided, validate it
  if (phone) {
    // South African phone regex (accepts various formats)
    const saPhoneRegex = /^(\+27|27|0)[0-9]{9}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    
    if (!saPhoneRegex.test(cleanPhone)) {
      phoneError.textContent = 'Please enter a valid South African phone number (e.g., 0646660240 or +27646660240)';
      return false;
    }
  }
  
  phoneError.textContent = '';
  return true;
}

function validateName() {
  const name = document.getElementById('name').value;
  const nameError = document.getElementById('nameError');
  
  if (!name) {
    nameError.textContent = 'Name is required';
    return false;
  }
  
  if (name.length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
    return false;
  }
  
  nameError.textContent = '';
  return true;
}

function validateMessage() {
  const message = document.getElementById('message').value;
  const messageError = document.getElementById('messageError');
  
  if (!message) {
    messageError.textContent = 'Message is required';
    return false;
  }
  
  if (message.length < 10) {
    messageError.textContent = 'Message must be at least 10 characters';
    return false;
  }
  
  messageError.textContent = '';
  return true;
}

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isMessageValid = validateMessage();
  
  return isNameValid && isEmailValid && isPhoneValid && isMessageValid;
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
  });
}

function showSuccessMessage(message) {
  const successDiv = document.getElementById('successMessage');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 5000);
}

// Format phone number as user types
document.getElementById('phone')?.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.startsWith('27')) {
    value = '+' + value;
  } else if (value.startsWith('0')) {
    value = value;
  } else if (value.length > 0) {
    value = '0' + value;
  }
  
  e.target.value = value;
});
  
  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('header ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Sticky header on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.9)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.2)';
      header.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.05)';
    }
  });
  
  // Highlight active menu item on scroll
  const sections = document.querySelectorAll('.section');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
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
  
  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .contact-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.skill-item, .project-card, .timeline-item, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
// Typing animation text writing
const typingElement = document.querySelector('.typing');
const professions = [
  "Data Analysis",
  "Software Engineering",
  "System Analysis",
  "Database Administration",
  "Artificial Intelligence(AI)",
  "Machine Learning",
  "Business Analysis",
  "Software Developement",
  "Application Developement",
  "Web Design",
  "Web Developement",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
  const currentWord = professions[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  
  typingElement.textContent = currentChar;
  
  if (!isDeleting && charIndex < currentWord.length) {
    // Typing
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    // Deleting
    charIndex--;
    setTimeout(type, 50);
  } else {
    // Change word
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % professions.length;
    }
    setTimeout(type, 1000);
  }
}

// Start the typing effect

setTimeout(type, 1000);



