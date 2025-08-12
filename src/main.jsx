import { createRoot } from 'react-dom/client'
import { NavLink, BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import AppNav from './AppNav.jsx';

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
      <Route path="/films" element={<App />} />
      <Route path="/customers" element={<AppNav />} />
    </Routes>
  </BrowserRouter>
)
