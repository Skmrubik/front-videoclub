export function getRentalsPending() {
    return fetch('http://localhost:8080/listRentalsPending')
        .then((response) => response.json())
}