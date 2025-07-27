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
        {posts.map((item, value) => <li key={value}>{item.firstName}</li>)}
      </ul>
    </>
  )
}

export default App
