export function insertCustomer(customer) {
    return fetch('http://localhost:8080/insertCustomer',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }
    )
    .then((response) => response.json())
}

export function getCustomerById(customerId) {
    return fetch('http://localhost:8080/getCustomerById?idCustomer='+ customerId)
        .then((response) => response.json())
}

export function getCustomersFormatted() {
    return fetch('http://localhost:8080/listCustomersFormatted')
        .then((response) => response.json())
}