import React, { useState, useEffect } from 'react'
import { getActorsOfFilm, getAvailableFilms } from '../services/Films'
import { getCustomersFormatted } from '../services/Customers.js';
import { insertRental } from '../services/Rentals.js';
import Select from 'react-select';
import Box from '@mui/material/Box';
function FilmBox({ value, item, abrirDesplegable, onShow, funcionActivar }) {

  const [actors, setActors] = useState([]);
  const [availableFilms, setAvailableFilms] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customers, setCustomers] = useState([]);

  const styleBox = { width: 200, height: 70, marginTop: '5px', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '10px' }
  const styleTitleFilter = { fontSize: 18, textAlign: 'center' }

  const getInfo = () => {
    onShow();
    if (abrirDesplegable) {
      funcionActivar(null);
    }
    getActorsOfFilm(item.film_id.film_id)
      .then(items => {
        setActors(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    getAvailableFilms(item.film_id.film_id)
      .then(items => {
        setAvailableFilms(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    getCustomersFormatted()
      .then(data => {
          setCustomers(data);
      })
      .catch(error => {
          console.error('Error fetching rentals:', error);
      });
  };

  const propertyFilm = (descripcion, valor) => {
    return (
      <div className='propiedad flex-row'>
        <p>{descripcion} </p>
        <p className='propiedad-valor'>{valor}</p>
      </div>
    );
  }

  const propertyFilmFirst = (descripcion, valor) => {
    return (
      <div  className='propiedad flex-row property-film-first flex-column'>
        <p>{descripcion} </p>
        <p className='propiedad-valor'>{valor}</p>
      </div>
    );
  }

  const handleSelectClick = (e) => {
    e.stopPropagation();
    console.log("El clic en el Select fue detenido.");
  };

  const onMenuOpen = () => {
    setIsMenuOpen(true);
  }
  const onMenuClose = () => {
    setIsMenuOpen(false);
  }
  
  return (
    <div className='film' onClick={getInfo}>
      <div className='film-container flex-row'>
        <div className='film-category'>
          <p>{item.categoryId.name.toUpperCase()}</p>
        </div>
        <p className='title' key={value}>{item.film_id.title.toUpperCase()} </p>
        <div className='film-cost flex-row'>
          <p>{item.film_id.replacementCost + " €"}</p>
        </div>
      </div>
      
      {abrirDesplegable && (
        <div className='desplegable flex-row'>
          <div className='info-film-container flex-column'>
            {propertyFilmFirst("Descripción", item.film_id.description)}
            {propertyFilmFirst("Actores", actors.map((actor, index) => { return (actor.firstName + " " + actor.lastName + (index != actors.length - 1 ? ", " : "")) }))}
            <div className='film-last-properties flex-row'>
              <div className='film-last-properties-division flex-column'>
                {propertyFilm("Duración:", item.film_id.length + " min")}
              </div>
              <div className='film-last-properties-division flex-column'>
                {propertyFilm("Puntuación:", item.film_id.rentalRate)}
              </div>
            </div>
            
            
          </div>
          <div className='rental-container flex-column'>
            <Box className='box-style background-white'>
                <p className='style-title-filter'>Seleccionar cliente</p>
                <div onClick={handleSelectClick}>
                  <Select
                      style={{ color: 'black' }}
                      aria-labelledby="Segoe UI"
                      inputId="Segoe UI"
                      name="Segoe UI"
                      onMenuOpen={onMenuOpen}
                      onMenuClose={onMenuClose}
                      defaultValue={0}
                      disabled={availableFilms.length === 0}
                      value={selectedOption}
                      onChange={setSelectedOption}
                      options={customers}
                  />
                </div>
            </Box>
            {propertyFilm("Peliculas disponibles:", availableFilms.length)}
            <button onClick={() => {
              if (selectedOption.value !== undefined) {
                insertRental(selectedOption.value, availableFilms[0])
                  .then(() => {
                    console.log("Rental insertado");
                    setSelectedOption("");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              } else {
                console.log("Por favor, selecciona un cliente.");
              }
            }} className='button-rental'
              disable={(selectedOption.value === undefined).toString()}>Alquilar Película</button>  
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmBox;

