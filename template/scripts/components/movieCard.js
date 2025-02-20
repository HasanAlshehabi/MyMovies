import { getFavorites, toggleFavorite} from '../utils/favorite.js';

export function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    const favorites = getFavorites(); // Se till att det är en array
    const isFavorite = favorites.includes(movie.imdbID);
    
    card.innerHTML = `
        <div class="movie-card-content">
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <span class="fav-star ${isFavorite ? 'filled' : ''}" data-id="${movie.imdbID}">★</span>
        </div>
    `;
    
    const favStar = card.querySelector('.fav-star');
    favStar.addEventListener('click', () => {
        toggleFavorite(movie.imdbID, favStar);
    });
    
    return card;
}
