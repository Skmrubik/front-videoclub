export function getCountries() {
    return fetch('http://localhost:8080/listCountriesFormatted')
        .then((response) => response.json())
}