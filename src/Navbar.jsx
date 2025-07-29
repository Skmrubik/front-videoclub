import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Inicio</Link>
      <Link to="/blogs">Blogs</Link>
    </nav>
  );
}