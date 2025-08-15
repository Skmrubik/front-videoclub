import React, { useState, useEffect } from 'react'
import { getCustomerById } from '../services/Customers.js';
import DeleteIcon from '@mui/icons-material/Delete';
const Rental = ({ key, item, abrirDesplegable, onShow, funcionActivar, deleteRental }) => {

    const date = new Date(item.rental_date);
    const formattedDate = date.toGMTString().replace(' GMT', '');
    const [customer, setCustomer] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const currentDate = new Date();
    const diffInMS = Math.abs(currentDate - date);
    const diffInHours = Math.ceil(diffInMS / (1000 * 60 * 60));
    const diffInDays = Math.ceil(diffInMS / (1000 * 60 * 60 * 24));
    const diffHoursMax = 10;

    const getInfo = (e) => {
        getCustomerById(item.customer_id)
            .then(response => {
                setCustomer(response)
                setIsLoading(false);
                console.log("Cliente obtenido:", response);
                onShow();
                if (abrirDesplegable) {
                    funcionActivar(null);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const propertyCustomer = (descripcion, valor) => {
        return (
            <div className='propiedad flex-row'>
                <p className='label-property-customer'>{descripcion} </p>
                <p className='propiedad-valor'>{valor}</p>
            </div>
        );
    }

    return (
        <div className='rental-item flex-column' onClick={getInfo}>
            <div className='flex-row'>
                <p className='rental-title'>{item.title}</p>
                <p className='rental-date' style={{color: diffInHours > diffHoursMax? 'red': '#662900'}}>{formattedDate}</p>
                <p className='rental-first-name'>{item.first_name}</p>
                <p className='rental-last-name'>{item.last_name}</p>
                <div className='rental-div-delete'>
                    <button className='rental-button' onClick={deleteRental}><DeleteIcon fontSize='small'/></button>
                </div>

            </div>
            {abrirDesplegable && !isLoading && (
                <div className='rental-desplegable flex-row'>
                    <div className='rental-customer-info flex-column'>
                         {propertyCustomer("Email:", customer.email)}
                        {propertyCustomer("Dirección:", customer.addressId.address)}
                        {propertyCustomer("Código Postal:", customer.addressId.postalCode)}
                        {propertyCustomer("Distrito:", customer.addressId.district)}
                    </div>
                    <div className='rental-customer-info flex-column'>
                        {propertyCustomer("Ciudad:", customer.addressId.cityId.city)}
                        {propertyCustomer("País:", customer.addressId.cityId.countryId.country)}
                        {propertyCustomer("Teléfono:", customer.addressId.phone)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rental;