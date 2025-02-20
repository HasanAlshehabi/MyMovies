
export function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    console.log("Carousel found:", carousel);
    console.log("Slides found:", slides.length);
    console.log("Prev button found:", prevButton);
    console.log("Next button found:", nextButton);

    if (!carousel || slides.length === 0 || !prevButton || !nextButton) {
        console.log("Carousel elements are missing, skipping initialization.");
        return;
    }

    let currentIndex = 0;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    updateCarousel();
}


