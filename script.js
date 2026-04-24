document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded");

  // =========================
  // MOBILE MENU TOGGLE
  // =========================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header ul');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('header ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu?.classList.remove('active');
    });
  });

  // =========================
  // FORM VALIDATION
  // =========================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      if (validateForm()) {
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        setTimeout(() => {
          showSuccessMessage('Your message has been sent successfully. Thank you!');

          contactForm.reset();

          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');

          document.getElementById('successMessage')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 1500);
      }
    });

    // Real-time validation
    document.getElementById('email')?.addEventListener('blur', validateEmail);
    document.getElementById('phone')?.addEventListener('blur', validatePhone);
    document.getElementById('name')?.addEventListener('blur', validateName);
    document.getElementById('message')?.addEventListener('blur', validateMessage);
  }

  // =========================
  // SMOOTH SCROLL
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  // =========================
  // STICKY HEADER
  // =========================
  window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > 50) {
      header.style.background = 'rgba(255,255,255,0.9)';
      header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.background = 'rgba(255,255,255,0.2)';
      header.style.boxShadow = '0 15px 35px rgba(0,0,0,0.05)';
    }
  });

  // =========================
  // ACTIVE MENU ON SCROLL
  // =========================
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;

      if (window.pageYOffset >= sectionTop - 200) {
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

  // =========================
  // SCROLL ANIMATION
  // =========================
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      '.skill-item, .project-card, .timeline-item, .contact-item'
    );

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  document.querySelectorAll(
    '.skill-item, .project-card, .timeline-item, .contact-item'
  ).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // =========================
  // PHONE FORMAT
  // =========================
  document.getElementById('phone')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('27')) {
      value = '+' + value;
    } else if (!value.startsWith('0') && value.length > 0) {
      value = '0' + value;
    }

    e.target.value = value;
  });
});

// =========================
// VALIDATION FUNCTIONS
// =========================
function validateEmail() {
  const email = document.getElementById('email').value;
  const emailError = document.getElementById('emailError');

  if (!email) {
    emailError.textContent = 'Email is required';
    return false;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    emailError.textContent = 'Invalid email';
    return false;
  }

  emailError.textContent = '';
  return true;
}

function validatePhone() {
  const phone = document.getElementById('phone').value;
  const phoneError = document.getElementById('phoneError');

  if (!phone || phone.length < 10) {
    phoneError.textContent = 'Valid phone required';
    return false;
  }

  phoneError.textContent = '';
  return true;
}

function validateName() {
  const name = document.getElementById('name').value;
  const nameError = document.getElementById('nameError');

  if (!name || name.length < 2) {
    nameError.textContent = 'Name too short';
    return false;
  }

  nameError.textContent = '';
  return true;
}

function validateMessage() {
  const message = document.getElementById('message').value;
  const messageError = document.getElementById('messageError');

  if (!message || message.length < 10) {
    messageError.textContent = 'Message too short';
    return false;
  }

  messageError.textContent = '';
  return true;
}

function validateForm() {
  return (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateMessage()
  );
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });
}

function showSuccessMessage(message) {
  const successDiv = document.getElementById('successMessage');
  if (!successDiv) return;

  successDiv.textContent = message;
  successDiv.style.display = 'block';

  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 5000);
}

// =========================
// TYPING ANIMATION
// =========================
const typingElement = document.querySelector('.typing');

if (typingElement) {
  const professions = [
    "Data Analysis",
    "Software Engineering",
    "System Analysis",
    "Database Administration",
    "Artificial Intelligence (AI)",
    "Machine Learning",
    "Business Analysis",
    "Software Development",
    "Application Development",
    "Web Design",
    "Web Development"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = professions[wordIndex];
    typingElement.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) wordIndex = (wordIndex + 1) % professions.length;
      setTimeout(type, 1000);
    }
  }

  setTimeout(type, 1000);
}
