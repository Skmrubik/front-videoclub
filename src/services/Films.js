export function getFirstNFilms(tam) {
    return fetch('http://localhost:8080/listFilms/'+tam)
        .then((response) => response.json())
}