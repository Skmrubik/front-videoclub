import { useState, useEffect } from 'react'
import { getFirstNFilms } from './services/Films'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
    
  useEffect(() => {
    getFirstNFilms(5)
      .then(items => {
        setPosts(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    }, []
  );
  
  return (
    <>
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
