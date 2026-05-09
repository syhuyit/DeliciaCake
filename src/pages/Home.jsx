import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          height: "300px",
          background:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(...)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "dark",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        🍰 Delicia Garden
      </div>

      {/* Slogan */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          animation: "fadeIn 1s ease-in",
        }}
      >
        <h2>Ngọt ngào mỗi ngày</h2>
        <p>Thưởng thức những chiếc bánh ngon nhất tại cửa hàng của chúng tôi</p>

        <button
          onClick={() => navigate("/menu")}
          style={{
            background: "#56B6C6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Mua ngay
        </button>
      </div>

      {/* Giới thiệu */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h3>Về chúng tôi</h3>
        <p>
          Chúng tôi cung cấp các loại bánh tươi ngon, chất lượng cao, phù hợp
          cho mọi dịp.
        </p>
      </div>
    </div>
  );
}

export default Home;
