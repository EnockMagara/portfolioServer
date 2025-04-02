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
    setupSPA();
    setupThemeToggle();
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
        e.preventDefault(); // Prevent default touch behavior
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
   * SPA-like navigation implementation
   */
  function setupSPA() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to each link
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevent default link behavior
        e.preventDefault();
        
        // Get the href attribute
        const href = this.getAttribute('href');
        
        // Skip if it's an external link or anchor
        if (href.startsWith('http') || href.startsWith('#')) {
          window.location.href = href;
          return;
        }
        
        // Show preloader
        const preloader = document.querySelector('#preloader');
        if (preloader) {
          preloader.style.display = 'block';
        }
        
        // Update browser history
        window.history.pushState({path: href}, '', href);
        
        // Load the page content
        loadPage(href);
        
        // Update active nav link
        updateActiveNav(href);
      });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
      if (e.state && e.state.path) {
        loadPage(e.state.path);
        updateActiveNav(e.state.path);
      }
    });
    
    // Initial state on page load
    window.history.replaceState({path: window.location.pathname}, '', window.location.pathname);
  }

  /**
   * Load page content via AJAX
   */
  function loadPage(url) {
    // Show loading indicator
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      preloader.style.display = 'block';
    }
    
    // Fetch the page content
    fetch(url)
      .then(response => response.text())
      .then(html => {
        // Create a temporary element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the main content
        const newMain = doc.querySelector('main');
        const currentMain = document.querySelector('main');
        
        // Replace the main content
        if (newMain && currentMain) {
          currentMain.innerHTML = newMain.innerHTML;
          
          // Update the page title
          document.title = doc.title;
          
          // Scroll to top
          window.scrollTo(0, 0);
          
          // Re-initialize animations and scripts
          initAnimations();
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }
        
        // Hide loading indicator after a short delay
        setTimeout(() => {
          if (preloader) {
            preloader.style.display = 'none';
          }
        }, 300);
      })
      .catch(error => {
        console.error('Error loading page:', error);
        // Fallback to normal navigation on error
        window.location.href = url;
      });
  }

  /**
   * Update active navigation link
   */
  function updateActiveNav(url) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current page link
    let activeLink;
    
    if (url === '/' || url === '') {
      activeLink = document.querySelector('.nav-link[href="/"]');
    } else {
      activeLink = document.querySelector(`.nav-link[href="${url}"]`);
    }
    
    if (activeLink) {
      activeLink.classList.add('active');
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
})();