/**
* Template Name: BizLand
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Updated: Dec 05 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

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
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

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
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initialize Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function(slider) {
      const configElement = slider.querySelector('.swiper-config');
      if (!configElement) return;

      try {
        const config = JSON.parse(configElement.textContent);
        
        // Add custom classes for navigation
        // if (!slider.querySelector('.swiper-button-next')) {
        //   const nextBtn = document.createElement('div');
        //   nextBtn.className = 'swiper-button-next home-page-next-btn';
        //   slider.appendChild(nextBtn);
        // }
        
        // if (!slider.querySelector('.swiper-button-prev')) {
        //   const prevBtn = document.createElement('div');
        //   prevBtn.className = 'swiper-button-prev home-page-prev-btn';
        //   slider.appendChild(prevBtn);
        // }

        // Initialize Swiper
        new Swiper(slider, config);
      } catch (error) {
        console.error('Error initializing swiper:', error);
      }
    });
  }

  // Initialize Swiper on page load
  window.addEventListener('load', initSwiper);

  // Re-initialize Swiper when dynamic content is loaded
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && (node.matches('.init-swiper') || node.querySelector('.init-swiper'))) {
            setTimeout(initSwiper, 100); // Small delay to ensure content is fully loaded
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  /**
   * Initialize portfolio Swiper
   */
  function initPortfolioSwiper() {
    const portfolioSlider = document.querySelector('.hp-portfolio-container .hp-slider');
    if (!portfolioSlider) return;

    const configElement = portfolioSlider.querySelector('.swiper-config');
    if (!configElement) return;

    try {
      const config = JSON.parse(configElement.textContent);
      const swiper = new Swiper(portfolioSlider, config);

      // Handle room selection buttons
      const roomButtons = document.querySelectorAll('.room-btn');
      roomButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const slideIndex = parseInt(button.getAttribute('data-slide'));
          swiper.slideTo(slideIndex);
          
          // Update active state
          roomButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });

      // Update room button active state on slide change
      swiper.on('slideChange', () => {
        const activeIndex = swiper.realIndex;
        roomButtons.forEach((button) => {
          const slideIndex = parseInt(button.getAttribute('data-slide'));
          if (slideIndex === activeIndex) {
            button.classList.add('active');
          } else {
            button.classList.remove('active');
          }
        });
      });
    } catch (error) {
      console.error('Error initializing portfolio swiper:', error);
    }
  }

  window.addEventListener('load', initPortfolioSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// document.addEventListener('DOMContentLoaded', () => {
//   fetch('../helpers/header.html')
//     .then(response => response.text())
//     .then(data => document.getElementById('header').innerHTML = data);

//   fetch('../helpers/footer.html')
//     .then(response => response.text())
//     .then(data => document.getElementById('footer').innerHTML = data);
// });