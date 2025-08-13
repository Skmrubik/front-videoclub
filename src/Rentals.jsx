import React, { useState, useEffect } from 'react'
import { getRentalsPending } from './services/Rentals.js'
import Rental from './Rental.jsx';


function Rentals() {
    const [rentals, setRentals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    
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
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <div className='rental-headers'>
                <p className='header-title'>Película</p>
                <p className='header-date'>Fecha de Alquiler</p>
                <p className='header-first-name'>Nombre</p>
                <p className='header-last-name'>Apellidos</p>
            </div>
            {rentals.map(rental => (
                <Rental key={rental.rental_id} item={rental} abrirDesplegable={activeIndex === rental.rental_id} 
                        onShow={() => setActiveIndex(rental.rental_id)} funcionActivar={setActiveIndex}/>
            ))}
        </div>
    );
}
export default Rentals;