import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // REGISTER
  const handleRegister = async () => {
    try {
      if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
      }

      const newUser = {
        username,
        password,
        role: "user",
      };

      await registerUser(newUser);

      navigate("/login");
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
            marginBottom: "8px",
            color: "#FF7F9C",
          }}
        >
          📝 Đăng Ký Tài Khoản
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          Tạo tài khoản mới để bắt đầu mua sắm
        </p>

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
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            background: "#FF7F9C",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Đăng ký
        </button>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          Đã có tài khoản?
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#56B6C6",
              marginLeft: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
