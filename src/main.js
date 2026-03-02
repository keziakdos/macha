import '../style.css';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('progress-bar');
  const app = document.getElementById('app');
  const nav = document.querySelector('nav');

  // Progress Bar Animation
  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 100);

  // Hide loader and show content
  setTimeout(() => {
    loader.classList.add('fade-out');
    app.classList.remove('content-hidden');

    // Remove loader from DOM after transition
    setTimeout(() => {
      loader.style.display = 'none';
    }, 800);
  }, 2800);

  // Navigation scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  // Initial check
  revealOnScroll();

  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);

  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
    }
  });

  // Form handling
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const name = form.querySelector('#name').value;

      // Show success message (in a real app, you'd send this to a server)
      const button = form.querySelector('.cta-button');
      const originalText = button.textContent;

      button.textContent = 'Message envoyé !';
      button.style.background = 'linear-gradient(135deg, #7BAE7F 0%, #4CAF50 100%)';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // Magnetic button effect for CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-5px) scale(1.02)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });

  // Section image tilt effect
  const sectionImages = document.querySelectorAll('.section-image');

  sectionImages.forEach(img => {
    const container = img.closest('.image-side');

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      img.style.transform = `scale(1.03) translateY(-10px) perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    container.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });
});

// Performance: Use requestAnimationFrame for smooth animations
let ticking = false;

function updateAnimations() {
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateAnimations);
    ticking = true;
  }
});
