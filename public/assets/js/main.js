(function() {
  "use strict";

  /**
   * Header toggle for mobile
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', function() {
      header.classList.toggle('header-show');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navLink => {
    navLink.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        headerToggleBtn.click();
      }
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed effect
   */
  const typed = document.querySelector('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      typeSpeed: 50,        // Moderate typing speed
      backSpeed: 30,        // Slightly slower erasing speed
      backDelay: 2000,      // Pause before starting to erase
      startDelay: 1000,     // Delay before typing starts
      loop: true,
      smartBackspace: false, // Ensures it always erases the full string
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
      preStringTyped: (arrayPos, self) => {
        // Add a delay before typing the next string
        return new Promise(resolve => setTimeout(resolve, 1000));
      },
      onStringTyped: (arrayPos, self) => {
        // Pause at the end of each string
        return new Promise(resolve => setTimeout(resolve, 1500));
      },
      onComplete: (self) => {
        // Optional: hide cursor when animation completes
        self.cursor.style.display = 'none';
      }
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // GSAP Animations
  document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for hero content
    gsap.from('.hero-greeting', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    gsap.from('.hero-name', { opacity: 0, y: 50, duration: 1, delay: 0.4 });
    gsap.from('.hero-description', { opacity: 0, y: 50, duration: 1, delay: 0.6 });
    gsap.from('.cta-button', { opacity: 0, y: 50, duration: 1, delay: 0.8 });

    // Hover animation for CTA button
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('mouseenter', () => {
      gsap.to(ctaButton, {
        scale: 1.1,
        backgroundColor: 'rgba(236, 91, 95, 1)',
        color: '#ffffff',
        duration: 0.3
      });
    });

    ctaButton.addEventListener('mouseleave', () => {
      gsap.to(ctaButton, {
        scale: 1,
        backgroundColor: 'transparent',
        color: 'rgb(236, 91, 95)',
        duration: 0.3
      });
    });

    // Parallax effect for hero section
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      gsap.to('.hero-content', {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 0.5
      });
    });

    // Animated buttons
    const buttons = document.querySelectorAll('.animated-button');
    const showResumeBtn = document.getElementById('showResumeBtn');
    const resumeFrame = document.getElementById('resumeFrame');

    buttons.forEach(button => {
      const line = button.querySelector('.button-line');

      // Function to handle animation
      const animateButton = (entering) => {
        gsap.to(line, {
          height: entering ? '100%' : '2px',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      // Mouse events for desktop
      button.addEventListener('mouseenter', () => animateButton(true));
      button.addEventListener('mouseleave', () => animateButton(false));

      // Touch events for mobile
      button.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        animateButton(true);
      }, { passive: false });

      button.addEventListener('touchend', () => {
        animateButton(false);
      });
    });

    // Resume button functionality
    if (showResumeBtn && resumeFrame) {
      let isResumeVisible = false; // Track the state of the resume

      function toggleResume(e) {
        e.preventDefault(); // Prevent default behavior for both click and touch
        console.log('Toggle Resume clicked'); // Debug log

        const buttonText = showResumeBtn.querySelector('.button-text');

        if (!isResumeVisible) {
          resumeFrame.style.display = 'block';
          // Use setTimeout to ensure the display change has taken effect
          setTimeout(() => {
            resumeFrame.style.height = '600px';
            resumeFrame.style.opacity = '1';
          }, 10);
          if (buttonText) buttonText.textContent = 'Hide Resume';
          isResumeVisible = true;
          console.log('Showing resume'); // Debug log
          // Scroll to the resume frame
          resumeFrame.scrollIntoView({ behavior: 'smooth' });
        } else {
          resumeFrame.style.height = '0';
          resumeFrame.style.opacity = '0';
          // Use setTimeout to hide the iframe after the transition
          setTimeout(() => {
            resumeFrame.style.display = 'none';
          }, 300);
          if (buttonText) buttonText.textContent = 'View Resume';
          isResumeVisible = false;
          console.log('Hiding resume'); // Debug log
        }
      }

      // Add event listeners for both click and touch
      showResumeBtn.addEventListener('click', toggleResume);
      showResumeBtn.addEventListener('touchend', function(e) {
        e.preventDefault(); // Prevent default touch behavior
        toggleResume(e);
      });

      console.log('Resume button event listeners added'); // Debug log
    } else {
      console.error('Resume button or frame not found');
    }

    // Disable hover effects on mobile devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
    }

    // Navigation active state on scroll
    function setActiveLink() {
      const navLinks = document.querySelectorAll('.nav-link');
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust this value based on your header height
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    // Set active link on page load
    document.addEventListener('DOMContentLoaded', setActiveLink);

    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
  });

  document.addEventListener('DOMContentLoaded', function() {
    // AOS initialization
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Typed.js initialization
    if (typeof Typed !== 'undefined') {
      const typed = document.querySelector('.typed');
      if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          typeSpeed: 50,        // Moderate typing speed
          backSpeed: 30,        // Slightly slower erasing speed
          backDelay: 2000,      // Pause before starting to erase
          startDelay: 1000,     // Delay before typing starts
          loop: true,
          smartBackspace: false, // Ensures it always erases the full string
          showCursor: true,
          cursorChar: '|',
          autoInsertCss: true,
          fadeOut: true,
          fadeOutClass: 'typed-fade-out',
          fadeOutDelay: 500,
          preStringTyped: (arrayPos, self) => {
            // Add a delay before typing the next string
            return new Promise(resolve => setTimeout(resolve, 1000));
          },
          onStringTyped: (arrayPos, self) => {
            // Pause at the end of each string
            return new Promise(resolve => setTimeout(resolve, 1500));
          },
          onComplete: (self) => {
            // Optional: hide cursor when animation completes
            self.cursor.style.display = 'none';
          }
        });
      }
    }

    // GLightbox initialization
    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
        selector: '.glightbox'
      });
    }

    // Resume button toggle
    const toggleResumeBtn = document.getElementById('toggleResumeBtn');
    const resumeFrame = document.getElementById('resumeFrame');

    if (toggleResumeBtn && resumeFrame) {
      toggleResumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (resumeFrame.classList.contains('active')) {
          resumeFrame.classList.remove('active');
          toggleResumeBtn.querySelector('.button-text').textContent = 'View Resume';
        } else {
          resumeFrame.classList.add('active');
          toggleResumeBtn.querySelector('.button-text').textContent = 'Hide Resume';
          resumeFrame.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
})();