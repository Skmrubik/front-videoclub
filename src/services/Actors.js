export function getActors() {
    return fetch('http://localhost:8080/listActorsFormatted')
        .then((response) => response.json())
}