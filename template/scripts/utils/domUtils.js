

export function clearContainer(container) {
    container.innerHTML = '';
}

export function appendToContainer(container, elements) {
    elements.forEach(el => container.appendChild(el));
}

