export function getRentalsPending() {
    return fetch('http://localhost:8080/listRentalsPending')
        .then((response) => response.json())
}

export function getRentalsPendingByCustomer(customerId) {
    return fetch('http://localhost:8080/listRentalsPendingByCustomer?customerId=' + customerId)
        .then((response) => response.json())
}

export function deleteRentalById(rentalId) {
    return fetch('http://localhost:8080/deleteRentalById?rentalId=' + rentalId, {
            method: 'DELETE',
            headers: {
                    'Content-type': 'application/json'
                }
        })
        .then((response) => response)
}