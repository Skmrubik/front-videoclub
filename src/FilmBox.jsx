import React, { useState, useEffect } from 'react'
import { getFilmsBetweenLength } from './services/Films'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import './App.css'

function FilmBox({value, item}) {

    const [abrirDesplegable, setAbrirDesplegable] = useState(false);

    const propertyFilm = (descripcion, valor) => {  
        return (
            <div className='propiedad'>
                <p>{descripcion} </p>
                <p className='propiedad-valor'>{valor}</p>
            </div>
        );
    }
    return (
        <div className='film' onClick={() => setAbrirDesplegable(!abrirDesplegable)}>
          <p className='title' key={value}>{item.film_id.title} </p>
          {abrirDesplegable && (
            <div className='desplegable'>
              {propertyFilm("Descripción:", item.film_id.description)}
              {propertyFilm("Duración:", item.film_id.length + " min")}
              {propertyFilm("Puntuación:", item.film_id.rentalRate)}
              {propertyFilm("Categoría:", item.categoryId.name)}
              {propertyFilm("Precio:", item.film_id.replacementCost + " €")}
            </div>
          )}
        </div>
    );

}

export default FilmBox;

