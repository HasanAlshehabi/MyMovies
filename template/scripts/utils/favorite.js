// Funktion för att lägga till en film till favoriter
export function addToFavorites(movieId) {
    // Hämtar de nuvarande favoriterna från localStorage eller en tom array om inga finns
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Kollar om filmen redan finns i favoriterna, om inte, lägg till den
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        // Uppdaterar localStorage med den nya listan av favoriter
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Funktion för att ta bort en film från favoriter
export function removeFromFavorites(movieId) {
    // Hämtar de nuvarande favoriterna från localStorage eller en tom array om inga finns
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Filtrerar bort filmen som ska tas bort från favoriter
    favorites = favorites.filter(id => id !== movieId);
    // Uppdaterar localStorage med den nya listan av favoriter
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Funktion för att hämta alla favoriter
export function getFavorites() {
    // Hämtar favoriter från localStorage och returnerar dem eller en tom array om inga finns
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Funktion för att växla favoritstatus för en film ( alltså lägga till eller ta bort från favoriter)
export function toggleFavorite(movieId, starElement) {
    // Hämtar nuvarande favoriter
    let favorites = getFavorites();
    
    // Om filmen finns bland favoriterna, ta bort den och ta bort den fyllda stjärnan
    if (favorites.includes(movieId)) {
        removeFromFavorites(movieId);
        starElement.classList.remove('filled');
    } else {
        // Om filmen inte finns bland favoriterna, lägg till den och fyll stjärnan
        addToFavorites(movieId);
        starElement.classList.add('filled');
    }
}

// Funktion för att skapa en favoritstjärna för en film
export function createFavoriteStar(movieId) {
    // Hämtar nuvarande favoriter
    const favorites = getFavorites();
    
    // Skapar ett span-element som ska representera stjärnan
    const favStar = document.createElement('span');
    favStar.classList.add('fav-star');  // Lägger till CSS-klass för stjärnan
    favStar.dataset.id = movieId;  // Sätter dataset-id till filmens imdbID
    favStar.textContent = '★';  // Sätter stjärnans symbol

    // Om filmen redan är en favorit, lägg till 'filled' klassen för att fylla stjärnan
    if (favorites.includes(movieId)) {
        favStar.classList.add('filled');
    }

    // Lägg till en eventlistener för att toggla favoritstatus när stjärnan klickas
    favStar.addEventListener('click', (event) => {
        event.stopPropagation();  // Förhindrar att eventet bubblar upp och triggar andra klickhändelser
        toggleFavorite(movieId, favStar); 
    });

    return favStar; 
}
