import { NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // CONTEXT
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#56B6C6",

        padding: "15px 35px",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",

        position: "relative",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* LOGO */}
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <h2
            style={{
              color: "white",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            🍰 DeliciaGarden
          </h2>
        </NavLink>

        {/* MENU */}
        <NavLink
          to="/menu"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "500",
            fontSize: "25px",
          }}
        >
          Menu
        </NavLink>
      </div>

      {/* CENTER */}
      <div
        style={{
          position: "absolute",

          left: "50%",

          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.18)",

            padding: "8px 18px",

            borderRadius: "999px",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            backdropFilter: "blur(5px)",
          }}
        >
          <span
            style={{
              fontSize: "18px",
            }}
          >
            👋
          </span>

          <span
            style={{
              color: "white",

              fontWeight: "600",

              fontSize: "15px",
            }}
          >
            Xin chào, {user?.username}
          </span>
        </div>
      </div>

      {/* ========================= */}
      {/* RIGHT */}
      {/* ========================= */}
      <button
        onClick={handleLogout}
        style={{
          background: "white",

          color: "#56B6C6",

          border: "none",

          padding: "10px 16px",

          borderRadius: "10px",

          cursor: "pointer",

          fontWeight: "bold",

          transition: "0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Navbar;
