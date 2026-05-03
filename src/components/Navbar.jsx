import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#ffd700" : "white",
    textDecoration: "none",
    fontWeight: "bold",
  });

  return (
    <div
      style={{
        background: "#56B6C6",
        padding: "12px 20px",
        display: "flex",
        gap: "25px",
      }}
    >
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>

      <NavLink to="/menu" style={linkStyle}>
        Menu
      </NavLink>
    </div>
  );
}

export default Navbar;
