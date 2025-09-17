(function() {
  "use strict";

  /**
   * Mobile Burger Menu Toggle
   */
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (burgerMenu && mobileNavOverlay) {
    burgerMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');
      document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (mobileNavClose && mobileNavOverlay) {
    mobileNavClose.addEventListener('click', function() {
      burgerMenu.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav when clicking on overlay
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
        burgerMenu.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Close mobile nav when clicking on nav items
  document.querySelectorAll('.mobile-nav-item').forEach(navItem => {
    navItem.addEventListener('click', function() {
      burgerMenu.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /**
   * Header toggle for mobile (legacy)
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
    setupMobileNav();
    setupNavIndicator();
    revealOnScroll();
    initNavbarScroll();

    initPhotosPageEscape();

    initLocationDisplay();
    initNewNavigation();
    initAboutToggle();
    initParallaxEffects();
    initSmoothScrolling();
    initLandingAnimations();
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
          (currentPath === '/' && href === '/') ||
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
   * Navbar hide/show on scroll functionality
   */
  function initNavbarScroll() {
    const navbar = document.querySelector('.main-nav');
    if (!navbar) return;

    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }



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
   * Initialize location display
   */
  function initLocationDisplay() {
    const locationElement = document.getElementById('location-text');
    if (!locationElement) return;

    // Check if we're on the homepage (index page)
    if (!document.body.classList.contains('index-page')) return;

    async function fetchLocation() {
      try {
        const response = await fetch('/api/location');
        const data = await response.json();
        
        if (data.success) {
          const now = new Date();
          const timeString = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          
          locationElement.textContent = `Last visit from ${data.location} at ${timeString}`;
        } else {
          locationElement.textContent = 'Location unavailable';
        }
      } catch (error) {
        console.log('Location fetch error:', error);
        locationElement.textContent = 'Location unavailable';
      }
    }

    // Fetch location on page load
    fetchLocation();
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

  /**
   * Initialize parallax effects for landing page
   */
  function initParallaxEffects() {
    const parallaxLayers = document.querySelectorAll('.bg-layer');
    
    if (parallaxLayers.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.1;
        layer.style.transform = `translateY(${rate * speed}px)`;
      });
    });
    
    // Mouse parallax effect
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        parallaxLayers.forEach((layer, index) => {
          const speed = (index + 1) * 5;
          layer.style.transform += ` translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
      });
    }
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Initialize landing page animations
   */
  function initLandingAnimations() {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.skills-section, .projects-section, .contact-section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      category.style.animationDelay = `${index * 0.15}s`;
      observer.observe(category);
    });
  }
})();