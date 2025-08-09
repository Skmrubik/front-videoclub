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

const categories = [
  { value: '0', label: 'None' },
  { value: '1', label: 'Action' },
  { value: '2', label: 'Animation' },
  { value: '3', label: 'Children' },
  { value: '4', label: 'Classics' },
  { value: '5', label: 'Comedy' },
  { value: '6', label: 'Documentary' },
  { value: '7', label: 'Drama' },
  { value: '8', label: 'Family' },
  { value: '9', label: 'Foreign' },
  { value: '10', label: 'Games' },
  { value: '11', label: 'Horror' },
  { value: '12', label: 'Music' },
  { value: '13', label: 'New' },
  { value: '14', label: 'Sci-Fi' },
  { value: '15', label: 'Sports' },
  { value: '16', label: 'Travel' }
]

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState([100, 150])
  const [category, setCategory] = useState(0);
  const [actors, setActors] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    getFilmsBetweenLength(value[0], value[1], category, selectedOption.value === undefined? "": selectedOption.value)
      .then(items => {
        setPosts(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [value, category, selectedOption]
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box sx={{ width: 200, marginTop: '5px', marginLeft: '20px' }}>
          <p>Duración</p>
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
        <Box sx={{ width: 200, marginTop: '5px', marginLeft: '20px' }}>
          <FormControl fullWidth color={"black"}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Categoría
            </InputLabel>
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
        <Box sx={{ width: 200, marginTop: '5px', marginLeft: '20px' }}>
          <Select
            aria-labelledby="aria-label"
            inputId="aria-example-input"
            name="aria-live-color"
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
    </>
  )
}

export default App
