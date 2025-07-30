import { createRoot } from 'react-dom/client'
import { NavLink, BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import AppNav from './AppNav.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="menu" >
      <div className="navbar" >
        <NavLink to="/"
                    style={({ isActive }) => ({
                        color: isActive? "black": "#595959",
                        fontWeight: "bold",
                        fontFamily: "Segoe UI",
                        fontSize: "20px",
                        textDecoration: "none",
                        marginRight: "15px",
                    })}>Home
        </NavLink>
      </div>
      <div className="navbar" >
        <NavLink to="/about"
                  style={({ isActive }) => ({
                      color: isActive? "black": "#595959",
                      fontWeight: "bold",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      textDecoration: "none",
                      marginRight: "15px",
                  })}>About
        </NavLink>
      </div>
    </div>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AppNav />} />
    </Routes>
  </BrowserRouter>
)
