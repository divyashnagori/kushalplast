document.addEventListener('DOMContentLoaded', () => {
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    const sections = document.querySelectorAll('.product-row, .cta-banner-refined');

    // Intersection Observer Options
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Active when section is near top-center of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the id of the section
                const id = entry.target.getAttribute('id');

                // Remove active class from all buttons
                toolbarButtons.forEach(btn => {
                    btn.classList.remove('active');
                    // Add active class to corresponding button
                    if (btn.getAttribute('href') === `#${id}`) {
                        btn.classList.add('active');

                        // Scroll toolbar to keep active button in view (for mobile mainly)
                        btn.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center'
                        });
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        if (section.id) { // Only observe if it has an ID
            observer.observe(section);
        }
    });

    // Validating Click Events for smooth transition
    toolbarButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Allow default anchor click behavior as generic smooth scroll handles the movement
            // But manually set active state immediately for perceived responsiveness
            toolbarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
