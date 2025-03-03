document.addEventListener('DOMContentLoaded', function () {
    // Function to load HTML content
    async function loadComponent(url, containerId) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            document.getElementById(containerId).innerHTML = html;

            // Reinitialize any scripts that need to run after loading components
            if (containerId === 'header-container') {
                // Initialize header-specific scripts
                initializeMobileMenu();
            }
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
        }
    }

    // Function to initialize mobile menu
    function initializeMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileNav = document.getElementById('mobile-nav');

        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', function () {
                mobileToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });
        }
    }

    // Load components only after preloader is ready
    const preloader = document.getElementById('preloader');

    // Create a promise that resolves when window is fully loaded
    const windowLoaded = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    // Load components and handle preloader
    Promise.all([
        loadComponent('/components/header.html', 'header-container'),
        loadComponent('/components/footer.html', 'footer-container'),
        loadComponent('/components/projects-section.html', 'projects-section-container'),
        windowLoaded
    ]).then(() => {
        // Remove preloader after all components are loaded
        setTimeout(() => {
            preloader.remove();
        }, 1000); // Keep preloader for 1 second after loading completes
    }).catch(error => {
        console.error('Error loading components:', error);
        // Remove preloader even if there's an error
        preloader.remove();
    });
});