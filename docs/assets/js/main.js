
  // Clean URL handling for GitHub Pages
  (function() {
    // Function to handle clean URLs
    function handleCleanUrls() {
      const currentPath = window.location.pathname;
      
      // If we're on a clean URL (no .html), we need to handle navigation differently
      if (!currentPath.includes('.html')) {
        // Update all internal links to use clean URLs
        document.querySelectorAll('a[href]').forEach(link => {
          const href = link.getAttribute('href');
          
          // Convert .html links to clean URLs
          if (href.endsWith('.html')) {
            const cleanHref = href.replace('.html', '');
            link.setAttribute('href', cleanHref);
          }
          
          // Handle relative links from project pages
          if (href.startsWith('../') && href.includes('.html')) {
            const cleanHref = href.replace('.html', '');
            link.setAttribute('href', cleanHref);
          }
        });
        
        // Handle form submissions and programmatic navigation
        const originalPushState = history.pushState;
        history.pushState = function(state, title, url) {
          if (url && url.endsWith('.html')) {
            url = url.replace('.html', '');
          }
          return originalPushState.call(this, state, title, url);
        };
      }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleCleanUrls);
    } else {
      handleCleanUrls();
    }
  })();

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

    initPhotosPageEscape();

    initLocationDisplay();
    initNewNavigation();
    initAboutToggle();
  });
  
  /**
   * Initialize animations
   */
  function initAnimations() {
    // New hero animations are handled by CSS animations
    // Adding subtle parallax effect for hero background elements
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to('.bg-grid', {
          x: mouseX * 10,
          y: mouseY * 10,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to('.bg-gradient', {
          x: mouseX * 15,
          y: mouseY * 15,
          duration: 1.5,
          ease: 'power2.out'
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
   * Initialize new navigation system
   */
  function initNewNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');
    
    if (!menuToggle || !navOverlay || !navClose) return;
    
    // Toggle navigation overlay
    function toggleNav() {
      const isActive = navOverlay.classList.contains('active');
      
      if (isActive) {
        closeNav();
      } else {
        openNav();
      }
    }
    
    function openNav() {
      navOverlay.classList.add('active');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate menu links
      const menuLinks = document.querySelectorAll('.nav-menu-link');
      menuLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1 + 0.1}s`;
      });
    }
    
    function closeNav() {
      navOverlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleNav);
    navClose.addEventListener('click', closeNav);
    
    // Close on nav link click
    const navLinks = document.querySelectorAll('.nav-menu-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Small delay to allow navigation
        setTimeout(closeNav, 100);
      });
    });
    
    // Close on overlay click (but not on content)
    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) {
        closeNav();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
        closeNav();
      }
    });
    
    // Update active nav link based on current page
    updateActiveNavLink();
  }
  
  /**
   * Update active navigation link
   */
  function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu-link');
    const navItems = document.querySelectorAll('.nav-menu ul li');
    
    // Remove active classes from all links and items
    navLinks.forEach(link => link.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active-page'));
    
    navLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      
      if (href === currentPath || 
          (currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('/index') && href === '/' || href === '/index') ||
          (currentPath.startsWith('/portfolio') && href === '/portfolio') ||
          (currentPath.startsWith('/commlab') && href === '/commlab') ||
          (currentPath.startsWith('/photos') && href === '/photos')) {
        link.classList.add('active');
        // Add active-page class to parent li element
        link.parentElement.classList.add('active-page');
      }
    });
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
    // Mobile navigation is now handled by the new overlay system
    // This function is kept for compatibility but functionality moved to initNewNavigation
  }

  /**
   * Setup navigation indicator
   */
  function setupNavIndicator() {
    // Navigation indicator is no longer needed with the new overlay system
    // This function is kept for compatibility
  }

  // Add scroll reveal functionality
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 100; // Reduced from 150 to make animation trigger earlier
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  // Add event listener for scroll
  window.addEventListener('scroll', revealOnScroll);



  /**
   * Photos page escape key handler
   */
  function initPhotosPageEscape() {
    if (document.body.classList.contains('photos-page')) {
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          window.location.href = '/portfolio';
        }
      });
    }
  }



  
  /**
   * Initialize location display (dynamic worldwide locations)
   */
  function initLocationDisplay() {
    const locationElement = document.getElementById('location-text');
    if (!locationElement) return;

    // Check if we're on the homepage (index page)
    if (!document.body.classList.contains('index-page')) return;

    // Array of 20 worldwide locations
    const worldwideLocations = [
      'San Francisco, California, USA',
      'Tokyo, Japan',
      'London, England, UK',
      'Sydney, Australia',
      'Dubai, UAE',
      'Singapore',
      'New York, NY, USA',
      'Paris, France',
      'Mumbai, India',
      'São Paulo, Brazil',
      'Toronto, Canada',
      'Berlin, Germany',
      'Seoul, South Korea',
      'Lagos, Nigeria',
      'Mexico City, Mexico',
      'Stockholm, Sweden',
      'Cairo, Egypt',
      'Bangkok, Thailand',
      'Amsterdam, Netherlands',
      'Cape Town, South Africa'
    ];

    function updateLocation() {
      // Get current minute to determine which location to show
      const now = new Date();
      const currentMinute = now.getMinutes();
      
      // Cycle through locations based on current minute
      const locationIndex = currentMinute % worldwideLocations.length;
      const currentLocation = worldwideLocations[locationIndex];
      
      const timeString = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      locationElement.textContent = `Last visit from ${currentLocation} at ${timeString}`;
    }

    // Update location immediately
    updateLocation();
    
    // Update location every minute (60000 milliseconds)
    setInterval(updateLocation, 60000);
  }

  /**
   * Initialize about toggle functionality with parallax and fade effects
   */
  function initAboutToggle() {
    const aboutTrigger = document.querySelector('.about-trigger');
    const aboutContent = document.querySelector('.about-content');
    
    if (!aboutTrigger || !aboutContent) return;
    
    // Add initial parallax fade in effect
    aboutTrigger.classList.add('parallax-fade');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      aboutTrigger.classList.remove('parallax-fade');
    }, 600);
    
    aboutTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add fade out effect before toggling
      aboutTrigger.classList.add('parallax-fade-out');
      
      setTimeout(() => {
        // Toggle the active class
        aboutContent.classList.toggle('active');
        aboutTrigger.classList.toggle('active');
        
        // Update the indicator arrow
        const indicator = aboutTrigger.querySelector('.about-indicator');
        if (aboutContent.classList.contains('active')) {
          indicator.textContent = '↓';
          aboutTrigger.setAttribute('aria-expanded', 'true');
        } else {
          indicator.textContent = '→';
          aboutTrigger.setAttribute('aria-expanded', 'false');
        }
        
        // Remove fade out class and add fade in
        aboutTrigger.classList.remove('parallax-fade-out');
        aboutTrigger.classList.add('parallax-fade');
        
        // Remove animation class after animation completes
        setTimeout(() => {
          aboutTrigger.classList.remove('parallax-fade');
        }, 600);
      }, 200); // Half of the fade out duration
    });
    
    // Close about content when clicking outside
    document.addEventListener('click', function(e) {
      if (!aboutTrigger.contains(e.target) && !aboutContent.contains(e.target)) {
        aboutContent.classList.remove('active');
        aboutTrigger.classList.remove('active');
        const indicator = aboutTrigger.querySelector('.about-indicator');
        indicator.textContent = '→';
        aboutTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();