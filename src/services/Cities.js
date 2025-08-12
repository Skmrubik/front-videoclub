export function getCitiesByCountry(countryId) {
    return fetch('http://localhost:8080/listCitiesByCountryId?country=' + countryId)
        .then((response) => response.json())
}