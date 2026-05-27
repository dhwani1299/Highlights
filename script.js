document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Special handling for problem steps to stagger them
                if (entry.target.classList.contains('problem-steps')) {
                    const steps = entry.target.querySelectorAll('.step');
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.classList.add('active');
                        }, index * 600); // Stagger by 600ms
                    });
                }
                
                // Unobserve after animating once
                // observer.unobserve(entry.target); 
            } else {
                // Optional: remove class when out of view to re-animate
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .problem-steps');
    animatedElements.forEach(el => observer.observe(el));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a slight parallax effect to images
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const images = document.querySelectorAll('.image-content img');
        
        images.forEach(img => {
            const speed = 0.05;
            const yPos = -(scrolled * speed);
            // Only apply parallax if element is roughly in viewport to save performance
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                 img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
});
