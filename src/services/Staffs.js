export function getStaffs() {
    return fetch('http://localhost:8080/listStaffs')
        .then((response) => response.json())
}