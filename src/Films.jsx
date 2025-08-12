import React, { useState, useEffect } from 'react'
import { getFilmsBetweenLength } from './services/Films.js'
import { getActors } from './services/Actors.js'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import './App.css'
import FilmBox from './FilmBox.jsx';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from 'react-select';
import {categories} from './constant/categories.js'; // Assuming categories are stored in a JSON file
import { set } from 'react-hook-form';

const styleBox = { width: 200, height: 70, marginTop: '5px', marginLeft: '20px', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '10px' }
const styleTitleFilter = { fontSize: 18}

function Films() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState([100, 150])
  const [category, setCategory] = useState(0);
  const [actors, setActors] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = useState(1);
  const [showPage, setShowPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFilmsBetweenLength(value[0], value[1], category, selectedOption.value === undefined? "": selectedOption.value, page)
      .then(items => {
        setPosts(items["listFilmPage"])
        setPage(items["currentPage"])
        setTotalPages(items["totalPage"])
        setIsLoading(false);
        setShowPage(page);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [value, category, selectedOption, page]
  );

  useEffect(() => {
    getActors()
      .then(items => {
        setActors(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const valuetext = (value) => {
    return `${value}°C`;
  }
  const handleChange = (e, newValue) => {
    setValue(newValue);
    setActiveIndex(null);
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  if (isLoading) {
    return <div>Cargando... 🌀</div>;
  } 
  
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
        <Box sx={styleBox}>
          <p style={styleTitleFilter}>Duración</p>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            color={"grey"}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={40}
            max={190}
          />
        </Box>
        <Box sx={styleBox}>
          <FormControl fullWidth color={"black"}>
            <p style={styleTitleFilter}>
              Categoría
            </p>
            <NativeSelect
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setActiveIndex(null);
              }}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))};
            </NativeSelect>
          </FormControl>
        </Box>
        <Box sx={{...styleBox, ...{fontFamily: 'Segoe UI'}}}>
          <p style={styleTitleFilter}>Actor</p>
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
            options={actors}
          />
        </Box>
      </div>

      <ul className='cuadro'>
        {posts.length === 0 && <p style={{ textAlign: 'center', fontFamily: 'Segoe UI' }}>No se encontraron películas</p>}
        {posts.length !== 0 && posts.map((item, value) => {
          return (
            <FilmBox key={value} item={item} abrirDesplegable={activeIndex === value} onShow={() => setActiveIndex(value)} funcionActivar={setActiveIndex} />
          );
        })}
      </ul>
      <button onClick={() => setPage(page-1)} disabled={page <= 1} style={{ fontFamily: 'Segoe UI', margin: '10px', padding: '5px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>Anterior</button>
      <span style={{ margin: '10px', fontSize: '16px', fontFamily: 'Segoe UI' }}>Página {showPage} de {totalPages}</span>
      <button onClick={() => setPage(page+1)} disabled={page == totalPages} style={{ fontFamily: 'Segoe UI', margin: '10px', padding: '5px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>Siguiente</button>
    </>
  )
}

export default Films
