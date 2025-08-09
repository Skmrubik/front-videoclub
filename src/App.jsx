import React, { useState, useEffect } from 'react'
import { getFilmsBetweenLength } from './services/Films'
import { getActors } from './services/Actors'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import './App.css'
import FilmBox from './FilmBox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from 'react-select';
import {categories} from './constant/categories.js'; // Assuming categories are stored in a JSON file

const styleBox = { width: 200, height: 70, marginTop: '5px', marginLeft: '20px', border: '1px solid grey', borderRadius: '5px', padding: '10px' }
const styleTitleFilter = {marginBottom: '10px', fontSize: 18}

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState([100, 150])
  const [category, setCategory] = useState(0);
  const [actors, setActors] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getFilmsBetweenLength(value[0], value[1], category, selectedOption.value === undefined? "": selectedOption.value, page)
      .then(items => {
        setPosts(items["listFilmPage"])
        setPage(items["currentPage"])
        setTotalPages(items["totalPage"])
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
        {posts.map((item, value) => {
          return (
            <FilmBox key={value} item={item} abrirDesplegable={activeIndex === value} onShow={() => setActiveIndex(value)} funcionActivar={setActiveIndex} />
          );
        })}
      </ul>
      <button onClick={() => setPage(page-1)} disabled={page <= 1} style={{ fontFamily: 'Segoe UI', margin: '10px', padding: '5px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>Anterior</button>
      <span style={{ margin: '10px', fontSize: '16px', fontFamily: 'Segoe UI' }}>Página {page} de {totalPages}</span>
      <button onClick={() => setPage(page+1)} disabled={page == totalPages} style={{ fontFamily: 'Segoe UI', margin: '10px', padding: '5px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>Siguiente</button>
    </>
  )
}

export default App
