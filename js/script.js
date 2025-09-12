// Initialize scripts after sections are loaded
function initScripts() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.querySelector('.close-menu');

  function toggleMenu() {
    navLinks.classList.toggle('mobile-active');
    const isActive = navLinks.classList.contains('mobile-active');
    
    document.body.style.overflow = isActive ? 'hidden' : '';
    mobileMenuBtn.style.display = isActive ? 'none' : 'block'; // hide/show hamburger
    
    // Update aria-expanded
    mobileMenuBtn.setAttribute('aria-expanded', isActive);
}


    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            document.body.style.overflow = '';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            document.body.style.overflow = '';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Portfolio filter functionality
    const filterBtns = document.querySelectorAll(".filter-btn");
    const grid = document.querySelector(".portfolio-grid");
    const items = Array.from(document.querySelectorAll(".portfolio-item"));

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Toggle active button
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            // Remove all items from grid temporarily
            grid.innerHTML = "";

            // Filter items
            const filtered = items.filter(item =>
                filter === "all" || item.getAttribute("data-category") === filter
            );

            // Append filtered items back to grid
            filtered.forEach(item => {
                grid.appendChild(item);
            });
        });
    });




    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission
    document.querySelector('form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xgvlqvgq", {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                //alert('✅ Thank you for your message! I will get back to you soon.');
                form.reset();
            } else {
                alert('❌ Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('⚠️ Network error. Please check your connection and try again.');
        }
    });

    // Scroll-trigger animations
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Initialize scripts when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initScripts();
});