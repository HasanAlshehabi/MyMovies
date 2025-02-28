// Funktion för att initialisera karusellen
export function initializeCarousel() {
    // Hämta element som representerar karusellen från HTML
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    //debugging
    console.log("Carousel found:", carousel);
    console.log("Slides found:", slides.length);
    console.log("Prev button found:", prevButton);
    console.log("Next button found:", nextButton);

     //Jag kontrollera om alla nödvändiga element finns, annars avsluta
    if (!carousel || slides.length === 0 || !prevButton || !nextButton) {
        console.log("Carousel elements are missing, skipping initialization.");
        return;
    }

    // Variabel för att hålla koll på det aktuella bildspelsindexet
    let currentIndex = 0;

    // Funktion för att uppdatera karusellen (visa rätt bild)
    function updateCarousel() {
         // Går igenom alla bilder och aktiverar den bild som ska visas
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    prevButton.addEventListener('click', () => {
        // Om vi inte är på första bilden, minska index, annars gå till sista bilden
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
         // Om vi inte är på sista bilden, öka index, annars gå till första bilden
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    updateCarousel();
}


