import React, { useState, useEffect } from 'react'
import { getFilmsBetweenLength } from './services/Films'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState([100, 150])
    
  useEffect(() => {
    getFilmsBetweenLength(value[0],value[1])
      .then(items => {
        setPosts(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    }, [value]
  );
  
  const valuetext = (value) => {
    return `${value}°C`;
  }
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: 300, marginTop: 5, marginLeft: 5}}>
        <p>Duración</p>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={40}
          max={190}
        />
      </Box>
      <ul className='cuadro'>
        {posts.map((item, value) => {
          return(
            <div className='film'>
              <p key={value}>{item.title} ({item.releaseYear}) </p>
              <p> Duración: {item.length} min</p>
            </div>
          );
        })}
      </ul>
    </>
  )
}

export default App
