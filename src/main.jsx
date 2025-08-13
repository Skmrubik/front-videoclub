import { createRoot } from 'react-dom/client'
import { NavLink, BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import Films from './Films.jsx'
import Customers from './Customers.jsx';
import Rentals from './Rentals.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="menu" >
      <div className="navbar" >
        <NavLink to="/films"
                    style={({ isActive }) => ({
                        color: isActive? "black": "#595959",
                        fontWeight: "bold",
                        fontFamily: "Segoe UI",
                        fontSize: "20px",
                        textDecoration: "none",
                        marginRight: "15px",
                    })}>Peliculas
        </NavLink>
      </div>
      <div className="navbar" >
        <NavLink to="/rentals"
                  style={({ isActive }) => ({
                      color: isActive? "black": "#595959",
                      fontWeight: "bold",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      textDecoration: "none",
                      marginRight: "15px",
                  })}>Alquileres
        </NavLink>
      </div>
      <div className="navbar" >
        <NavLink to="/customers"
                  style={({ isActive }) => ({
                      color: isActive? "black": "#595959",
                      fontWeight: "bold",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      textDecoration: "none",
                      marginRight: "15px",
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
