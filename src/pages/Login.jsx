import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  // =========================
  // CONTEXT + NAVIGATE
  // =========================
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================


  const [role, setRole] = useState("user");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = async () => {
    try {
      const foundUser = await loginUser(username, password, role);

      // LOGIN FAILED
      if (!foundUser) {
        alert("Sai tài khoản hoặc mật khẩu!");

        return;
      }

      // SAVE CONTEXT
      login(foundUser);

      // ROLE REDIRECT
      if (foundUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      alert("Có lỗi xảy ra!");
    }
  };



  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#56B6C6",
          }}
        >
          🍰 DeliciaGarden
        </h2>

        {/* ROLE */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setRole("user")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: role === "user" ? "#56B6C6" : "#ddd",
              color: role === "user" ? "white" : "black",
              cursor: "pointer",
            }}
          >
            User
          </button>

          <button
            onClick={() => setRole("admin")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: role === "admin" ? "#56B6C6" : "#ddd",
              color: role === "admin" ? "white" : "black",
              cursor: "pointer",
            }}
          >
            Admin
          </button>
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#56B6C6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Đăng nhập
        </button>

        {/* SWITCH MODE */}
        {/* REGISTER */}
        {role === "user" && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            Chưa có tài khoản?
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#56B6C6",
                marginLeft: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Đăng ký
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
