import React, { useState, useEffect, use } from 'react'
import { getRentalsPending, getRentalsPendingByCustomer, returnRental } from '../services/Rentals.js';
import Rental from '../components/Rental.jsx';
import { getCustomersFormatted } from '../services/Customers.js';
import Select from 'react-select';
import Box from '@mui/material/Box';

function Rentals() {
    const [rentals, setRentals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [customers, setCustomers] = useState([]);
    const [loadRentals, setLoadRentals] = useState(false);

    const styleBox = { width: 200, height: 70, marginTop: '5px', marginLeft: '20px', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '10px' }
    const styleTitleFilter = { fontSize: 18, textAlign: 'center' }

    useEffect(() => {
        setLoadRentals(loadRentals => !loadRentals);
    }, []);

    useEffect(() => {
        // Fetch rentals data from an API or service
        getRentalsPending()
            .then(data => {
                setRentals(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching rentals:', error);
                setIsLoading(false);
            });
        getCustomersFormatted()
            .then(data => {
                setCustomers(data);
            })
            .catch(error => {
                console.error('Error fetching rentals:', error);
            });
    }, [loadRentals]);

    useEffect(() => {
        // Fetch rentals data from an API or service
        if (selectedOption.value !== undefined) {
            getRentalsPendingByCustomer(selectedOption.value === undefined ? "" : selectedOption.value)
                .then(data => {
                    setRentals(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching rentals:', error);
                    setIsLoading(false);
                });
        }
    }, [selectedOption]);

    const deleteRental = (e, rentalId) => {
        if (window.confirm("¿Seguro que quieres borrar este alquiler?")) {
            returnRental(rentalId)
                .then(() => {
                    console.log("Alquiler borrado correctamente", rentalId);
                    setLoadRentals(loadRentals => !loadRentals);
                })
                .catch((err) => {
                    console.log("Fallo al borrar", err.message);
                });
        }
        e.stopPropagation();
    }

    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    return (
        <>
            <div className='container-filter-rent flex-row'>
                <Box className='box-style'>
                    <p className='style-title-filter'>Filtro cliente</p>
                    <Select
                        style={{ color: 'black' }}
                        aria-labelledby="Segoe UI"
                        inputId="Segoe UI"
                        name="Segoe UI"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        defaultValue={0}
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={customers}
                    />
                </Box>
            </div>
            <div>
                <div className='rental-headers flex-row'>
                    <p className='header-title'>Película</p>
                    <p className='header-date'>Fecha de Alquiler</p>
                    <p className='header-first-name'>Nombre</p>
                    <p className='header-last-name'>Apellidos</p>
                </div>
                {rentals.length === 0 && <p style={{ textAlign: 'center'}}>No se encontraron películas alquiladas</p>}
                {rentals.length !== 0 && rentals.map(rental => (
                    <Rental key={rental.rental_id} item={rental} abrirDesplegable={activeIndex === rental.rental_id}
                        onShow={() => setActiveIndex(rental.rental_id)} funcionActivar={setActiveIndex} deleteRental={(e) => deleteRental(e, rental.rental_id)} />
                ))}
            </div>
        </>
    );
}
export default Rentals;