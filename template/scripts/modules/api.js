// api.js - Hämtar data från API

// Funktion som hämtar de bästa filmerna från en extern JSON-fil
export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        if (!response.ok) throw new Error('Failed to fetch top movies');
        let movies = await response.json(); // Konverterar svaret till JSON-format
        return shuffleArray (movies);
    } catch (error) {
        console.error(error);
        return [];
    }
}
// Funktion som blandar en array (slumpmässig ordning)
export function shuffleArray(array){
    return array.sort (()=> Math.random() - 0.5);
}

// Funktion som söker filmer baserat på användarens sökfråga
export async function searchMovies(query) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=f15342f3&s=${query}`);
        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Funktion som hämtar detaljerad information om en film baserat på dess IMDb ID
export async function fetchMovieDetails(imdbID) {
    try{
        const response = await fetch (`https://www.omdbapi.com/?apikey=f15342f3&plot=full&i=${imdbID}`);
        if (!response.ok) throw new Error('Failed to fetch movies details')
           return await response.json();
    }
    catch (error){
        console.error(error);
        return [];
    }
}