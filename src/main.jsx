import { createRoot } from 'react-dom/client'
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Films from './views/Films.jsx'
import Customers from './views/Customers.jsx';
import Rentals from './views/Rentals.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="menu flex-row" >
      <div className="navbar" >
        <NavLink to="/films"
          style={({ isActive }) => ({
            color: "white",
            fontWeight: isActive ? "bold" : "normal",
            fontFamily: "Segoe UI",
            fontSize: "20px",
            textDecoration: "none",
            marginRight: "15px",
            marginLeft: "15px",
          })}>Películas
        </NavLink>
      </div>
      <div className="navbar" >
        <NavLink to="/rentals"
          style={({ isActive }) => ({
            color:  "white",
            fontWeight: isActive ? "bold" : "normal",
            fontFamily: "Segoe UI",
            fontSize: "20px",
            textDecoration: "none",
            marginRight: "15px",
            marginLeft: "15px",
          })}>Alquileres
        </NavLink>
      </div>
      <div className="navbar" >
        <NavLink to="/customers"
          style={({ isActive }) => ({
            color: "white",
            fontWeight: isActive ? "bold" : "normal",
            fontFamily: "Segoe UI",
            fontSize: "20px",
            textDecoration: "none",
            marginRight: "15px",
            marginLeft: "15px",
          })}>Clientes
        </NavLink>
      </div>
    </div>
    <Routes>
      <Route path="/films" element={<Films />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  </BrowserRouter>
)
