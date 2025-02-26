import { fetchTopMovies, searchMovies, fetchMovieDetails} from './modules/api.js';
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

if (window.location.pathname.includes('movie.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const movieId = searchParams.get('id');

        console.log("Movie ID from URL:", movieId); // Debugging

        if (movieId) {
            const movie = await fetchMovieDetails(movieId);

            console.log("Fetched movie details:", movie); // Debugging

            if (movie && movie.Title) {
                // Populate individual elements in movie.html
                document.getElementById('movieTitle').textContent = movie.Title;
                document.getElementById('moviePoster').src = movie.Poster;
                document.getElementById('moviePoster').alt = `Poster of ${movie.Title}`;
                document.getElementById('moviePlot').textContent = movie.Plot;
                document.getElementById('movieYear').textContent = movie.Year;
                document.getElementById('movieGenre').textContent = movie.Genre;
                document.getElementById('movieDirector').textContent = movie.Director;
                document.getElementById('movieActors').textContent = movie.Actors;
            } else {
                document.getElementById('movieInformation').innerHTML = "<p>Movie details could not be loaded.</p>";
            }
        }
    });
}