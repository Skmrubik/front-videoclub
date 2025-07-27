import { useState, useEffect } from 'react'
import { getStaffs } from './services/Staffs'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
    
  useEffect(() => {
    getStaffs()
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
      <ul>
        {posts.map((item, value) => <h2 key={value}>{item.firstName}</h2>)}
      </ul>
    </>
  )
}

export default App
