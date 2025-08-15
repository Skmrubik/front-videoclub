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
      <div className='propiedad'>
        <p>{descripcion} </p>
        <p className='propiedad-valor'>{valor}</p>
      </div>
    );
  }

  const propertyFilmFirst = (descripcion, valor) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }} className='propiedad'>
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
      <div style={{ display: 'flex', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{backgroundColor: '#662900', height: '100%', borderRadius: '5px 0px 0px 5px',  width: '15%', color: 'white', textAlign: 'center'}}>
          <p>{item.categoryId.name.toUpperCase()}</p>
        </div>
        <p className='title' key={value}>{item.film_id.title.toUpperCase()} </p>
        <div style={{width: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
          <p>{item.film_id.replacementCost + " €"}</p>
        </div>
      </div>
      
      {abrirDesplegable && (
        <div className='desplegable'>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingRight: 10, justifyContent: 'space-between', width: '75%' }}>
            {propertyFilmFirst("Descripción", item.film_id.description)}
            {propertyFilmFirst("Actores", actors.map((actor, index) => { return (actor.firstName + " " + actor.lastName + (index != actors.length - 1 ? ", " : "")) }))}
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center',  width: '50%' }}>
                {propertyFilm("Duración:", item.film_id.length + " min")}
              </div>
              <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center',  width: '50%' }}>
                {propertyFilm("Puntuación:", item.film_id.rentalRate)}
              </div>
            </div>
            
            
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '25%', backgroundColor: '#ff944d', padding: '15px', borderRadius: '5px' }}>
            <Box sx={{ ...styleBox, ...{ fontFamily: 'Segoe UI', backgroundColor: 'white' } }}>
                <p style={{...styleTitleFilter,...{color: 'black', fontWeight: 400}}}>Seleccionar cliente</p>
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
            }} style={{ fontFamily: 'Segoe UI', fontSize: 20, padding: '10px 20px', color: 'white', backgroundColor: '#cc5200', border: 'none',  boxShadow: '2px 2px 0px 1px #803300', borderRadius: '5px' }}
              disable={(selectedOption.value === undefined).toString()}>Alquilar Película</button>  
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmBox;

