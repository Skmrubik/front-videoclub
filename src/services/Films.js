export function getFirstNFilms(tam) {
    return fetch('http://localhost:8080/listFilms/'+tam)
        .then((response) => response.json())
}

export function getFilmsBetweenLength(min, max) {
    return fetch('http://localhost:8080/listFilmsBetweenDuration?minValue='+min+'&maxValue='+max)
        .then((response) => response.json())
}