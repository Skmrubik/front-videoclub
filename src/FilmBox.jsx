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
          <p className='title' key={value}>{item.title} </p>
          {abrirDesplegable && (
            <div className='desplegable'>
              {propertyFilm("Duración:", item.length + " min")}
              {propertyFilm("Descripcion:", item.description)}
              {propertyFilm("Precio:", item.replacementCost + " €")}
            </div>
          )}
        </div>
    );

}

export default FilmBox;

