import { fetchTopMovies, searchMovies} from './modules/api.js';
import { createMovieCard } from './components/movieCard.js';
import { clearContainer, appendToContainer } from './utils/domUtils.js';
import { initializeCarousel } from './modules/caroussel.js';
import { getFavorites} from './utils/favorite.js';
import { renderTrailers } from './utils/trailer.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('index.html')) {
        const movies = await fetchTopMovies();
        renderTrailers(movies[Math.floor(Math.random() * movies.length)]);
        
        const movieCards = movies.map(createMovieCard);
        const container = document.getElementById('cardContainer');
        clearContainer(container);
        appendToContainer(container, movieCards);
        
        if (document.querySelector('.carousel')) {
            initializeCarousel();
        }

        document.querySelectorAll('.fav-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                addToFavorites(event.target.dataset.id);
            });
        });

        movies.forEach((movie, index) => {
            renderTrailers(movie, index + 1);
        });
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const query = document.getElementById('searchInput').value.trim();
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            });
        }
    }

    if (window.location.pathname.includes('search.html')) {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('q');
        if (query) {
            const results = await searchMovies(query);
            const movieCards = results.map(createMovieCard);
            const container = document.getElementById('cardContainer');
            clearContainer(container);
            appendToContainer(container, movieCards);
        }
    }
    if (window.location.pathname.includes('favorites.html')) {
    const container = document.getElementById('cardContainer');
    clearContainer(container);

    const favoriteIds = getFavorites();

    if (favoriteIds.length === 0) {
        container.innerHTML = "<p>No favorite movies yet!</p>";
    } else {
        favoriteIds.forEach(async (movieId) => {
            const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=f15342f3`);
            const movie = await response.json();
            const movieCard = createMovieCard(movie);
            container.appendChild(movieCard);
        });
    }
}
});

if (window.location.pathname.includes('favorites.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const container = document.getElementById('cardContainer');
        clearContainer(container);

        const favoriteIds = [...new Set(getFavorites())]; // jag fixade så att jag får en unika film

        if (favoriteIds.length === 0) {
            container.innerHTML = "<p>No favorite movies yet!</p>";
        } else {
            for (const movieId of favoriteIds) {
                const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=f15342f3`);
                const movie = await response.json();
                const movieCard = createMovieCard(movie);

                // Förhindra dubbla genom att kontrollera om kortet redan finns i DOM
                if (!document.querySelector(`[data-id="${movie.imdbID}"]`)) {
                    container.appendChild(movieCard);
                }
            }
        }
    });
}