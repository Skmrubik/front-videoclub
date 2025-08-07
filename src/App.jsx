import React, { useState, useEffect } from 'react'
import { getFilmsBetweenLength } from './services/Films'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import './App.css'
import FilmBox from './FilmBox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState([100, 150])
  const [category, setCategory] = useState([0]);
    
  useEffect(() => {
    getFilmsBetweenLength(value[0], value[1], category)
      .then(items => {
        setPosts(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    }, [value, category]
  );
  
  const valuetext = (value) => {
    return `${value}°C`;
  }
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box sx={{ width: 200, marginTop: '5px', marginLeft: '20px'}}>
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
              Age
            </InputLabel>
            <NativeSelect
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))};
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
      
      <ul className='cuadro'>
        {posts.map((item, value) => {
          return(
            <FilmBox value={value} item={item}/>
          );
        })}
      </ul>
    </>
  )
}

export default App
