import React, { useState, useEffect } from 'react'
import { getActorsOfFilm } from './services/Films'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import './App.css'

function FilmBox({value, item, abrirDesplegable, onShow}) {

    const [actors, setActors] = useState([]);
    //const [abrirDesplegable, setAbrirDesplegable] = useState(false);
    useEffect(() => {
      getActorsOfFilm(item.film_id.film_id)
        .then(items => {
          setActors(items)
        })
        .catch((err) => {
          console.log(err.message);
        });
      }, []
    );

    const propertyFilm = (descripcion, valor) => {  
        return (
            <div className='propiedad'>
                <p>{descripcion} </p>
                <p className='propiedad-valor'>{valor}</p>
            </div>
        );
    }

    return (
        <div className='film' onClick={onShow}>
          <p className='title' key={value}>{item.film_id.title} </p>
          {abrirDesplegable && (
            <div className='desplegable'>
              {propertyFilm("Descripción:", item.film_id.description)}
              {propertyFilm("Actores:", actors.map((actor, index) => {return(actor.firstName+ " "+ actor.lastName + (index != actors.length-1?", ": ""))}))}
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

