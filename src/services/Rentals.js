export function getRentalsPending() {
    return fetch('http://localhost:8080/listRentalsPending')
        .then((response) => response.json())
}

export function getRentalsPendingByCustomer(customerId) {
    return fetch('http://localhost:8080/listRentalsPendingByCustomer?customerId=' + customerId)
        .then((response) => response.json())
}