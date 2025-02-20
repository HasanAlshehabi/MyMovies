// api.js - Hämtar data från API
export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        if (!response.ok) throw new Error('Failed to fetch top movies');
        let movies = await response.json();
        return shuffleArray (movies);
    } catch (error) {
        console.error(error);
        return [];
    }
}
export function shuffleArray(array){
    return array.sort (()=> Math.random() - 0.5);
}

export async function searchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=f15342f3`);
        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}