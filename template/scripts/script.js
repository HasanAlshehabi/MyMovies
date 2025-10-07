// Importerar nödvändiga funktioner och moduler
import { fetchTopMovies, searchMovies, fetchMovieDetails} from './modules/api.js';
import { createMovieCard } from './components/movieCard.js';
import { clearContainer, appendToContainer } from './utils/domUtils.js';
import { initializeCarousel } from './modules/caroussel.js';
import { getFavorites, createFavoriteStar } from './utils/favorite.js';
import { renderTrailers } from './utils/trailer.js';

function isPage(fileName) {
  const path = window.location.pathname;
  const last = path.split('/').pop();
  if (fileName === 'index.html') {
    return path === '/' || path === '' || last === 'index.html';
  }
  return last === fileName || path.endsWith('/' + fileName);
}

// Huvudhändelse som triggas när DOM:en är fullständigt laddad
document.addEventListener('DOMContentLoaded', async () => {
    if (isPage('index.html')) {
        const movies = await fetchTopMovies();
        renderTrailers(movies[Math.floor(Math.random() * movies.length)]);
        
        const movieCards = movies.map(createMovieCard);
        const container = document.getElementById('cardContainer');
        clearContainer(container);
        appendToContainer(container, movieCards);

        if (document.querySelector('.carousel')) {
            initializeCarousel();
        }

        // Lägg till eventlyssnare för favoritknappar så att användaren kan lägga till filmer i sina favoriter
        document.querySelectorAll('.fav-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                addToFavorites(event.target.dataset.id); // Lägg till den valda filmen i favoriter
            });
        });

        // Renderar trailers för varje film i listan (för ytterligare filminformation)
        movies.slice(0, 5).forEach((movie, index) => {
        renderTrailers(movie, index + 1);
        });

        // Hanterar sökformuläret
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const query = document.getElementById('searchInput').value.trim();
                if (query) {
                    // Om en sökning görs, byts till sökresultatsidan med sökfrågan
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            });
        }
    }

    // Kollar om vi är på söksidan (search.html)
     if (isPage('search.html'))  {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('q');
        if (query) {
            // Hämtar sökresultaten från API:et baserat på sökfrågan
            const results = await searchMovies(query);
            const movieCards = results.map(createMovieCard);

            // Hämta containern för att visa filmkorten och rensa eventuell tidigare innehåll
            const container = document.getElementById('cardContainer');
            clearContainer(container);

            // Lägger till de skapade filmkorten i containern
            appendToContainer(container, movieCards);
        }
    }
});

// Hanterar favoritsidan (vilket är favorites.html)
if (isPage('favorites.html')) {
    const container = document.getElementById('cardContainer');
    clearContainer(container);

    // Hämtar alla unika favoriter och rensar eventuella duplicerade filmer
    const favoriteIds = [...new Set(getFavorites())]; 

    // Om inga favoriter finns, visa ett meddelande
    if (favoriteIds.length === 0) {
        container.innerHTML = "<p>No favorite movies yet!</p>";
    } else {
        // För varje favorit-ID, hämta filmdata och skapa ett filmkort
        for (const movieId of favoriteIds) {
            const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=f15342f3`);
            const movie = await response.json();
            const movieCard = createMovieCard(movie);

            // Förhindra duplicering av filmkort genom att kolla om det redan finns i DOM
            if (!document.querySelector(`[data-id="${movie.imdbID}"]`)) {
                container.appendChild(movieCard);
            }
        }
    }
};

// Hanterar filmdetaljsidan (movie.html)
if (isPage('movie.html')) {
    const searchParams = new URLSearchParams(window.location.search);
    const movieId = searchParams.get('id');

    console.log("Movie ID from URL:", movieId); // Debugging

    if (movieId) {
        // Hämtar detaljerad information om filmen från API:et
        const movie = await fetchMovieDetails(movieId);

        console.log("Fetched movie details:", movie); // Debugging

        if (movie && movie.Title) {
            // Fyller på med detaljer för filmen i movie.html
            document.getElementById('movieTitle').textContent = movie.Title;
            document.getElementById('moviePoster').src = movie.Poster;
            document.getElementById('moviePoster').alt = `Poster of ${movie.Title}`;
            document.getElementById('moviePlot').textContent = movie.Plot;
            document.getElementById('movieYear').textContent = movie.Year;
            document.getElementById('movieGenre').textContent = movie.Genre;
            document.getElementById('movieDirector').textContent = movie.Director;
            document.getElementById('movieActors').textContent = movie.Actors;
            document.getElementById('movieAwards').textContent = movie.Awards;
            document.getElementById('movieBoxOffice').textContent = movie.BoxOffice;
            document.getElementById('movieCountry').textContent = movie.Country;
            document.getElementById('movieLanguage').textContent = movie.Language;
            document.getElementById('movieRated').textContent = movie.Rated;
            document.getElementById('movieRuntime').textContent = movie.Runtime;
            document.getElementById('movieImdbRating').textContent = movie.imdbRating;

            // Lägg till favoritstjärnan på filmens informationssida
            const favoriteStar = createFavoriteStar(movieId);
            document.querySelector('.movie-info').prepend(favoriteStar);
        }
    }
};
