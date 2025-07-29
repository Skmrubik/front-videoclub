import { createRoot } from 'react-dom/client'
import { NavLink, BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import AppNav from './AppNav.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavLink to="/"
                style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                    textDecoration: "none",
                    marginRight: "15px",
                    padding: "10px",
                    border: isActive ? "2px solid red" : "none",
                })}>Home
    </NavLink>
    <NavLink to="/about"
                style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                    textDecoration: "none",
                    marginRight: "15px",
                })}>About
    </NavLink>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AppNav />} />
    </Routes>
  </BrowserRouter>
)
