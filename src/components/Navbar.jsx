import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "#56B6C6",
        padding: "12px 20px",
        display: "flex",
        gap: "25px",
      }}
    >
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <h3 style={{ color: "white", margin: 0 }}>🍰 DeliciaCake</h3>
      </NavLink>
    </div>
  );
}

export default Navbar;
