// Funktion för att rensa innehållet i en container
export function clearContainer(container) {
    container.innerHTML = '';
}
// Funktion för att lägga till flera element i en container
export function appendToContainer(container, elements) {
    elements.forEach(el => container.appendChild(el));
}

