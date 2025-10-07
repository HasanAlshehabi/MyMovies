import { getFavorites, toggleFavorite,} from '../utils/favorite.js';

// Funktion för att skapa ett filmkort
export function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    //// Hämtar favoritfilmer från localStorage
    const favorites = getFavorites(); // Se till att det är en array
    const isFavorite = favorites.includes(movie.imdbID);

    // Skapar innehållet för filmkortet
    const cardContent = document.createElement('div');
    cardContent.classList.add('movie-card-content');
    cardContent.dataset.id = movie.imdbID;

    // Skapar och lägger till en bild på filmen
    const img = document.createElement('img');
    img.src = movie.Poster;
    img.alt = movie.Title;
    img.classList.add('movie-poster');

    const title = document.createElement('h3');
    title.textContent = movie.Title;

    // Skapar och hanterar favoritstjärnan
    const favStar = document.createElement('span');
    favStar.classList.add('fav-star');
    if (isFavorite) favStar.classList.add('filled');
    favStar.dataset.id = movie.imdbID;
    favStar.textContent = '★';

    cardContent.appendChild(img);
    cardContent.appendChild(title);
    cardContent.appendChild(favStar);
    card.appendChild(cardContent);

    // När man klickar på filmkortet, navigera till filmens detaljsida
    card.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    // När man klickar på favoritstjärnan, toggla favoriten
    favStar.addEventListener('click', (event) => {
        event.stopPropagation(); // Förhindra dubbla klickhändelser
        toggleFavorite(movie.imdbID, favStar);
    });

    return card;
}