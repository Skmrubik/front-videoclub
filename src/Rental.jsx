import React, { useState, useEffect } from 'react'
import {getCustomerById} from './services/Customers.js';
import { set } from 'react-hook-form';
const Rental = ({key, item, abrirDesplegable, onShow, funcionActivar, deleteRental}) => {

    const date = new Date(item.rental_date);
    const formattedDate = date.toGMTString().replace(' GMT', '');
    const [customer, setCustomer] = useState(); 
    const [isLoading, setIsLoading] = useState(true);

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
            <div className='propiedad'>
                <p className='label-property-customer'>{descripcion} </p>
                <p className='propiedad-valor'>{valor}</p>
            </div>
        );
    }

    return(
        <div className='rental-item' onClick={getInfo} key={key}> 
            <div className='rental-item-priority-values'>
                <p className='rental-title'>{item.title}</p>
                <p className='rental-date'>{formattedDate}</p>
                <p className='rental-first-name'>{item.first_name}</p>
                <p className='rental-last-name'>{item.last_name}</p>
                <div className='rental-div-delete'>
                    <button className='rental-button' onClick={deleteRental}>Borrar</button>
                </div>
                
            </div>      
            {abrirDesplegable && !isLoading && (
                <div className='rental-desplegable'>
                    {propertyCustomer("Email:", customer.email)}
                    {propertyCustomer("Dirección:", customer.addressId.address)}
                    {propertyCustomer("Código Postal:", customer.addressId.postalCode)}
                    {propertyCustomer("Distrito:", customer.addressId.district)}
                    {propertyCustomer("Ciudad:", customer.addressId.cityId.city)}
                    {propertyCustomer("País:", customer.addressId.cityId.countryId.country)}
                    {propertyCustomer("Teléfono:", customer.addressId.phone)}

                </div>
            )}
        </div>
    );
};

export default Rental;