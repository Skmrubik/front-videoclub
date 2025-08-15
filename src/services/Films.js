export function getFirstNFilms(tam) {
    return fetch('http://localhost:8080/listFilms/'+tam)
        .then((response) => response.json())
}

export function getFilmsFormatted() {
    return fetch('http://localhost:8080/listFilmsFormatted')
        .then((response) => response.json())
}

export function getFilmsBetweenLength(min, max, category, actorId, filmId, page) {
    return fetch('http://localhost:8080/listFilmsFilter?minDuration='+min+'&maxDuration='+max+'&category='+category+'&actorId='+actorId+'&filmId='+filmId+'&page='+page)
        .then((response) => response.json())
}

export function getFilmsWithCategories() {
    return fetch('http://localhost:8080/listFilmsCategory')
        .then((response) => response.json())
}

export function getActorsOfFilm(idFilm) {
    return fetch('http://localhost:8080/listActorsOfFilms?idFilm='+idFilm)
        .then((response) => response.json())
}

export function getAvailableFilms(idFilm) {
    return fetch('http://localhost:8080/getAvailableFilms?filmId='+idFilm)
        .then((response) => response.json())
}

