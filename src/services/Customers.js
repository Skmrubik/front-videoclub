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