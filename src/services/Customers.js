export function insertCustomer() {
    return fetch('http://localhost:8080/insertCustomer',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: "Jorge",
                lastName: "Castillo",
                email: "a@mail.com",
                addressId: {
                    address: "Calle a",
                    address2: "Calle b",
                    district: "1",
                    cityId: {
                        city_id: 424
                    },
                    postalCode: "12345",
                    phone: "123456789",
                }
            })
        }
    )
    .then((response) => response.json())
}