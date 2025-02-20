export function addToFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

export function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function toggleFavorite(movieId, starElement) {
    let favorites = getFavorites();
    if (favorites.includes(movieId)) {
        removeFromFavorites(movieId);
        starElement.classList.remove('filled');
    } else {
        addToFavorites(movieId);
        starElement.classList.add('filled');
    }
}