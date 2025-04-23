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
      setTimeout(() => {
        preloader.remove();
      }, 500);
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
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }
  
  // GSAP Animations
  document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    setupThemeToggle();
    setupMobileNav();
    setupNavIndicator();
    revealOnScroll();
  });
  
  /**
   * Initialize animations
   */
  function initAnimations() {
    // Initial animation for hero content
    if (document.querySelector('.hero-greeting')) {
      gsap.from('.hero-greeting', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
      gsap.from('.hero-name', { opacity: 0, y: 50, duration: 1, delay: 0.4 });
      gsap.from('.hero-description', { opacity: 0, y: 50, duration: 1, delay: 0.6 });
      gsap.from('.cta-button', { opacity: 0, y: 50, duration: 1, delay: 0.8 });
    }

    // Hover animation for CTA button
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.1,
          backgroundColor: 'var(--primary-color)',
          color: '#ffffff',
          duration: 0.3
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          backgroundColor: 'transparent',
          color: 'var(--primary-color)',
          duration: 0.3
        });
      });
    }

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        gsap.to('.hero-content', {
          x: mouseX * 20,
          y: mouseY * 20,
          duration: 0.5
        });
      });
    }

    // Animated buttons
    const buttons = document.querySelectorAll('.animated-button');
    
    buttons.forEach(button => {
      const line = button.querySelector('.button-line');
      if (!line) return;

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

      // Touch events for mobile - modified to allow navigation
      button.addEventListener('touchstart', (e) => {
        // Trigger the animation but don't prevent default behavior
        animateButton(true);
      }, { passive: true });

      button.addEventListener('touchend', (e) => {
        // Set a small delay to allow the animation to complete
        setTimeout(() => {
          animateButton(false);
        }, 100);
      });
    });

    // Resume button functionality
    const showResumeBtn = document.getElementById('showResumeBtn');
    const resumeFrame = document.getElementById('resumeFrame');
    
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
        // Keep preventDefault only for this specific button to allow the toggle function to work
        // but we're making a special case only for this button
        e.preventDefault(); 
        toggleResume(e);
      });

      console.log('Resume button event listeners added'); // Debug log
    }

    // Disable hover effects on mobile devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
    }
  }

  /**
   * Set up theme toggle functionality
   */
  function setupThemeToggle() {
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
      const themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
      themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
      document.body.appendChild(themeToggle);
      
      // Add click event listener
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If there's a saved theme, apply it
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } else {
      // If no saved theme, use the default from HTML
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon(currentTheme);
    }
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
  }

  /**
   * Update theme toggle icon based on current theme
   */
  function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
      themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
  }

  /**
   * Setup mobile navigation
   */
  function setupMobileNav() {
    // Create mobile toggle button if it doesn't exist
    if (!document.querySelector('.mobile-nav-toggle')) {
      const navbar = document.querySelector('.top-navbar');
      const mobileToggle = document.createElement('button');
      mobileToggle.className = 'mobile-nav-toggle';
      mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
      mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
      
      if (navbar) {
        navbar.appendChild(mobileToggle);
        
        // Add click event listener
        mobileToggle.addEventListener('click', function() {
          navbar.classList.toggle('mobile-nav-open');
          // Toggle icon between hamburger and X
          const icon = this.querySelector('i');
          if (icon.classList.contains('bi-list')) {
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x-lg');
          } else {
            icon.classList.remove('bi-x-lg');
            icon.classList.add('bi-list');
          }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', () => {
            navbar.classList.remove('mobile-nav-open');
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('bi-x-lg')) {
              icon.classList.remove('bi-x-lg');
              icon.classList.add('bi-list');
            }
          });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
          if (!navbar.contains(e.target) && navbar.classList.contains('mobile-nav-open')) {
            navbar.classList.remove('mobile-nav-open');
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('bi-x-lg')) {
              icon.classList.remove('bi-x-lg');
              icon.classList.add('bi-list');
            }
          }
        });
      }
    }
  }

  /**
   * Setup navigation indicator
   */
  function setupNavIndicator() {
    const navbar = document.querySelector('.top-navbar .navbar ul');
    if (!navbar) return;
    
    // Create the indicator element if it doesn't exist
    let indicator = document.querySelector('.nav-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'nav-indicator';
      navbar.appendChild(indicator);
    }
    
    // Position the indicator under the active link
    function positionIndicator() {
      const activeLink = document.querySelector('.nav-link.active');
      if (activeLink) {
        const parentLi = activeLink.closest('li');
        const rect = parentLi.getBoundingClientRect();
        const navRect = navbar.getBoundingClientRect();
        
        // Set the indicator width and position
        indicator.style.width = `${rect.width - 30}px`;
        indicator.style.left = `${rect.left - navRect.left + 15}px`;
        indicator.style.opacity = '1';
      } else {
        // Hide the indicator if no active link
        indicator.style.opacity = '0';
      }
    }
    
    // Position on load
    positionIndicator();
    
    // Position on window resize
    window.addEventListener('resize', positionIndicator);
    
    // Add hover effect to smoothly move indicator
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('mouseenter', function() {
        const parentLi = this.closest('li');
        const rect = parentLi.getBoundingClientRect();
        const navRect = navbar.getBoundingClientRect();
        
        indicator.style.width = `${rect.width - 30}px`;
        indicator.style.left = `${rect.left - navRect.left + 15}px`;
      });
      
      link.addEventListener('mouseleave', function() {
        // Return to active link position
        positionIndicator();
      });
    });
    
    // Update on page change (for SPA functionality)
    document.addEventListener('spa:pagechange', positionIndicator);
  }

  // Add scroll reveal functionality
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Adjust this value to control when the element becomes visible
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  // Add event listener for scroll
  window.addEventListener('scroll', revealOnScroll);
})();