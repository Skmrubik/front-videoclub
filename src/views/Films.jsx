import React, { useState, useEffect } from 'react'
import { getFilmsBetweenLength, getFilmsFormatted } from '../services/Films.js'
import { getActors } from '../services/Actors.js'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import FilmBox from '../components/FilmBox.jsx';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from 'react-select';
import { categories } from '../constant/categories.js'; // Assuming categories are stored in a JSON file

const styleBox = { width: 200, height: 70, marginTop: '5px', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '10px' }
const styleTitleFilter = { fontSize: 18, textAlign: 'center' }


function Films() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState([100, 150])
  const [category, setCategory] = useState(0);
  const [actors, setActors] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenFilms, setIsMenuOpenFilms] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedOptionFilms, setSelectedOptionFilms] = useState(0);
  const [page, setPage] = useState(1);
  const [showPage, setShowPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filmsSelect, setFilmsSelect] = useState([]);

  const disabledFirstButtom = page <= 1;
  const disabledSecondButtom = page === totalPages;

  const styleButtonFirst = { fontFamily: 'Segoe UI', fontSize: 15, margin: '10px', padding: '5px 10px', boxShadow: '2px 2px 0px 1px #e65c00', backgroundColor: disabledFirstButtom? '#ffc299':'#ff944d',border: 'none', borderRadius: '5px', color: 'white', cursor: disabledFirstButtom? 'default':'pointer' }
  const styleButtonSecond = { fontFamily: 'Segoe UI', fontSize: 15, margin: '10px', padding: '5px 10px', boxShadow: '2px 2px 0px 1px #e65c00', backgroundColor: disabledSecondButtom? '#ffc299':'#ff944d',border: 'none', borderRadius: '5px', color: 'white', cursor: disabledSecondButtom? 'default':'pointer' }
  
  useEffect(() => {
    getFilmsBetweenLength(value[0], value[1], category, selectedOption.value === undefined ? 0 : selectedOption.value,
      selectedOptionFilms.value === undefined ? 0 : selectedOptionFilms.value, page)
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
  }, [value, category, selectedOption, page, selectedOptionFilms]
  );

  useEffect(() => {
    getActors()
      .then(items => {
        setActors(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    getFilmsFormatted()
      .then(items => {
        setFilmsSelect(items)
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
  const onMenuOpenFilms = () => setIsMenuOpenFilms(true);
  const onMenuCloseFilms = () => setIsMenuOpenFilms(false);

  if (isLoading) {
    return <div>Cargando... 🌀</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: '20px', marginRight: '20px', marginLeft: '20px' }}>
        <Box sx={{ ...styleBox, ...{ fontFamily: 'Segoe UI' } }}>
          <p style={styleTitleFilter}>Películas</p>
          <Select
            style={{ color: 'black' }}
            aria-labelledby="Segoe UI"
            inputId="Segoe UI"
            name="Segoe UI"
            onMenuOpen={onMenuOpenFilms}
            onMenuClose={onMenuCloseFilms}
            defaultValue={0}
            value={selectedOptionFilms}
            onChange={setSelectedOptionFilms}
            options={filmsSelect}
          />
        </Box>
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
        <Box sx={{ ...styleBox, ...{ fontFamily: 'Segoe UI' } }}>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => setPage(page - 1)} disabled={disabledFirstButtom} style={styleButtonFirst}>Anterior</button>
        <span style={{ margin: '10px', fontSize: '16px', fontFamily: 'Segoe UI' }}>Página {showPage} de {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={disabledSecondButtom} style={styleButtonSecond}>Siguiente</button>
      </div>

    </>
  )
}

export default Films
