import "../css/ProductCard.css";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  // =========================
  // NAVIGATE
  // =========================
  const navigate = useNavigate();

  // =========================
  // CONTEXT
  // =========================
  const { addToCart } = useContext(CartContext);

  // =========================
  // HANDLE ADD TO CART
  // =========================
  const handleAddToCart = () => {
    addToCart(product);

    alert("Đã thêm vào giỏ hàng");
  };

  return (
    <div
      className="product-card"
      style={{
        background: "white",

        borderRadius: "16px",

        padding: "15px",

        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",

        display: "flex",
        flexDirection: "column",

        height: "100%",
      }}
    >
      {/* ========================= */}
      {/* IMAGE */}
      {/* ========================= */}
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          width: "100%",
          height: "180px",

          objectFit: "cover",

          borderRadius: "12px",

          marginBottom: "15px",

          cursor: "pointer",
        }}
      />

      {/* ========================= */}
      {/* NAME */}
      {/* ========================= */}
      <div
        style={{
          minHeight: "60px",
          marginBottom: "10px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "22px",
          }}
        >
          {product.name}
        </h4>
      </div>

      {/* ========================= */}
      {/* PRICE */}
      {/* ========================= */}
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <p
          style={{
            color: "#2ecc71",

            fontWeight: "bold",

            fontSize: "20px",

            margin: 0,
          }}
        >
          {product.price.toLocaleString("vi-VN")}đ
        </p>
      </div>

      {/* ========================= */}
      {/* BUTTON */}
      {/* ========================= */}
      <button
        onClick={handleAddToCart}
        className="product-btn"
        style={{
          marginTop: "auto",

          background: "#56B6C6",

          color: "white",

          border: "none",

          padding: "12px",

          borderRadius: "10px",

          cursor: "pointer",

          fontWeight: "500",

          transition: "0.3s",
        }}
      >
        Thêm ngay
      </button>
    </div>
  );
}

export default ProductCard;
