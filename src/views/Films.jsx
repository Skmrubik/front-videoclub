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
  const styleCommonButtonPagination = {fontSize: 15, margin: '10px', padding: '5px 10px', boxShadow: '2px 2px 0px 1px #e65c00',border: 'none', borderRadius: '5px', color: 'white'}
  const styleButtonFirst = { ...styleCommonButtonPagination, ...{backgroundColor: disabledFirstButtom? '#ffc299':'#ff944d', cursor: disabledFirstButtom? 'default':'pointer'}}
  const styleButtonSecond = { ...styleCommonButtonPagination, ...{backgroundColor: disabledSecondButtom? '#ffc299':'#ff944d', cursor: disabledSecondButtom? 'default':'pointer'}}
  
  useEffect(() => {
    getFilms(false)
  }, [value, category, selectedOption, selectedOptionFilms]
  );

  useEffect(() => {
    getFilms(true)
  }, [page]
  );

  const getFilms = (changePage) => {
    const pageVar = changePage ? page: 1;
    getFilmsBetweenLength(value[0], value[1], category, selectedOption.value === undefined ? 0 : selectedOption.value,
      selectedOptionFilms.value === undefined ? 0 : selectedOptionFilms.value, pageVar)
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
  }

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
      <div className='films-list flex-row'>
        <Box  className='box-style'>
          <p className='style-title-filter'>Películas</p>
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
        <Box className='box-style'>
          <p className='style-title-filter'>Duración</p>
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
        <Box className='box-style'>
          <FormControl fullWidth color={"black"}>
            <p className='style-title-filter'>
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
        <Box className='box-style'>
          <p className='style-title-filter'>Actor</p>
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
        {posts.length === 0 && <p style={{ textAlign: 'center' }}>No se encontraron películas</p>}
        {posts.length !== 0 && posts.map((item, value) => {
          return (
            <FilmBox key={value} item={item} abrirDesplegable={activeIndex === value} onShow={() => setActiveIndex(value)} funcionActivar={setActiveIndex} />
          );
        })}
      </ul>
      <div className='box-pagination'>
        <button onClick={() => setPage(page - 1)} disabled={disabledFirstButtom} style={styleButtonFirst}>Anterior</button>
        <span style={{ margin: '10px', fontSize: '16px', fontFamily: 'Segoe UI' }}>Página {showPage} de {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={disabledSecondButtom} style={styleButtonSecond}>Siguiente</button>
      </div>

    </>
  )
}

export default Films
